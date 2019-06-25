# cactbot_cn (最终幻想14 高级悬浮窗)

[![build status](https://travis-ci.org/quisquous/cactbot.svg?branch=master)](https://travis-ci.org/quisquous/cactbot)

1. [关于](#关于)
1. [安装](#安装)
1. [从源码构建](#从源码构建)
1. [UI模块概览](#UI模块概览)
1. [Cactbot自定义](#Cactbot自定义)
1. [支持语言](#支持语言)

## 关于

cactbot 是一个给 [最终幻想14](http://ff.sdo.com)开发的高难副本悬浮窗系统。本项目是 [Advanced Combat Tracker](http://advancedcombattracker.com/) 工具中 [hibiyasleep's OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin) 插件的插件。

本项目为中文本地化的临时项目，原项目地址：[quisquous's cactbot](https://github.com/quisquous/cactbot)

如果您想参与本地化过程，请参考[这篇文档](https://github.com/Bluefissure/cactbot_cn/blob/master/docs/LocalizeGuide.md)

cactbot 提供了以下模块：

* raidboss: 内置时间轴与触发器：

![timeline screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_raidboss_timeline.png)
![triggers screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_raidboss_triggers.png)

* oopsyraidsy: 失误和死亡报告：

![oopsy screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_oopsy.png)

* jobs: buff与倒计时追踪显示

![rdm jobs screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_jobs.png)

* eureka: 尤雷卡NM地图追踪

![eureka screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_eureka.png)

* fisher: 钓鱼冷却计时器

![fisher screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_fishing.png)

* dps: dps统计功能

![xephero screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/xephero.png)

### 视频样例

* [O4S](https://www.twitch.tv/videos/209562337)
* [O3S](https://clips.twitch.tv/StrangeHungryGarageShadyLulu)

## 安装

### 依赖

安装 [.NET 运行框架](https://www.microsoft.com/net/download/framework)  4.6.1 或更高版本。

您必须启用游戏的 [DirectX 11](http://imgur.com/TjcnjmG) 模式。

安装64位版本的 [Advanced Combat Tracker](http://advancedcombattracker.com/)。

给ACT安装合适的 [最终幻想14解析插件](https://github.com/ravahn/FFXIV_ACT_Plugin/releases/latest)。请注意，最新版本的解析插件兼容国际服（日/美/欧）版本游戏，如果您在使用其他客户端（中/韩），可能需要之前对应版本的插件。您需要启用从网络数据中解析，并保证ACT已通过防火墙。另外，请确保 Plugins -> FFXIV Settings -> Parse Options 下面的 “触发器中包含HP” 的选项已启用。

您需要安装并启用最新版本的
[hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest)。 由于cactbot使用了最新版OverlayPlugin的某些新功能，您必须使用 [hibiyasleep](https://github.com/hibiyasleep) 维护的
OverlayPlugin，而不是它的原作者RainbowMage的版本。

如果您更希望通过视频的方式安装、设置上述两个插件，fflogs提供了一个安装/配置ACT和OverlayPlugin的[向导](https://www.fflogs.com/help/start/)。

### 安装 cactbot

1. 下载 [最新版本](https://github.com/quisquous/cactbot/releases/latest) 的 cactbot-version-number.zip 文件。  (不要下载成源代码，除非您希望自己编译)

1. 右键压缩文件，点击属性，选中“解除锁定”。

1. 解压文件  (如果没有 **OverlayPlugin\\addons\\CactbotOverlay.dll** 这个文件，你下载了错误的文件。)

1. 如果ACT在运行中，关闭ACT。

1. 从压缩文件中拷贝 **OverlayPlugin\\** 文件夹覆盖到你的  **C:\\...\\Advanced Combat Tracker\\** 文件夹。

1. （如果您是中国服务器玩家）从[此处](https://github.com/Bluefissure/cactbot_cn/archive/master.zip)下载中国服务器的对应设置文件，将`resources`，`ui`和`user`三个文件夹覆盖cactbot的对应文件夹。

    最后的文件目录应该长成这样：:

    ```code
    - C:\...\Advanced Combat Tracker\
      - Advanced Combat Tracker.exe
      - FFXIV_ACT_Plugin.dll
      - OverlayPlugin\
         - OverlayPlugin.dll
         - OverlayPlugin.Common.dll
         - OverlayPlugin.Core.dll
         - etc etc OverlayPlugin files
         - addons\
            - CactbotOverlay.dll
         - cactbot\
            - ui\
            - resources\
            - user\
    ```

    注意：cactbot\\ 的文件夹不一定非要在 OverlayPlugin 文件夹内部，这只是一个默认的位置。只要 cactbot\\ 文件夹的完整性不受影响，您放在哪里都可以。

    注意：OverlayPlugin\\ 也可以按照您的喜好重命名。

1. （如果您使用的是便携版/整合版ACT）从[此处](https://github.com/Bluefissure/cactbot_cn/releases)下载整合版ACT对应的dll文件，替换`OverlayPlugin\addons\CactbotOverlay.dll`文件。（请注意，整合版默认的OverlayPlugin并非hibiyasleep所维护版本，如[出现问题](#可能出现的错误与解决方案)需要自行替换为hibiyasleep版本。）

1. 重启ACT。

1. 在ACT的OverlayPlugin选项卡中添加cactbot的悬浮窗，并选择类型为`cactbot` 。

1. 在URL中选中您想添加的html文件。

    您可以通过加载[ui/test/test.html](ui/test/test.html)来测试安装过程无误。

更多的cactbot悬浮窗安装指南，请参考 [添加悬浮窗](#添加悬浮窗) 小节。

### 可能出现的错误与解决方案

如果您遇到错误说找不到 **FFXIV_ACT_Plugin.dll**，请确保 **FFXIV_ACT_Plugin.dll** 和 **Advanced Combat Tracker.exe** 在同一目录。

如果您在 OverlayPlugin 的控制台中得到了类似 `Exception in SendFastRateEvents: Method not found: 'Void RainbowMage.HtmlRenderer.Renderer.ExecuteScript(System.String)'.` 的错误，说明您仍在使用 RainbowMage 版本的 OverlayPlugin ，如上文所述，您需要升级最新的64位版本的 [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest) 。

如果您在 OverlayPlugin 的控制台中得到了类似 `Uncaught TypeError: window.OverlayPluginApi.overlayMessage is not a function` 的错误，说明您仍在使用老版本的 OverlayPlugin ，您需要升级 **最新的64位版本** 的 [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest) 。

如果您在 OverlayPlugin 的控制台中得到了类似 `Error: (overlay): C:\Program Files (x86)\Advanced Combat Tracker\OverlayPlugin\addons\CactbotOverlay.dll: System.IO.FileNotFoundException: Could not load file or assembly 'Newtonsoft.Json, Version=10.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' or one of its dependencies. The system cannot find the file specified.` 的错误，说明您仍在使用老版本的 OverlayPlugin ，您需要升级 **最新的64位版本** 的 [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest) 。

如果您在 OverlayPlugin 的控制台中得到了类似 `System.MissingMethodException: Method not found: '!!0[] System.Array.Empty()` 的错误，说明您的.NET框架版本不符合要求，请安装 [.NET Framework](https://www.microsoft.com/net/download/framework) 4.6.1或更高版本。

如果您在启动 OverlayPlugin 时遇到了 [CAS policy](https://blogs.msdn.microsoft.com/drew/2009/12/23/xunit-and-td-net-fixing-the-attempt-was-made-to-load-an-assembly-from-a-network-location-problem/) 错误，比如 `An attempt was made to load an assembly from a network location which would have caused the assembly to be sandboxed in previous version of the .NET Framework.` 那么说明您可能没有解锁部分或者全部DLL文件（包括hibiyasleep与cactbot的）。首先关掉ACT，然后解锁所有的DLL文件。最简单的解锁方法是在插件仍是zip文件时，通过右键属性解锁。最后，重启ACT。

如果您遇到了一个类似于 `Error: (overlay): Exception in SendFastRateEvents: Could not load file or assembly 'FFXIV_ACT_Plugin, Version=(version), Culture=neutral, PublicKeyToken=null' or one of its dependencies. The system cannot find the file specified.` 的悬浮窗错误，那么您可能需要解锁游戏解析插件。参考上文解锁DLL的相关操作。

如果您遇到了一个ACT的弹窗，报错 `Invalid Plugin` 和 `This assembly does not have a class that implements ACT's plugin interface`，那么您可能在以错误的方式加载插件。 Cactbot 是一个悬浮窗，而不是ACT插件。 诸如 **FFXIV_ACT_PLUGIN.dll** 和 **OverlayPlugin.dll** 的ACT插件通过 ACT -> Plugins -> Plugin Listing -> Add/Enable Plugin 的方式加载。 Cactbot 是OverlayPlugin的悬浮窗，需要通过 Plugins -> OverlayPlugin.dll -> New 的方式加载，更多信息请参考 [添加悬浮窗](#添加悬浮窗) 小节。

如果触发器等UI不工作，请确认游戏解析插件中的 "Disable Parsing from Network Data" 选项**没有**被选中，触发器的计时需要通过网络数据进行同步。

如果您使用 cactbot 作为 dps 解析与美化但是无法得到数据，请确认插件设置中的DPS刷新速率被设定为大于0的值。设置为3是一个比较好的选择。

## 从源码构建

需要从源码构建的dalao应该不需要我翻译.jpg

Follow all the steps above for installing cactbot first.

1. Follow the instructions in the **dummy.txt** file in [CactbotOverlay/ThirdParty/OverlayPlugin](CactbotOverlay/ThirdParty/OverlayPlugin).
1. Follow the instructions in the **dummy.txt** file in [CactbotOverlay/ThirdParty/ACT](CactbotOverlay/ThirdParty/ACT).
1. Open the solution in Visual Studio (tested with Visual Studio 2017).
1. Build for "Release" and "x64".
1. The plugin will be built as **bin/x64/Release/CactbotOverlay.dll**.
1. Copy the plugin to the Advanced Combat Tracker\\OverlayPlugin\\addons\\ directory

## UI模块概览

[ui/](ui/) 文件夹包含了cactbot的UI模块，如果您按照上述的指南安装的cactbot，该目录位于 **C:\\...\\Advanced Combat Tracker\\OverlayPlugin\\cactbot\\ui** 。

每一个cactbot的UI模块需要被分别添加为悬浮窗，参考 [添加悬浮窗](#添加悬浮窗) 小节来获得进一步信息。

### [raidboss](ui/raidboss) 模块

使用这个模块，需要将 cactbot 指定为 **ui/raidboss/raidboss.html** 。

这个模块给战斗中的时间轴和即将到来的战斗事件提供了可视化显示，包含了文字和声音提示。这些提示可以基于战斗事件轴，
或战斗中的网络日志消息，与ACT提供的"自定义触发器"功能类似。这个模块是仿照魔兽时间中的[BigWigs Bossmods](https://mods.curse.com/addons/wow/big-wigs)
插件制作的。

文件中提供的战斗事件轴按照 [ACT Timeline](https://github.com/grindingcoil/act_timeline) 插件的格式设计，
[参考文档](http://dtguilds.enjin.com/forum/m/37032836/viewthread/26353492-act-timeline-plugin)
[额外扩展](ui/raidboss/data/timelines/README.txt)。

文字警报有三种级别，按照警报等级严重程度排序分别为： `info`, `alert` 和 `alarm`。
文字警报会是这三种级别之一，更严重的警报会有更大的字体与更醒目的颜色。如果您有需要可以进行 [Text-to-speech 的相关设置](AdvancedCactbot.md#text-to-speech)。

时间轴文件位置为 [ui/raidboss/data/timelines](ui/raidboss/data/timelines)。 文
字与语音的触发器文件位于 [ui/raidboss/data/triggers](ui/raidboss/data/triggers)。

在此截图中，raidboss 模块已被高亮，红色圈出的是时间轴，
文字提示用黄色圈出，目前是 `alert`级 的一条文字提醒消息。

![raidboss screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/Raidboss.png)

### [oopsyraidsy](ui/oopsyraidsy) 模块

使用这个模块，需要将 cactbot 指定为 **ui/oopsyraidsy/oopsyraidsy.html**.

这个模块提供了失误追踪与死亡报告。Oopsy raidsy是为了减少分析战斗中特定成员的死亡原因而设计的。在一场战斗中，只有有限部分的错误会被显示出来（为了避免刷屏），但是战斗结束后会生成全部的报告。

当某人死亡时，他临死前承受的最后一次攻击会被log记录下来。比如，如果log说":skull: Poutine: Iron Chariot (82173/23703)"这就意味着 Poutine 最可能被 Iron Chariot 攻击，以23703的血量承受了82173的伤害。由于dot等原因，治疗的量值并不准确，误差在一秒左右。

当失误发生时，Oopsy raidsy会生成警告 (:warning:) 和失误 (:no_entry_sign:) 消息来解释发生了什么。

失误的触发器位于 [ui/oopsyraidsy/data](ui/oopsyraidsy/data) 文件夹内。

![oopsy screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_oopsy.png)

### [jobs](ui/jobs) 模块

使用这个模块，需要将 cactbot 指定为 **ui/jobs/jobs.html**

这个模块提供了HP，MP和TP量条，也包含了raid中的某些buff的图标与计时条。
它同样也可以给你的食物buff提供计时器，用以raid或练级。

这个插件对于某些职业的适配较好，但是对于其他职业却 *需要很多的* 进一步工作。

* 赤魔法师: 显示黑白魔元，跟踪赤飞石、赤火炎和冲击的buff剩余时间，显示近战三连的进度等等。
* 战士: 显示兽魂，跟踪剩下的风暴眼buff足够打几个gcd。
* 武僧: 显示斗气层数和疾风迅雷剩余时间，并追踪武僧的对应buff和debuff。

在下列截图中，赤魔法师的jobs模块被高亮了出来。HP量条，黑白魔元量条被紫色圈出，对应的raid buff用橘黄色指出。
近战三连的第一连已经打出，所以最上面的有一个黄条，而绿色圈出的是赤飞石、赤火炎和冲击的buff剩余时间。

![jobs screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/Jobs.png)

### [eureka](ui/eureka) 模块

使用这个模块，需要将 cactbot 指定为 **ui/eureka/eureka.html**

这个模块提供了NM出现和击杀的自动跟踪。同样也提供了对应的天气、夜晚的计时器，同时可以通过`/sh`命令从聊天框中同步击杀时间
（要求以ffxiv-eureka的跟踪网站导出的`/sh`）。任何聊天框中的地址信息也会被在地图上标注出来。

目前它不会自动从tracker直接更新数据，但是你可以通过点击"复制已杀死的NM"并粘贴到聊天框中同步。
举例为 `/echo 冷却中的NM: 魔虫 (119分钟) → 白泽 (119分钟) → 塔克西姆 (119分钟) → 苏罗毗 (119分钟)` 。

如果你看不到天气emoji图标，请安装 [此Windows更新](https://support.microsoft.com/en-us/help/2729094/an-update-for-the-segoe-ui-symbol-font-in-windows-7-and-in-windows-ser)。

![eureka screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_eureka.png)

### [fisher](ui/fisher) 模块

使用这个模块，需要将 cactbot 指定为 **ui/fisher/fisher.html**

当你在钓鱼场中投下鱼线时，这个模块会记录你何时钓起特定的鱼，以便得知下一次钓鱼时可能会得到什么。

![fishing screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_fishing.png)

### [dps](ui/dps) 美化模块

cactbot 可以被用于针对 OverlayPlugin's miniparse 插件设计的任一dps美化模板，只要它实现了
cactbot的Javascript API。  cactbot 会自动对结束的战斗分段，所以你不能将ACT的战斗时间设置为无限。

[xephero](ui/dps/xephero) 的dps美化基于迷你美化同样的窗口，但是提供了诸如分截断DPS跟踪、显示额外列信息
等诸多功能。在下列截图中能看到 B1, B2, B3 三个不同阶段的DPS。这些自动生成的分阶段统计信息只能用于普通副本
的多个boss，而不能用于raid等高难本的同一个boss的不同阶段。

![xephero screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/xephero.png)

[rdmty](ui/dps/rdmty) 的dps美化基于迷你美化同样的窗口，按照了4.0的职业进行了重新美化，
用以支持 [fflogs](http://fflogs.com)。

![rdmty screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/rdmty.png)

### [pull counter](ui/pullcounter) 模块

这个小模块可以在屏幕上显示当前的战斗次数计数。
这主要适用于主播或者正在录制高难副本战斗的人。
在屏幕上显示一个数字可以轻松浏览视频并查找到对应的战斗。

![pull counter screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/pullcounter.png)

### [test](ui/test) 模块

使用这个模块，需要将 cactbot 指定为 **ui/test/test.html**

这个模块只是一个屏幕上显示的测试窗口，用来显示cacatbot能够获取到的变量信息。
这个对于测试您的安装是否成功、[编写您自己的模块](AdvancedCactbot.md#writing-a-cactbot-ui-module)有帮助，而对实际游戏过程没有作用。

![test screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/test.png)

### 添加悬浮窗

下面将讲述如何添加 raidboss 悬浮窗模块，别的模块的操作也都相同，只需要您将URL指定为对应的HTML文件。

添加一个cactbot模块和添加任意的 OverlayPlugin 悬浮窗口操作相同。

1. 启动ACT。
1. 来到ACT的Plugins选项卡里面的OverlayPlugin.dll子选项卡。

    ![overlay plugin tab screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginTab.png)

1. 点击 "New" 按钮并选择"Type"为 Cactbot 。

    ![new overlay plugin screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginNew.png)

1. 给这个悬浮窗输入一个你喜欢的名字，比如 `raidbossy`。
1. 一个比较好的例子是拿 raidboss 模块举例，将文件名设定为 **ui/raidboss/raidboss.html** ，你的设置应该长成这样：

    ![raidboss plugin config](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossConfig.png)

1. 此时，你应该能看到屏幕上面的一坨测试文本与窗口。 cactbot 提供了默认的测试UI与蓝色的背景，来帮助你设置窗口大小和位置。这些测试信息都会在选中Lock时被隐藏。

    ![raidboss plugin sizing](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossSizing.png)

1. 取消配置界面中的 **Enable Clickthru** 选项，然后进入FFXIV按下悬浮窗的右下角并拖动来改变窗口的大小。 点击并拖动来移动窗口的位置，从而让其看起来更顺眼。如果您希望进一步美化也可以 [更改CSS文件](AdvancedCactbot.md#configuring-ui-modules)。最后它应该长成这样：

    ![raidboss plugin final](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossFinalSize.png)

1. 当您调整好悬浮窗的位置与大小后，勾选 **Lock Overlay** 和 **Enable Clickthru** 。

    此时 "Test bar", "ALARM TEXT", 和蓝色背景都会在Lock被选中后一起隐藏。

1. 如果您需要测试时间轴与触发器，您可以传送到中拉诺西亚的盛夏农庄并且参考这个 [指南](ui/raidboss/data/timelines/test.txt)。

## Cactbot自定义

参考 [这篇文档](AdvancedCactbot.md#configuring-ui-modules)

## 支持语言

cactbot 基于最终幻想14的英语、德语与法语客户端进行测试与开发。

通过[resources/regexes.js](resources/regexes.js)文件中声明的正则表达式，Unicode字符也可以被支持。但是 [时间轴](ui/raidboss/data/timelines)
和日志事件的 [触发器](ui/raidboss/data/triggers) 可能由于ACT日志中的对应名称不匹配而失效。

听说某獭姓宠物的爹爹正在召集人手增强触发器/时间轴来进一步支持其他（指中国）服务器。


