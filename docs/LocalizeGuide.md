# cactbot 本地化教学


1. [raidboss](#raidboss)

## raidboss

1. fork [cactbot](https://github.com/Bluefissure/cactbot/tree/cn_dev)，切换branch至Bluefissure的`cn_dev`
2. 打一局，并将log上传fflogs，公开log，如果有公开的log，也可以直接用已经存在的log
3. fflogs申请API Key
4. 进入util文件夹，运行`python translate_fight.py -r 上传至fflogs的日志ID -of 输出文件 -k 你所申请的fflogs_API_Public_Key  -rf 第几场战斗`
5. 对生成的文件运行`npm run lint`，并将对应的`cn`相关翻译内容添加到`ui/raidboss/data/triggers/` 的对应文件末尾，在对应的ZoneRegex中添加/修改为中文区域
6. 运行`python check_translation.py -f 触发器文件名称`，会自动通过TimelineTranslate翻译触发器
7. 手动修改触发器动作、AlertText等内容
8. 测试
9. 测试完毕后给本项目提起PR
