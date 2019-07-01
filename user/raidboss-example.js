'use strict';

// 将此文件重命名为`raidboss.js`并编辑它以更改raidboss ui。
// 这个文件是Javascript。 在行上“//”之后的任何内容都是注释。
// 如果你编辑这个文件，记得重新加载ACT或点击CactbotOverlay上的
// “Reload Overlay”按钮。
// 如果此文件中存在错误，它们将出现在ACT中OverlayPlugin.dll的
// 日志窗口中。

// 强行指定语言为`cn`，用以适配国服。
// 如果在国际服使用，需要去掉/注释这一行。
Options.Language = 'cn';

// 如果为false，则在战斗期间不会显示即将发生的事件的时间轴。
Options.TimelineEnabled = true;

// 如果为false，触发器和时间线将不会显示文本，也不会播放声音
Options.AlertsEnabled = true;

// 如果为false，则不会为触发器显示可视文本警报。
Options.TextAlertsEnabled = true;

// 如果为false，则不播放声音警报。
Options.SoundAlertsEnabled = true;

// 如果为true，则大声警报TTS。 TTS优先于自定义声音和文本噪音。 
// 如果触发器没有TTS条目，那么它将变成文本和声音警报（如果打开）。
Options.SpokenAlertsEnabled = false;

// 如果为特定触发器设置了组警报，则将覆盖单个TTS警报
// 在组设置中更改短语有意义
Options.GroupSpokenAlertsEnabled = false;


// 时间轴显示即将发生的事件的范围（秒）。
Options.ShowTimerBarsAtSeconds = 30;

// 当时间轴事件倒计时为0时，保持条目持续多少秒不消失。
Options.KeepExpiredTimerBarsForSeconds = 0.7;

// 设置时间轴将即将多少秒之内的事件高亮。
Options.BarExpiresSoonSeconds = 8;

// css给UI提供的区域中能显示的多少条时间轴。
Options.MaxNumberOfTimerBars = 6;


// 为Info优先级的文本指定播放声音的路径。
Options.InfoSound = '../../resources/sounds/freesound/percussion_hit.ogg';

// 为Alert优先级的文本指定播放声音的路径。
Options.AlertSound = '../../resources/sounds/BigWigs/Alert.ogg';

// 为Alarm优先级的文本指定播放声音的路径。
Options.AlarmSound = '../../resources/sounds/BigWigs/Alarm.ogg';

// 指定“Long”声音的路径。
Options.LongSound = '../../resources/sounds/BigWigs/Long.ogg';

// InfoSound的音量大小。
Options.InfoSoundVolume = 1;

// AlertSound的音量大小。
Options.AlertSoundVolume = 1;

// AlertSound的音量大小。
Options.AlarmSoundVolume = 1;

// LongSound的音量大小。
Options.LongSoundVolume = 1;

// 一组用于玩家的昵称，用以缩短名字。
Options.PlayerNicks = {
  'Darkest Edgelord': 'Mary',
  'Captain Jimmy': 'Jimmy',
  'Pipira Pira': '&#x1F41F;',
};

// 一组要忽略的触发器。 键是触发器的“id”，如果要忽略触发器，
// 则值应该为true，而false将不起作用。 触发器ID可以在此目录内
// 文件中的每个战斗的触发器文件中找到：
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
Options.DisabledTriggers = {
  // 禁用盛夏农庄中`test.js`的/psych触发器。
  'Test Psych': true,
  // 禁用`drowned_city_of_skalla.js`的"eye lasers"触发器。
  'Hrodric Words': true,
};


// 一个用户自定义的触发器列表，详情请见：
// https://github.com/quisquous/cactbot/tree/master/ui/raidboss/data/triggers
Options.Triggers = [

  // (1) 最简单的样例触发器：你嗝屁了
  {
    // 匹配每个区域：
    zoneRegex: /.*/,
    triggers: [
      {
        regex: /:.*被.*打倒了/,
        alarmText: '你嗝屁了',
      },
    ],
  },

  // 你也可以给特定的区域添加触发器，例子如下：
  //
  // (2) 也许每当你在住宅区吹一个吻（/blowkiss）时，你都想要一个愚蠢的亲吻声！
  {
    zoneRegex: /^(海雾村|高脚孤丘|薰衣草苗圃|白银乡)$/,
    triggers: [
      {
        regex: /送出了飞吻/,
        sound: '../../resources/sounds/PowerAuras/bigkiss.ogg',
        volume: 0.5,
      },
    ],
  },

  // (3) 也许您想要修改一些现有的时间轴和触发器：
  //
  // 在测试时间轴上添加一些额外的触发器。 要使用它，请参阅：
  // https://github.com/quisquous/cactbot/blob/master/ui/raidboss/data/timelines/test.txt
  {
    // 时间轴/触发器适用的区域。
    // 这应该与触发器文件中的zoneRegex匹配。
    zoneRegex: /^(Middle La Noscea|中拉诺西亚)$/,

    // 在测试时间轴中添加一些额外的时间轴事件。
    timeline: `
      # 注意：井号是时间轴文件中的注释。
      # 此格式与ACT时间轴相同。
      # 在测试时间轴中添加新的个人事件。
      5.2 "(记得使用牵制！)"
      # 提醒自己在终极针前5秒保护坦克。
      infotext "终极针" before 5 "保护坦克"
      # 你可以隐藏你不喜欢的事件。 这隐藏了“长时间咏唱”。
      hideall "长时间咏唱"
    `,

    // 添加一些其他触发器，这些触发器将在盛夏农庄中。
    triggers: [
      // 如果你挑衅了，这个触发器将触发。
      {
        id: 'User Example Provoke',
        regex: /You use 挑衅/,
        infoText: '挑衅！',
        tts: '挑衅',
      },

      // 一个更复杂的再生触发器
      {
        id: 'User Example Regen',
        // 这将匹配如下所示的来自ACT的日志行：
        // "蓝色裂痕 gains the effect of 再生 from 獭獭 for 21.00 Seconds."
        regex: /gains the effect of Regen from \y{Name} for (\y{Float}) Seconds/,
        regexCn: /gains the effect of 再生 from \y{Name} for (\y{Float}) Seconds/,
        delaySeconds: function(data, matches) {
          // 等待再生持续的秒数，然后再提醒你续再生。
          // 这看起来很蠢，因为无法弄清楚你是否用了两次再生。
          // 这只是一个让你们清楚如何在data上存储变量的例子。
          return data.ParseLocaleFloat(matches[1]);
        },
        alertText: '再生警告',
        tts: '再生',
      },
    ],
  },

];

// 每个触发器选项。 默认情况下，每个触发器都使用TextAlertsEnabled，SoundAlertsEnabled
// 和SpokenAlertsEnabled的全局选项。这些全局选项在此文件中设置为顶部。
//
// 如果存在每个触发条目（无论是否为真/假），它将覆盖全局选项设置的任何内容。
//
// SoundOverride（如果存在）在单个触发器上的行为类似于'sound'，因为如果没有指定声音，
// 它将取代info/alert/alarm警报。 对于要播放的覆盖，SoundAlert（或SoundAlertsEnabled）
// 仍必须为true。
//
// 以下是修改盛夏农庄中测试触发器的每个触发器选项的示例：
// https://github.com/quisquous/cactbot/blob/master/ui/raidboss/data/triggers/test.js

Options.PerTriggerOptions = {
  // 就像Options.DisabledTriggers一样，这是要应用的触发器ID。 
  // 这将覆盖测试触发器中“/laugh”触发器的设置。 您可以通过传送到盛夏农庄
  // 来测试这一点，并且/laugh一个木人。 它将使用这些设置。
  'Test Laugh': {
    // 播放TTS
    SpeechAlert: false,
    // 播放声音提示
    SoundAlert: true,
    // 屏幕显示 info/alert/alarm 文本
    TextAlert: false,
    // 播放此声音（替换原始声音）
    SoundOverride: '../../resources/sounds/WeakAuras/CowMooing.ogg',
    // 在此音量播放声音（如果有）
    VolumeOverride: 0.3,
  },
  // 在盛夏农庄 /poke 一个木人只使用没有视觉文本指示器或其他TTS。
  'Test Poke': {
    SpeechAlert: true,
    SoundAlert: false,
    TextAlert: false,
    // Override the tts output as well.
    TTSText: function(data) {
      return 'Custom Poke (' + data.pokes + ')';
    },
  },
  // 这使得 /clap 一个木人覆盖默认行为以使用组TTS
  'Test Clap': {
    GroupSpeechAlert: true,
    SpeechAlert: true,
    SoundAlert: false,
    TextAlert: false,
    // Override the tts output as well.
    GroupTTSText: function(data) {
      return 'Custom CLAP';
    },
  },
};