# cactbot 本地化教学

1. [raidboss](#raidboss)

## raidboss

### Pipeline

1. 选择对应的战斗，打一局后将log上传fflogs，公开log。如果有公开的log，也可以直接用已经存在的log
2. fflogs申请API Key
3. 进入util文件夹，运行`python translate_fight.py -r 上传至fflogs的日志ID -of 输出文件 -k 你所申请的fflogs_API_Public_Key  -rf 第几场战斗`
4. 将生成的文件中对应的`cn`相关翻译内容添加到`ui/raidboss/data/triggers/` 的对应文件末尾，在对应的ZoneRegex中添加/修改为中文区域
5. 运行`python check_translation.py -f 触发器文件名称`，会自动通过TimelineTranslate翻译触发器
6. 手动修改触发器动作、AlertText等内容
7. 测试
8. 测试完毕后给本项目提起PR，不会使用git可以直接私聊项目负责人

### 翻译触发器文件

从4. 开始讲起，运行完`translate_fight.py`后生成的文件大概长成这样：

```javascript
{
  timelineReplace: [
    {
      'locale': 'de',
      ...
    },
    {
      'locale': 'fr',
      ...
    },
    {
      'locale': 'ja',
      ...
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Ultimaplasm': '究极炸弹',
        'Garuda': '迦楼罗',
        ...
        'Aetheroplasm': '以太爆雷'
      },
      'replaceText': {
        'イフリート：炎獄の楔召喚': 'イフリート：炎獄の楔召喚',
        'attack': '攻击',
        'Slipstream': '螺旋气流',
        ...
        'Aerial Blast': '大气爆发'
      },
      '~effectNames': {
        'Viscous Aetheroplasm': '吸附式炸弹',
        'Infernal Fetters': '火狱之锁',
        ...
        'Accursed Flame': '诅咒之炎'
      },
    },
  ],
}
```

我们只处理`locale`为`cn`的即可，其中三个部分分别为：

- replaceSync: 替换时间轴同步时所使用的正则表达式匹配中的相关内容，主要包含怪物名字、技能名

- replaceText: 替换时间轴显示的文字消息
- ~effectNames: 替换某某角色中了某某状态的正则表达式匹配中的相关内容，主要包含状态名

举例来说：

- 绝神兵的时间轴中，有这么一行：

  ```9 "Slipstream" sync /:Garuda:2B53:/ # drift 0.293```

  其中的`Slipstream`是时间轴显示的内容，会被`replaceText`下面的`'Slipstream': '螺旋气流',`替换成`螺旋气流`

  而在 sync 语句之后的 `/:Garuda:2B53:/` 则是同步时间轴所用的正则表达式，由于`replaceSync`中有 `'Garuda': '迦楼罗',` 所以替换后的正则表达式会变成 `/:迦楼罗:2B53:/`

- 绝神兵的触发器中，有这么一个id为"UWU Ifrit Fetters"的触发器，其匹配的正则如下：

  ```javascript
  {
      id: 'UWU Ifrit Fetters',
      regex: /1A:\y{ObjectId}:(\y{Name}) gains the effect of Infernal Fetters from/,
      regexDe: /1A:\y{ObjectId}:(\y{Name}) gains the effect of Infernofesseln from/,
      regexFr: /1A:\y{ObjectId}:(\y{Name}) gains the effect of Chaînes Infernales from/,
      regexJa: /1A:\y{ObjectId}:(\y{Name}) gains the effect of 炎獄の鎖 from/,
      ...
  }
  ```

  由于`~effectNames`中有 `'Infernal Fetters': '火狱之锁',` 所以中文的regexCn会变成：

  ```javascript
  regexCn: /1A:\y{ObjectId}:(\y{Name}) gains the effect of 火狱之锁 from/,
  ```

  请注意，这部分regexCn需要通过运行`check_translation.py`自动添加，也就是步骤5. ，添加后手动进行修改用来保证正则匹配的准确性。

处理完，请不要忘了将生成的cn这部分json加入到触发器文件末尾的`timelineReplace`条目中。

### 测试

首先，我们要保证时间轴的每一个条目（或者大部分条目）都被翻译，为了保证这一点可以通过运行

```python
python check_translation.py -f 触发器文件名称 -t
```

来打印时间轴，打印出来如果有诸如`#MISSINGTEXT`，`#MISSINGSYNC`一类的注释，则说明触发器中的`replaceText`和`replaceSync`中缺少对应条目。

之后，就需要在游戏过程中进行测试，但是由于每个触发器都被限定了工作区域，所以我们需要在触发器开头的`zoneRegex`中加入国服的区域名称，举例为：

```javascript
zoneRegex: /^(The Weapon's Refrain \(Ultimate\)|Unknown Zone \(309\))$/,
```

加入国服的区域名称后变成：

```javascript
zoneRegex: /^(The Weapon's Refrain \(Ultimate\)|Unknown Zone \(309\)|究极神兵绝境战)$/,
```

请注意，这部分正则表达式不要拍脑子写，最好使用诸如[regex101](https://regex101.com/)一类的网站进行ES（或者JS）引擎的正则测试，避免出现手抖造成匹配不上的错误。

下一步就可以进入游戏内测试，设置好凯科特爆特，启动FF14打本吧！

如果游戏内测试出现了问题，又不方便进行多次实际战斗，则可以保留战斗日志进行模拟测试。将raidboss的url选择raidbossemulate的html文件，锁定窗口后通过ACT中的导入/导出选项卡导入对应的战斗日志，如果能正常识别则会在raidbossemulate模块中显示对应的战斗记录，点击play即可进行模拟测试。（更多功能还请自行摸索，不配图了）
