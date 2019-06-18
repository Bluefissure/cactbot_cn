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

您必须启用 [DirectX 11](http://imgur.com/TjcnjmG) 模式。.

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

1. 重启ACT.

1. 在ACT的OverlayPlugin选项卡中添加cactbot的悬浮窗，并选择类型为`cactbot` 。

1. 在URL中选中您想添加的html文件。

1. In the URL field, browse to an html file to load.

    您可以通过加载[ui/test/test.html](ui/test/test.html)来测试安装过程无误。

更多的cactbot悬浮窗安装指南，请参考 [Adding Overlay Modules](#adding-overlay-modules) 小节。

### Potential errors and workarounds

If you get an error that it can't find **FFXIV_ACT_Plugin.dll**, make sure the **FFXIV_ACT_Plugin.dll** is in the same directory as **Advanced Combat Tracker.exe**.

If you get an error in the OverlayPlugin console similar to `Exception in SendFastRateEvents: Method not found: 'Void RainbowMage.HtmlRenderer.Renderer.ExecuteScript(System.String)'.` then you are still using the RainbowMage version of OverlayPlugin and need to upgrade to the latest x64 full version of the [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest) instead.

If you get an error on the OverlayPlugin console similar to `Uncaught TypeError: window.OverlayPluginApi.overlayMessage is not a function`, then you are using an earlier version of the OverlayPlugin.  You need to be using the latest x64 full version of the [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest).

If you get an error in the OverlayPlugin console similar to `Error: (overlay): C:\Program Files (x86)\Advanced Combat Tracker\OverlayPlugin\addons\CactbotOverlay.dll: System.IO.FileNotFoundException: Could not load file or assembly 'Newtonsoft.Json, Version=10.0.0.0, Culture=neutral, PublicKeyToken=30ad4fe6b2a6aeed' or one of its dependencies. The system cannot find the file specified.` then you have likely installed the wrong version of the OverlayPlugin.  Please reinstall the latest x64 full version of the [hibiyasleep OverlayPlugin](https://github.com/hibiyasleep/OverlayPlugin/releases/latest).

If you get an error in the OverlayPlugin console similar to `System.MissingMethodException: Method not found: '!!0[] System.Array.Empty()` then you have installed the wrong .NET framework version.  Please install the [.NET Framework](https://www.microsoft.com/net/download/framework) version 4.6.1 or above.

If you get a [CAS policy](https://blogs.msdn.microsoft.com/drew/2009/12/23/xunit-and-td-net-fixing-the-attempt-was-made-to-load-an-assembly-from-a-network-location-problem/) error on starting the OverlayPlugin, such as `An attempt was made to load an assembly from a network location which would have caused the assembly to be sandboxed in previous version of the .NET Framework.` then this means that you have forgotten to unblock some/all of your DLLs (either hibiyasleep or cactbot).  First, stop ACT.  Then, unblock everything; the easiest way is to unblock the original zip file and re-extract rather than unblocking every file individually.  Finally, restart ACT again.

If you get an overlay plugin error similar to `Error: (overlay): Exception in SendFastRateEvents: Could not load file or assembly 'FFXIV_ACT_Plugin, Version=(version), Culture=neutral, PublicKeyToken=null' or one of its dependencies. The system cannot find the file specified.` then you likely need to unblock the ffxiv plugin.  See the instructions above for unblocking DLLs.

If you get an ACT dialog that says `Invalid Plugin` and `This assembly does not have a class that implements ACT's plugin interface`, then you are loading the plugin incorrectly.  Cactbot is an overlay and not a direct ACT plugin.  Plugins like **FFXIV_ACT_PLUGIN.dll** and **OverlayPlugin.dll** are ACT plugins and are loaded via ACT -> Plugins -> Plugin Listing -> Add/Enable Plugin.  Cactbot is an overlay plugin.  You load it via going to Plugins -> OverlayPlugin.dll -> New.  See the [adding overlay modules](#adding-overlay-modules) section for more details.

If triggers or pieces of the UI do not work, ensure that "Disable Parsing from Network Data" is **not** checked in the FFXIV plugin settings. Network data is required for accurate trigger timing.

If you are using cactbot for dps parsing and you don't get any data, make sure that the DPS update rate is set to a number higher than zero in your plugin config.  Setting it to 3 is a good default.

## Building from source

Follow all the steps above for installing cactbot first.

1. Follow the instructions in the **dummy.txt** file in [CactbotOverlay/ThirdParty/OverlayPlugin](CactbotOverlay/ThirdParty/OverlayPlugin).
1. Follow the instructions in the **dummy.txt** file in [CactbotOverlay/ThirdParty/ACT](CactbotOverlay/ThirdParty/ACT).
1. Open the solution in Visual Studio (tested with Visual Studio 2017).
1. Build for "Release" and "x64".
1. The plugin will be built as **bin/x64/Release/CactbotOverlay.dll**.
1. Copy the plugin to the Advanced Combat Tracker\\OverlayPlugin\\addons\\ directory

## UI module overview

The [ui/](ui/) directory contains cactbot's ui modules.  If you installed cactbot following the instructions above, this will most likely be **C:\\...\\Advanced Combat Tracker\\OverlayPlugin\\cactbot\\ui**.

Each cactbot ui module should be added as a separate overlay.  See the [Adding Overlay Modules](#adding-overlay-modules) section for more details about setup.

### [raidboss](ui/raidboss) module

To use this module, point cactbot at **ui/raidboss/raidboss.html**.

This module provides a visual timeline of upcoming events in a fight, as well as text and audio
notifications to help increase raid awareness. Text and sound alerts can be based on the fight
timeline, or come from log messages that occur in the game, similar to ACT's "Custom Triggers".
The module is designed to look and feel similar to the
[BigWigs Bossmods](https://mods.curse.com/addons/wow/big-wigs) addon for World of Warcraft.

Fight timelines are provided in files designed for the [ACT Timeline](https://github.com/grindingcoil/act_timeline)
plugin, [documented here](http://dtguilds.enjin.com/forum/m/37032836/viewthread/26353492-act-timeline-plugin)
with [some extensions](ui/raidboss/data/timelines/README.txt).

There are three levels of text alerts, in order of escalating importance: `info`, `alert`, and `alarm`.
Text messages will be in one of these, and more important levels are larger and more eye grabbing colors.  [Text-to-speech can be configured](AdvancedCactbot.md#text-to-speech) if you prefer that over on screen text.

Timeline files are found in [ui/raidboss/data/timelines](ui/raidboss/data/timelines). Triggers
for text and sound alerts are found in [ui/raidboss/data/triggers](ui/raidboss/data/triggers).

In this screenshot, the raidboss module is highlighted, with the timeline circled in red, and the
text alerts circled in yellow, with an `alert`-level text message visible.

![raidboss screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/Raidboss.png)

### [oopsyraidsy](ui/oopsyraidsy) module

To use this module, point cactbot at **ui/oopsyraidsy/oopsyraidsy.html**.

This module provides mistake tracking and death reporting.  Oopsy raidsy is meant to reduce the time wasted understanding what went wrong on fights and how people died.  During the fight, only a limited number of mistakes are shown (to avoid clutter), but afterwards a full scrollable list is displayed.

When somebody dies, the last thing they took damage from is listed in the log.  For example, if the log specifies: ":skull: Poutine: Iron Chariot (82173/23703)" this means that Poutine most likely died to Iron Chariot, taking 82173 damage and having 23703 health at the time.  The health value itself is not perfect and may be slightly out of date by a ~second due to a hot tick or multiple simultaneous damage sources.

When mistakes are made that are avoidable, oopsy logs warning (:warning:) and failure (:no_entry_sign:) messages, explaining what went wrong.

Mistake triggers are specified for individual fights in the [ui/oopsyraidsy/data](ui/oopsyraidsy/data) folder.

![oopsy screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_oopsy.png)

### [jobs](ui/jobs) module

To use this module, point cactbot at **ui/jobs/jobs.html**

This module provides health, mana, and tp bars, as well as icons and timer bars for big raid buffs such as
The Balance and Trick Attack. It also features a food buff warning to keep up your food buff when leveling
or raiding, and a visual pull countdown.

It has more fleshed out support for some jobs but is *strongly* a Work In Progress for others.

* Red Mage: Shows white/black mana, tracks procs for Verstone, Verfire and Impact, and shows the state of the melee combo in progress.
* Warrior: Shows the beast amount, and tracks the remaining Storm's Eye buff time in gcds.
* Monk: Shows chakra count, remaining greased lightning time, and tracks monk buffs and debuffs.

In this screenshot, the jobs module is highlighted for the Red Mage job. The health and mana bars, as well
as Red Mage white/black mana tracking is circled in purple, with the large raid buff tracking pointed to
beside it in orange. The first step of the melee combo has been executed, which is displayed as the yellow
box above the health bar. The proc tracking is circled below in green.

![jobs screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/Jobs.png)

### [eureka](ui/eureka) module

To use this module, point cactbot at **ui/eureka/eureka.html**

This module provides automatic tracking of NMs that are popped or have
been killed.  It shows gales/night timers and any local tracker link
that has been pasted in chat.  Any flags in chat are also temporarily
included on the map.

It currently does not read the tracker information directly.  However,
if you click on the left/red "Copy killed NMs" button in the tracker to
copy the list of currently dead NMs, you can paste it in game, e.g.
`/echo ★ NMs on cooldown: Serket (7m) > Julika (24m) > Poly (54m)`

If you do not see the emoji, make sure you have installed [this Windows update](https://support.microsoft.com/en-us/help/2729094/an-update-for-the-segoe-ui-symbol-font-in-windows-7-and-in-windows-ser).

![eureka screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_eureka.png)

### [fisher](ui/fisher) module

To use this module, point cactbot at **ui/fisher/fisher.html**

When you cast your line at a fishing hole, this module keeps track of when you reel in particular fish so that you know what you might be getting when you hook it.

![fishing screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/promo_fishing.png)

### [dps](ui/dps) meters

cactbot can be used with any dps meter overlay designed for OverlayPlugin's miniparse
addon, with the option to build out more features through cactbot's additional Javascript
APIs.  cactbot also auto-stops fights on wipes, so you can configure ACT's fight time to
infinity.

The [xephero](ui/dps/xephero) dps meter is based on the same dps meter built for miniparse,
with the additional ability to do per-phase dps tracking, displayed in additional columns.
In the screenshot below the phases are named B1, B2, B3.  These autogenerate from dungeon bosses, but could be used to differentiate raid fight phases.

![xephero screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/xephero.png)

The [rdmty](ui/dps/rdmty) dps meter is based on the same dps meter for miniparse, and updated
for Stormblood jobs and recolored to match [fflogs](http://fflogs.com).

![rdmty screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/rdmty.png)

### [pull counter](ui/pullcounter) module

This small module sticks the current pull count for raiding bosses on screen.
This is primarily for folks who stream a lot and want to review video footage.
Having a number on screen makes it easy to scrub through video and find
particular pulls to review.

![pull counter screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/pullcounter.png)

### [test](ui/test) module

To use this module, point cactbot at **ui/test/test.html**

This module is just an onscreen test of cactbot variables and is not meant to be used while playing.
It can be useful to try out to make sure everything is working as expected or to use to help debug
[writing your own module](AdvancedCactbot.md#writing-a-cactbot-ui-module).

![test screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/test.png)

### Adding overlay modules

Here's an example of how to set up the raidboss overlay module.  Adding other modules is exactly the same, except you need to point the URL to a different HTML file for that specific module.

To add a cactbot module is the same as adding any overlay plugin.

1. Open ACT.
1. Navigate to the Plugins tab of ACT and then the OverlayPlugin.dll tab inside it.

    ![overlay plugin tab screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginTab.png)

1. Click the "New" button and then select Cactbot in the "Type" dropdown.

    ![new overlay plugin screenshot](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginNew.png)

1. Type in any name you'd like as the name of this overlay, e.g. `raidbossy`.
1. A good example to start with is the raidboss module.  Set the filename to be **ui/raidboss/raidboss.html**.  Your config should look like this.

    ![raidboss plugin config](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossConfig.png)

1. At this point, you should see some bunched up test UI appear on screen.  cactbot provides default test UI and a blue background to help with resizing and placing overlays on screen.  These all go away when the overlay is locked in the config panel for the overlay.

    ![raidboss plugin sizing](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossSizing.png)

1. Uncheck the **Enable Clickthru** box on the config panel.  Then, in FFXIV, click and drag the lower right corner of the raidboss overlay to resize it.  Click and drag anywhere else on the raidboss overlay to move it.  This will make it look a lot better.  You can [configure this with CSS](AdvancedCactbot.md#configuring-ui-modules) if you want even more control.  It should look something like this:

    ![raidboss plugin final](https://github.com/Bluefissure/cactbot/raw/master/screenshots/OverlayPluginRaidbossFinalSize.png)

1. Once the overlay is in the right place, check the **Lock Overlay** and the **Enable Clickthru** boxes.

    The "Test bar", "ALARM TEXT", and shaded blue background will disappear once the overlay has been locked.

1. If you want to test the raidboss plugin, teleport to Summerford Farms, and follow [these instructions](ui/raidboss/data/timelines/test.txt).

## Cactbot Customization

See [this documentation](AdvancedCactbot.md#configuring-ui-modules) for more details.

## Supported Languages

cactbot is tested and works with the English, German and French versions of Final Fantasy XIV.

Unicode characters are supported thoughout, through the use of the helpers in the
[resources/regexes.js](resources/regexes.js) file. However [timelines](ui/raidboss/data/timelines)
and log event [triggers](ui/raidboss/data/triggers) may be incorrect if names that appear in the
ACT log events are different.
