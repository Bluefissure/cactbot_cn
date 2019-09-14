'use strict';

[{
    zoneRegex: /^(The Final Coil Of Bahamut - Turn \(4\)|巴哈姆特大迷宫 \(真源之章4\))$/,
    timelineFile: 't13.txt',
    timelineTriggers: [
        {
            id: 'T13 Dive Warning',
            regex: /Megaflare Dive/,
            regexCn: /百万核爆冲/,
            beforeSeconds: 5,
            infoText: {
                en: 'Stack Center for Dives',
                cn: '俯冲俯冲',
            },
        },
    ],
    triggers: [
        {
            id: 'T13 Gigaflare Phase Change',
            regex: / 14:BB9:Bahamut Prime starts using Gigaflare/,
            regexCn: / 14:BB9:至尊巴哈姆特 starts using 十亿核爆/,
            regexDe: / 14:BB9:Prim-Bahamut starts using Gigaflare/,
            regexFr: / 14:BB9:Primo-Bahamut starts using GigaBrasier/,
            regexJa: / 14:BB9:バハムート・プライム starts using ギガフレア/,
            condition: function (data) {
                // Only the first two gigas are phase changes, the rest are in final phase.
                return !(data.gigaflare > 1);
            },
            sound: 'Long',
            infoText: function (data, matches) {
                if (data.gigaflare) {
                    return {
                        en: 'Stack Center for Dives',
                        cn: '高伤AOE 注意减伤',
                    };
                }
            },
            run: function (data) {
                data.gigaflare = data.gigaflare || 0;
                data.gigaflare++;
            },
        },
        {
            id: 'T13 Flatten',
            regex: / 14:BAE:Bahamut Prime starts using Flatten on (\y{Name})\./,
            regexCn: / 14:BAE:至尊巴哈姆特 starts using 平击 on (\y{Name})\./,
            regexDe: / 14:BAE:Prim-Bahamut starts using Einebnen on (\y{Name})\./,
            regexFr: / 14:BAE:Primo-Bahamut starts using Compression on (\y{Name})\./,
            regexJa: / 14:BAE:バハムート・プライム starts using フラッテン on (\y{Name})\./,
            alertText: function (data, matches) {
                if (matches[1] == data.me) {
                    return {
                        en: 'Flatten on YOU',
                        cn: '死刑注意减伤',
                    };
                }
            },
            infoText: function (data, matches) {
                if (matches[1] == data.me) {
                    return;
                    if (data.role == 'healer' || data.job == 'BLU') { }
                    return {
                        en: 'Flatten on ' + data.ShortName(matches[1]),
                        cn: data.ShortName(matches[1]) + '吃死刑',
                    };
                }
            },
        },
        {
            id: 'T13 Megaflare Share',
            regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:0027:/,
            condition: function (data, matches) {
                return data.me == matches[1];
            },
            alertText: {
                en: 'Megaflare Stack',
                cn: '注意1点分摊'
            },
        },
        {
            id: 'T13 Earthshaker',
            regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:0028:/,
            condition: function (data, matches) {
                return data.me == matches[1];
            },
            alertText: {
                en: 'Earthshaker on YOU',
                cn: '注意大地摇动',
            },
        },
        {
            id: 'T13 Tempest Wing',
            regex: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Bahamut Prime:....:....:0004:/,
            regexCn: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:至尊巴哈姆特:....:....:0004:/,
            regexDe: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Prim-Bahamut:....:....:0004:/,
            regexFr: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Primo-Bahamut:....:....:0004:/,
            regexJa: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:バハムート・プライム:....:....:0004:/,
            condition: function (data, matches) {
                return data.me == matches[1];
            },
            infoText: {
                en: 'Tempest Tether on YOU',
                cn: '击退接线远离人群'
            },
        },
        {
            id: 'T13 Akh Morn',
            regex: / 14:BC2:Bahamut Prime starts using Akh Morn on (\y{Name})\./,
            regexCn: / 14:BC2:至尊巴哈姆特 starts using 死亡轮回 on (\y{Name})\./,
            regexDe: / 14:BC2:Prim-Bahamut starts using Akh Morn on (\y{Name})\./,
            regexFr: / 14:BC2:Primo-Bahamut starts using Akh Morn on (\y{Name})\./,
            regexJa: / 14:BC2:バハムート・プライム starts using アク・モーン on (\y{Name})\./,
            alertText: function (data, matches) {
                if (matches[1] == data.me) {
                    return {
                        en: 'Akh Morn on YOU',
                        cn: '分摊死刑 注意连线'
                    };
                }
            },
            infoText: function (data, matches) {
                if (matches[1] != data.me) {
                    return {
                        en: 'Akh Morn on ' + data.ShortName(matches[1]),
                        cn: data.ShortName(matches[1]) + '被点死刑'
                    };
                }
            },
        },
    ],
    timelineReplace: [
        {
            'locale': 'de',
            'replaceSync': {
                'The Storm Of Meracydia': 'Sturm[p] Von Meracydia',
                'The Sin Of Meracydia': 'Sünde[p] Von Meracydia',
                'The Shadow Of Meracydia': 'Schatten[p] Von Meracydia',
                'The Pain Of Meracydia': 'Schmerz[p] Von Meracydia',
                'The Gust Of Meracydia': 'Wind[p] Von Meracydia',
                'The Blood Of Meracydia': 'Blut[p] Von Meracydia',
                'Engage!': 'Start!',
                'Bahamut Prime': 'Prim-Bahamut',
            },
            'replaceText': {
                'attack': 'Attacke',
                'Teraflare': 'Teraflare',
                'Tempest Wing': 'Sturm-Schwinge',
                'Megaflare Dive': 'Megaflare-Sturz',
                'Megaflare': 'Megaflare',
                'Gigaflare': 'Gigaflare',
                'Flatten': 'Einebnen',
                'Flare Star': 'Flare-Stern',
                'Flare Breath': 'Flare-Atem',
                'Enrage': 'Finalangriff',
                'Earth Shaker': 'Erdstoß',
                'Double Dive': 'Doppelschwinge',
                'Akh Morn': 'Akh Morn',
                '--untargetable--': '--nich anvisierbar--',
                '--targetable--': '--anvisierbar--',
                '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
                '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
                '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
            },
            '~effectNames': {
                'Sludge': 'Schlamm',
                'Leaden': 'Bleischwere',
                'Flare Dampening': 'Neurolink',
            },
        },
        {
            'locale': 'fr',
            'replaceSync': {
                'The Storm Of Meracydia': 'Tempête De Méracydia',
                'The Sin Of Meracydia': 'Péché De Méracydia',
                'The Shadow Of Meracydia': 'Ombre De Méracydia',
                'The Pain Of Meracydia': 'Douleur De Méracydia',
                'The Gust Of Meracydia': 'Bourrasque De Méracydia',
                'The Blood Of Meracydia': 'Sang De Méracydia',
                'Engage!': 'À l\'attaque',
                'Bahamut Prime': 'Primo-Bahamut',
            },
            'replaceText': {
                'attack': 'Attaque',
                'Teraflare': 'TéraBrasier',
                'Tempest Wing': 'Aile De Tempête',
                'Megaflare Dive': 'Plongeon MégaBrasier',
                'Megaflare': 'MégaBrasier',
                'Gigaflare': 'GigaBrasier',
                'Flatten': 'Compression',
                'Flare Star': 'Astre Flamboyant',
                'Flare Breath': 'Souffle Brasier',
                'Enrage': 'Enrage',
                'Earth Shaker': 'Secousse',
                'Double Dive': 'Plongeon Double',
                'Akh Morn': 'Akh Morn',
                '--untargetable--': '--Impossible à cibler--',
                '--targetable--': '--Ciblable--',
                '--sync--': '--Synchronisation--',
                '--Reset--': '--Réinitialisation--',
                '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
                '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
                '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
            },
            '~effectNames': {
                'Sludge': 'Emboué',
                'Leaden': 'Plombé',
                'Flare Dampening': 'ParaTéraBrasier',
            },
        },
        {
            'locale': 'ja',
            'replaceSync': {
                'The Storm Of Meracydia': 'メラシディアン・ストーム',
                'The Sin Of Meracydia': 'メラシディアン・シン',
                'The Shadow Of Meracydia': 'メラシディアン・シャドウ',
                'The Pain Of Meracydia': 'メラシディアン・ペイン',
                'The Gust Of Meracydia': 'メラシディアン・ガスト',
                'The Blood Of Meracydia': 'メラシディアン・ブラッド',
                'Engage!': '戦闘開始！',
                'Bahamut Prime': 'バハムート・プライム',
            },
            'replaceText': {
                'attack': '攻撃',
                'Teraflare': 'テラフレア',
                'Tempest Wing': 'テンペストウィング',
                'Megaflare Dive': 'メガフレアダイブ',
                'Megaflare': 'メガフレア',
                'Gigaflare': 'ギガフレア',
                'Flatten': 'フラッテン',
                'Flare Star': 'フレアスター',
                'Flare Breath': 'フレアブレス',
                'Earth Shaker': 'アースシェイカー',
                'Double Dive': 'ダブルダイブ',
                'Akh Morn': 'アク・モーン',
                '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
                '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
                '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
            },
            '~effectNames': {
                'Sludge': '汚泥',
                'Leaden': 'ヘヴィ［強］',
                'Flare Dampening': '拘束装置',
            },
        },
        {
            'locale': 'cn',
            'replaceSync': {
                'The Storm Of Meracydia': '美拉西迪亚的怒雨',
                'The Sin Of Meracydia': '美拉西迪亚的罪恶',
                'The Shadow Of Meracydia': '美拉西迪亚的怨影',
                'The Pain Of Meracydia': '美拉西迪亚的苦痛',
                'The Gust Of Meracydia': '美拉西迪亚的悲风',
                'The Blood Of Meracydia': '美拉西迪亚的血仇',
                'Engage!': '战斗开始！',
                'Bahamut Prime': '至尊巴哈姆特',
            },
            'replaceText': {
                'attack': '攻击',
                'Teraflare': '万亿核爆',
                'Tempest Wing': '风暴之翼',
                'Megaflare Dive': '百万核爆冲',
                'Megaflare': '百万核爆',
                'Gigaflare': '十亿核爆',
                'Flatten': '平击',
                'Flare Star': '耀星',
                'Flare Breath': '核爆吐息',
                'Earth Shaker': '大地摇动',
                'Double Dive': '双重俯冲',
                'Enrage': '龙压',
                'MF Spread': '百万核爆小aoe',
                'MF Pepperoni': '百万核爆大圈',
                'MF Share': '百万核爆分摊',
                'Dark Aether Orb': '注意黑球',
                'Dark Aether Orbs': '注意黑球',
                'Akh Morn': '死亡轮回',
                '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
                '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
                '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
            },
            '~effectNames': {
                'Sludge': '污泥',
                'Leaden': '沉重',
                'Flare Dampening': '拘束装置',
            },
        },
    {
      'locale': 'de',
      'replaceSync': {
        'The Storm Of Meracydia': 'Sturm[p] Von Meracydia',
        'The Sin Of Meracydia': 'Sünde[p] Von Meracydia',
        'The Shadow Of Meracydia': 'Schatten[p] Von Meracydia',
        'The Pain Of Meracydia': 'Schmerz[p] Von Meracydia',
        'The Gust Of Meracydia': 'Wind[p] Von Meracydia',
        'The Blood Of Meracydia': 'Blut[p] Von Meracydia',
        'Engage!': 'Start!',
        'Bahamut Prime': 'Prim-Bahamut',
      },
      'replaceText': {
        'attack': 'Attacke',
        'Teraflare': 'Teraflare',
        'Tempest Wing': 'Sturm-Schwinge',
        'Megaflare Dive': 'Megaflare-Sturz',
        'Megaflare': 'Megaflare',
        'Gigaflare': 'Gigaflare',
        'Flatten': 'Einebnen',
        'Flare Star': 'Flare-Stern',
        'Flare Breath': 'Flare-Atem',
        'Enrage': 'Finalangriff',
        'Earth Shaker': 'Erdstoß',
        'Double Dive': 'Doppelschwinge',
        'Akh Morn': 'Akh Morn',
        '--untargetable--': '--nich anvisierbar--',
        '--targetable--': '--anvisierbar--',
        '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
        '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
        '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
      },
      '~effectNames': {
        'Sludge': 'Schlamm',
        'Leaden': 'Bleischwere',
        'Flare Dampening': 'Neurolink',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'The Storm Of Meracydia': 'Tempête De Méracydia',
        'The Sin Of Meracydia': 'Péché De Méracydia',
        'The Shadow Of Meracydia': 'Ombre De Méracydia',
        'The Pain Of Meracydia': 'Douleur De Méracydia',
        'The Gust Of Meracydia': 'Bourrasque De Méracydia',
        'The Blood Of Meracydia': 'Sang De Méracydia',
        'Engage!': 'À l\'attaque',
        'Bahamut Prime': 'Primo-Bahamut',
      },
      'replaceText': {
        'attack': 'Attaque',
        'Teraflare': 'TéraBrasier',
        'Tempest Wing': 'Aile De Tempête',
        'Megaflare Dive': 'Plongeon MégaBrasier',
        'Megaflare': 'MégaBrasier',
        'Gigaflare': 'GigaBrasier',
        'Flatten': 'Compression',
        'Flare Star': 'Astre Flamboyant',
        'Flare Breath': 'Souffle Brasier',
        'Enrage': 'Enrage',
        'Earth Shaker': 'Secousse',
        'Double Dive': 'Plongeon Double',
        'Akh Morn': 'Akh Morn',
        '--untargetable--': '--Impossible à cibler--',
        '--targetable--': '--Ciblable--',
        '--sync--': '--Synchronisation--',
        '--Reset--': '--Réinitialisation--',
        '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
        '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
        '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
      },
      '~effectNames': {
        'Sludge': 'Emboué',
        'Leaden': 'Plombé',
        'Flare Dampening': 'ParaTéraBrasier',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'The Storm Of Meracydia': 'メラシディアン・ストーム',
        'The Sin Of Meracydia': 'メラシディアン・シン',
        'The Shadow Of Meracydia': 'メラシディアン・シャドウ',
        'The Pain Of Meracydia': 'メラシディアン・ペイン',
        'The Gust Of Meracydia': 'メラシディアン・ガスト',
        'The Blood Of Meracydia': 'メラシディアン・ブラッド',
        'Engage!': '戦闘開始！',
        'Bahamut Prime': 'バハムート・プライム',
      },
      'replaceText': {
        'attack': '攻撃',
        'Teraflare': 'テラフレア',
        'Tempest Wing': 'テンペストウィング',
        'Megaflare Dive': 'メガフレアダイブ',
        'Megaflare': 'メガフレア',
        'Gigaflare': 'ギガフレア',
        'Flatten': 'フラッテン',
        'Flare Star': 'フレアスター',
        'Flare Breath': 'フレアブレス',
        'Earth Shaker': 'アースシェイカー',
        'Double Dive': 'ダブルダイブ',
        'Akh Morn': 'アク・モーン',
        '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
        '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
        '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
      },
      '~effectNames': {
        'Sludge': '汚泥',
        'Leaden': 'ヘヴィ［強］',
        'Flare Dampening': '拘束装置',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'The Storm Of Meracydia': '美拉西迪亚的怒雨',
        'The Sin Of Meracydia': '美拉西迪亚的罪恶',
        'The Shadow Of Meracydia': '美拉西迪亚的怨影',
        'The Pain Of Meracydia': '美拉西迪亚的苦痛',
        'The Gust Of Meracydia': '美拉西迪亚的悲风',
        'The Blood Of Meracydia': '美拉西迪亚的血仇',
        'Engage!': '战斗开始！',
        'Bahamut Prime': '至尊巴哈姆特',
      },
      'replaceText': {
        'attack': '攻击',
        'Teraflare': '万亿核爆',
        'Tempest Wing': '风暴之翼',
        'Megaflare Dive': '百万核爆冲',
        'Megaflare': '百万核爆',
        'Gigaflare': '十亿核爆',
        'Flatten': '平击',
        'Flare Star': '耀星',
        'Flare Breath': '核爆吐息',
        'Earth Shaker': '大地摇动',
        'Double Dive': '双重俯冲',
        'Enrage': '龙压',
        'MF Spread': '百万核爆小aoe',
        'MF Pepperoni': '百万核爆大圈',
        'MF Share':'百万核爆分摊',
        'Akh Morn': '死亡轮回',
        '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3': '(仮)バハムート：霊体：上空へ飛び立つ：バハムートダンジョン3',
        '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3': '(仮)バハムート：霊体：上空から地上に着地する：バハムートダンジョン3',
        '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3': '(仮)バハムート：霊体：オートアタック：バハムートダンジョン3',
      },
      '~effectNames': {
        'Sludge': '污泥',
        'Leaden': '沉重',
        'Flare Dampening': '拘束装置',
      },
    },
  ],
}];
