import json
import argparse
import codecs, csv
import requests
import string
import copy
import os
import re

def get_config():
    parser = argparse.ArgumentParser(description='Cactbot Timeline Auto-translate Script')
 
    parser.add_argument('-i', '--input', type=str, required=True,
                        help='Input timeline file to be translated.')
    parser.add_argument('-l', '--language', type=str, default="cn", choices=['ja', 'cn'],
                        help='The language to be translated to.')
 
    # Parse args.
    args = parser.parse_args()
 
    # Namespace => Dictionary.
    kwargs = vars(args)
 
    return kwargs

meta_dict = {}
fail_set = set()

def translate_str(ffstring, language, target_files=[]):
    global meta_dict
    global fail_set
    if not ffstring.strip(): return ffstring
    if ffstring in fail_set:
        print("Pass {} cuz failed once".format(ffstring.strip()))
        return ffstring
    if meta_dict.get(ffstring.strip()):
        tstring = meta_dict.get(ffstring)[language]
        print("Reading {} translation of \"{}\": \"{}\" in meta".format(language, ffstring.strip(), tstring))
        return ffstring.replace(ffstring.strip(), tstring)
    if not target_files:
        target_files = ["Action", "BNpcName", "LogMessage"]
    url = "https://strings.wakingsands.com/xivcsv/_search"
    headers = {"content-type":"application/json"}
    for tfile in target_files:
        try:
            data = {"query":{"bool":{"filter":[{"wildcard":{"filename":"*{}*".format(tfile)}},{"multi_match":{"query":ffstring.strip(),"fields":["cn^3","en^2","ja^1"],"type":"phrase"}}],"should":[{"function_score":{"query":{"multi_match":{"query":"(","fields":["cn^3","en^2","ja^1"],"fuzziness":"AUTO"}},"boost":8,"boost_mode":"multiply"}},{"function_score":{"query":{"multi_match":{"query":")","fields":["cn^3","en^2","ja^1"],"fuzziness":"AUTO"}},"boost":8,"boost_mode":"multiply"}}]}},"from":0,"size":20,"highlight":{"fields":{"en":{},"cn":{},"ja":{}}}}
            r = requests.post(url=url, data=json.dumps(data), headers=headers, timeout=10)
            rjson = r.json()
            hits = rjson.get("hits")
            if not hits or hits.get("total", 0)==0:
                print("Can't find \"{}\" in {}".format(ffstring.strip(), tfile))
                continue
            for hit in hits.get("hits", []):
                source = hit.get('_source')
                if not source: continue
                if source.get("en").lower().replace(ffstring.strip().lower(), "").strip() == "":
                    meta_dict[ffstring.strip()] = {
                        "en": source.get("en"),
                        "cn": source.get("cn"),
                        "ja": source.get("ja")
                    }
                    tstring = source.get(language)
                    print("Translate \"{}\" to {}: \"{}\"".format(ffstring.strip(), language, tstring))
                    return ffstring.replace(ffstring.strip(), tstring)
        except requests.ReadTimeout as e:
            print("Passing query of {} cuz timeout".format(ffstring.strip()))
    print("Translate \"{}\" of {} failed".format(ffstring.strip(), language))
    fail_set.add(ffstring)
    return ffstring


def translate_seg(seg, language):
    tseg = copy.deepcopy(seg)
    if not seg: return tseg
    if seg[0]==seg[-1] and seg[0]=="\"":
        if len(seg)<=2: return seg
        ffstring = translate_str(tseg[1:-1], language)
        tseg = "\"{}\"".format(ffstring)
    elif seg.find(":")!=-1:
        tmp = tseg.replace("/","")
        tmp_segs = tmp.split(":")
        for ss in tmp_segs:
            ori_ss = copy.deepcopy(ss)
            if not ss: continue
            if all(c in string.hexdigits+'(|) ' for c in ss): continue
            ss = translate_str(ss, language)
            tseg = tseg.replace(ori_ss, ss)
    return tseg
 
def translate_line(line, language):
    if line.find("#")>=0:
        idx = line.find("#")
        comment = line[idx:]
        raw_line = line[:idx]
    else:
        raw_line = line
        comment = ""
    line_segs = line.split(" ")
    tline = copy.deepcopy(raw_line)
    action = re.search(r'\"((?P<action>((.*))))\"', raw_line)
    regex = re.search(r'\/((?P<regex>((.*))))\/', raw_line)
    if action:
        seg = action.group(0)
        tseg = translate_seg(seg, language)
        tline = tline.replace(seg, tseg)
    if regex:
        seg = regex.group(0)
        tseg = translate_seg(seg, language)
        tline = tline.replace(seg, tseg)
    return tline+comment

def translate(lines, language="cn"):
    translated_lines = []
    for line in lines:
        translated_lines.append(translate_line(line, language))
    return translated_lines

if __name__=="__main__":
    config = get_config()
    input_file = config.get("input")
    with codecs.open(input_file, "r", "utf8") as f:
        lines = f.readlines()

    raid_name = input_file.split(".")[0]
    meta_file = "cn-{}.meta.{}".format(raid_name, ".".join(input_file.split(".")[1:]))
    if os.path.exists(meta_file):
        with codecs.open(meta_file, "r", "utf8") as f:
            meta_dict = json.load(f)
    fail_file = "cn-{}.fail.{}".format(raid_name, ".".join(input_file.split(".")[1:]))
    if os.path.exists(fail_file):
        with codecs.open(fail_file, "r", "utf8") as f:
            fail_set = set(json.load(f))
    
    translated_lines = translate(lines, language=config.get("language"))
    output_file = "cn-"+input_file
    with codecs.open(output_file, "w", "utf8") as f:
        f.writelines(translated_lines)
        print("Translate timeline to {}".format(output_file))

    with codecs.open(meta_file, "w", "utf8") as f:
        f.write(json.dumps(meta_dict))
        print("Save timeline meta to {}".format(meta_file))

    with codecs.open(fail_file, "w", "utf8") as f:
        f.write(json.dumps(list(fail_set)))
        print("Save timeline faile to {}".format(fail_file))