'use strict';

[{
    zoneRegex: /^(The Final Coil Of Bahamut - Turn \(3\)|巴哈姆特大迷宫 \(真源之章3\))$/,
  timelineFile: 't12.txt',
  triggers: [
    {
      id: 'T12 Phase 3',
      regex: / 15:\y{ObjectId}:Phoenix:B96:/,
      regexCn: / 15:\y{ObjectId}:不死鸟:B96:/,
      regexDe: / 15:\y{ObjectId}:Ph?nix:B96:/,
      regexFr: / 15:\y{ObjectId}:Phénix:B96:/,
      regexJa: / 15:\y{ObjectId}:フェニックス:B96:/,
      sound: 'Long',
      run: function(data) {
        data.phase = 3;
      },
    },
    {
      id: 'T12 Bennu',
      regex: / 03:Added new combatant Bennu/,
      regexCn: / 03:Added new combatant 贝努鸟/,
      regexDe: / 03:Added new combatant Bennu/,
      regexFr: / 03:Added new combatant Bénou/,
      regexJa: / 03:Added new combatant ベンヌ/,
      delaySeconds: 55,
      durationSeconds: 4.5,
      infoText: function(data) {
        if (data.phase >= 3)
          return;
        return {
            en: 'Bennu Soon',
            cn:'小鸟转火',
        };
      },
    },
    {
      id: 'T12 Revelation',
      regex: / 14:B87:Phoenix starts using Revelation on (\y{Name})\./,
      regexCn: / 14:B87:不死鸟 starts using 天启 on (\y{Name})\./,
      regexDe: / 14:B87:Ph?nix starts using Offenbarung on (\y{Name})\./,
      regexFr: / 14:B87:Phénix starts using Révélation on (\y{Name})\./,
      regexJa: / 14:B87:フェニックス starts using リヴァレーション on (\y{Name})\./,
      alertText: function(data, matches) {
        if (matches[1] == data.me) {
          return {
              en: 'Revelation on YOU',
              cn: '死刑换T',
          };
        }
      },
      infoText: function(data, matches) {
        if (matches[1] != data.me) {
          return {
              en: 'Away from ' + data.ShortName(matches[1]),
              cn: data.ShortName(matches[1]) + '吃死刑 注意换T',
          };
        }
      },
    },
    {
      id: 'T12 Blackfire',
      regex: / 14:B8C:Phoenix starts using Blackfire/,
      regexCn: / 14:B8C:不死鸟 starts using 漆黑之炎/,
      regexDe: / 14:B8C:Ph?nix starts using Schwarzfeuer/,
      regexFr: / 14:B8C:Phénix starts using Flamme Noire/,
      regexJa: / 14:B8C:フェニックス starts using 漆黒の炎/,
      infoText: {
          en: 'Blackfire Spread',
          cn: '黑火刷新 远离远离'
      },
    },
    {
      id: 'T12 Whitefire',
      regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:0020:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      alertText: {
          en: 'Whitefire on YOU',
          cn: '白火点你 快找黑火'
      },
    },
    {
      id: 'T12 Bluefire',
      regex: / 1B:\y{ObjectId}:(\y{Name}):....:....:0021:/,
      condition: function(data, matches) {
        return data.me == matches[1];
      },
      alertText: {
          en: 'Bluefire Away',
          cn: '蓝火出现 准备撞球',
      },
    },
    {
      id: 'T12 Chain',
      regex: / 1A:(\y{Name}) gains the effect of Chain Of Purgatory/,
      alertText: function(data, matches) {
        if (matches[1] == data.me) {
          return {
              en: 'Chain on YOU',
              cn: '红火点你 撞球撞球'
          };
        }
      },
      infoText: function(data, matches) {
        if (matches[1] != data.me) {
          return {
              en: 'Chain on ' + data.ShortName(matches[1]),
              cn: '红火点' + data.ShortName(matches[1]) + '远离路径',
          };
        }
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Redfire': 'Rotfeuer',
        'Phoenix-Egi': 'Ph?nix-Egi',
        'Phoenix': 'Ph?nix',
        'Engage!': 'Start!',
        'Blackfire': 'Schwarzfeuer',
        'Bennu': 'Bennu',
      },
      'replaceText': {
        'attack': 'Attacke',
        'Whitefire': 'Wei?feuer',
        'Unknown Ability': 'Unknown Ability',
        'Summon': 'Beschw?rung',
        'Sharp Strike': 'Spitzer Schlag',
        'Scorched Pinion': 'Versengte Schwinge',
        'Revelation': 'Offenbarung',
        'Rejuvenation': 'Verjüngung',
        'Redfire Blaze': 'Rotfeuer-Schwall',
        'Redfire': 'Rotfeuer',
        'Rebirth': 'Wiedergeburt',
        'Fountain of Life': 'Quell des Lebens',
        'Fountain of Fire': 'Quell des Feuers',
        'Flames of Unforgiveness': 'Zeichen der L?uterung',
        'Flames of Rebirth': 'Flammen der Wiedergeburt',
        'Fantod': 'Fantod',
        'Enrage': 'Finalangriff',
        'Brand of Purgatory': 'Zeichen der L?uterung',
        'Bluefire': 'Blaufeuer',
        'Blackfire': 'Schwarzfeuer',
        '--untargetable--': '--nich anvisierbar--',
        '--targetable--': '--anvisierbar--',
        '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3': '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3',
        '(仮)フェニックス：原種：着地：バハムートダンジョン3': '(仮)フェニックス：原種：着地：バハムートダンジョン3',
      },
      '~effectNames': {
        'Revelation Resistance Down': 'Offenbarungs-Resistenz -',
        'Chain of Purgatory': 'Kette der Purgation',
        'Burns': 'Brandwunde',
        'Bluefire': 'Blaufeuer',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Redfire': 'Flamme Rouge',
        'Phoenix-Egi': 'Phénix-Egi',
        'Phoenix': 'Phénix',
        'Engage!': '? l\'attaque',
        'Blackfire': 'Flamme Noire',
        'Bennu': 'Bénou',
      },
      'replaceText': {
        'attack': 'Attaque',
        'Whitefire': 'Flamme Blanche',
        'Unknown Ability': 'Unknown Ability',
        'Summon': 'Incidence',
        'Sharp Strike': 'Frappe Tranchante',
        'Scorched Pinion': 'Aile Embrasante',
        'Revelation': 'Révélation',
        'Rejuvenation': 'Rajeunissement',
        'Redfire Blaze': 'Brasier Rouge',
        'Redfire': 'Flamme Rouge',
        'Rebirth': 'Résurrection',
        'Fountain of Life': 'Souffle de la vie',
        'Fountain of Fire': 'Flamme de la vie',
        'Flames of Unforgiveness': 'Flammes du purgatoire',
        'Flames of Rebirth': 'Feu résurrecteur',
        'Fantod': 'Irascibilité',
        'Enrage': 'Enrage',
        'Brand of Purgatory': 'Tison du purgatoire',
        'Bluefire': 'Flamme Bleue',
        'Blackfire': 'Flamme Noire',
        '--untargetable--': '--Impossible à cibler--',
        '--targetable--': '--Ciblable--',
        '--sync--': '--Synchronisation--',
        '--Reset--': '--Réinitialisation--',
        '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3': '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3',
        '(仮)フェニックス：原種：着地：バハムートダンジョン3': '(仮)フェニックス：原種：着地：バハムートダンジョン3',
      },
      '~effectNames': {
        'Revelation Resistance Down': 'Résistance à Révélation réduite',
        'Chain of Purgatory': 'Souffle du purgatoire',
        'Burns': 'Br?lure',
        'Bluefire': 'Flamme Bleue',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Redfire': '紅蓮の炎',
        'Phoenix-Egi': 'フェニックス?エギ',
        'Phoenix': 'フェニックス',
        'Engage!': '戦闘開始！',
        'Blackfire': '漆黒の炎',
        'Bennu': 'ベンヌ',
      },
      'replaceText': {
        'attack': '攻撃',
        'Whitefire': '白熱の炎',
        'Unknown Ability': 'Unknown Ability',
        'Summon': '招来',
        'Sharp Strike': 'シャープストライク',
        'Scorched Pinion': '炎の翼',
        'Revelation': 'リヴァレーション',
        'Rejuvenation': 'リジュヴァネーション',
        'Redfire Blaze': '紅蓮の大炎上',
        'Redfire': '紅蓮の炎',
        'Rebirth': '新生',
        'Fountain of Life': '霊泉の息吹',
        'Fountain of Fire': '霊泉の炎',
        'Flames of Unforgiveness': '煉獄の爆炎',
        'Flames of Rebirth': '転生の炎',
        'Fantod': 'ファンダッド',
        'Brand of Purgatory': '煉獄の炎',
        'Bluefire': '青碧の炎',
        'Blackfire': '漆黒の炎',
        '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3': '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3',
        '(仮)フェニックス：原種：着地：バハムートダンジョン3': '(仮)フェニックス：原種：着地：バハムートダンジョン3',
      },
      '~effectNames': {
        'Revelation Resistance Down': 'リヴァレーション耐性低下',
        'Chain of Purgatory': '誘爆',
        'Burns': '火傷',
        'Bluefire': '青碧の炎',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Redfire': '红莲之炎',
        'Phoenix-Egi': '不死鸟之灵',
        'Phoenix': '不死鸟',
        'Engage!': '战斗开始！',
        'Blackfire': '漆黑之炎',
        'Bennu': '贝努鸟',
      },
      'replaceText': {
        'attack': '攻击',
        'Whitefire': '白热之炎',
        'Unknown Ability': 'Unknown Ability',
        'Summon': '召唤',
        'Sharp Strike': '突然袭击',
        'Scorched Pinion': '炎之翼',
        'Revelation': '天启',
        'Rejuvenation': '复燃',
        'Redfire Blaze': '红莲之炽焰',
        'Redfire': '红莲之炎',
        'Rebirth': '重生',
        'Fountain of Life': '灵泉之气息',
        'Fountain of Fire': '灵泉之炎',
        'Flames of Unforgiveness': '炼狱之燎火',
        'Flames of Rebirth': '转生之炎',
        'Fantod': '惊恐',
        'Brand of Purgatory': '炼狱之炎',
        'Bluefire': '青蓝之炎',
        'Bennu Add': '小鸟刷新',
        'Blackfire': '漆黑之炎',
        '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3': '(仮)フェニックス：原種：飛び上がる：バハムートダンジョン3',
        '(仮)フェニックス：原種：着地：バハムートダンジョン3': '(仮)フェニックス：原種：着地：バハムートダンジョン3',
      },
      '~effectNames': {
        'Revelation Resistance Down': '天启耐性降低',
        'Chain of Purgatory': '引爆',
        'Burns': '火伤',
        'Bluefire': '青蓝之炎',
      },
    },
  ],
}];
