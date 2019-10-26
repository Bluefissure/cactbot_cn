'use strict';

[{
  zoneRegex: /^(The Final Coil Of Bahamut - Turn \(2\)|巴哈姆特大迷宫 \(真源之章2\))$/,
  timelineFile: 't11.txt',
  triggers: [
    {
      id: 'T11 Secondary Head',
      regex: / 15:\y{ObjectId}:Kaliya:B73:Secondary Head:\y{ObjectId}:(\y{Name}):/,
      regexCn: / 15:\y{ObjectId}:卡利亚:B73:侧首:\y{ObjectId}:(\y{Name}):/,
      regexDe: / 15:\y{ObjectId}:Kaliya:B73:Nebenkopf:\y{ObjectId}:(\y{Name}):/,
      regexFr: / 15:\y{ObjectId}:Kaliya:B73:Tête Secondaire:\y{ObjectId}:(\y{Name}):/,
      regexJa: / 15:\y{ObjectId}:カーリア:B73:サブヘッド:\y{ObjectId}:(\y{Name}):/,
      alertText: function(data, matches) {
        return {
            en: 'Stun on ' + data.ShortName(matches[1]),
            cn: data.ShortName(matches[1]) + '接死刑换T挑衅',
        };
      },
    },
    {
      id: 'T11 Seed River First',
      regex: / 15:\y{ObjectId}:Kaliya:B74:/,
      regexCn: / 15:\y{ObjectId}:卡利亚:B74:/,
      regexDe: / 15:\y{ObjectId}:Kaliya:B74:/,
      regexFr: / 15:\y{ObjectId}:Kaliya:B74:/,
      regexJa: / 15:\y{ObjectId}:カーリア:B74:/,
      alertText: function(data) {
        if (data.firstSeed)
          return;
        return {
            en: 'Spread => Stack',
            cn: '分散后分摊',
        };
      },
      run: function(data) {
        if (!data.firstSeed)
          data.firstSeed = 'river';
      },
    },
    {
      id: 'T11 Seed Sea First',
      regex: / 15:\y{ObjectId}:Kaliya:B75:/,
      regexCn: / 15:\y{ObjectId}:卡利亚:B75:/,
      regexDe: / 15:\y{ObjectId}:Kaliya:B75:/,
      regexFr: / 15:\y{ObjectId}:Kaliya:B75:/,
      regexJa: / 15:\y{ObjectId}:カーリア:B75:/,
      alertText: function(data) {
        if (data.firstSeed)
          return;
        return {
            en: 'Stack => Spread',
            cn: '分摊后分散',
        };
      },
      run: function(data) {
        if (!data.firstSeed)
          data.firstSeed = 'sea';
      },
    },
    {
      id: 'T11 Seed River Second',
      regex: / 1[56]:\y{ObjectId}:Kaliya:B76:Seed Of The Rivers:/,
      regexCn: / 1[56]:\y{ObjectId}:卡利亚:B76:Seed Of The Rivers:/,
      regexDe: / 1[56]:\y{ObjectId}:Kaliya:B76:Seed Of The Rivers:/,
      regexFr: / 1[56]:\y{ObjectId}:Kaliya:B76:Seed Of The Rivers:/,
      regexJa: / 1[56]:\y{ObjectId}:カーリア:B76:Seed Of The Rivers:/,
      infoText: function(data) {
        if (!data.firstSeed)
          return;
        return {
            en: 'Stack',
            cn: '分摊',
        };
      },
      run: function(data) {
        delete data.firstSeed;
      },
    },
    {
      id: 'T11 Seed Sea Second',
      regex: / 1[56]:\y{ObjectId}:Kaliya:B77:Seed Of The Sea:/,
      regexCn: / 1[56]:\y{ObjectId}:卡利亚:B77:Seed Of The Sea:/,
      regexDe: / 1[56]:\y{ObjectId}:Kaliya:B77:Seed Of The Sea:/,
      regexFr: / 1[56]:\y{ObjectId}:Kaliya:B77:Seed Of The Sea:/,
      regexJa: / 1[56]:\y{ObjectId}:カーリア:B77:Seed Of The Sea:/,
      infoText: function(data) {
        if (!data.firstSeed)
          return;
        return {
            en: 'Spread',
            cn: '分散',
        };
      },
      run: function(data) {
        delete data.firstSeed;
      },
    },
    {
      id: 'T11 Phase 2',
      regex: /:Kaliya HP at 60%/,
      regexCn: /:卡利亚 HP at 60%/,
      regexDe: /:Kaliya HP at 60%/,
      regexFr: /:Kaliya HP at 60%/,
      regexJa: /:カーリア HP at 60%/,
      sound: 'Long',
      infoText: function(data, matches) {
        return {
            en: 'Out of Middle',
            cn: '脚下有泥 远离',
        };
      },
    },
    {
      id: 'T11 Forked Lightning',
      regex: / 15:\y{ObjectId}:Electric Node:B85:Forked Lightning:\y{ObjectId}:(\y{Name}):/,
      regexCn: / 15:\y{ObjectId}:雷击系统:B85:叉形闪电:\y{ObjectId}:(\y{Name}):/,
      regexDe: / 15:\y{ObjectId}:Elektrisch[a] Modul:B85:Gabelblitz:\y{ObjectId}:(\y{Name}):/,
      regexFr: / 15:\y{ObjectId}:Module D'électrochoc:B85:Éclair Ramifié:\y{ObjectId}:(\y{Name}):/,
      regexJa: / 15:\y{ObjectId}:雷撃システム:B85:フォークライトニング:\y{ObjectId}:(\y{Name}):/,
      condition: function(data, matches) {
        return matches[1] == data.me;
      },
      alarmText: {
          en: 'Lightning on YOU',
          cn: '雷点名出人群',
      },
    },
    {
      id: 'T11 Phase 3',
      regex: /15:\y{ObjectId}:Kaliya:B78:Emergency Mode/,
      regexCn: /15:\y{ObjectId}:卡利亚:B78:紧急模式/,
      regexDe: /15:\y{ObjectId}:Kaliya:B78:Notprogramm/,
      regexFr: /15:\y{ObjectId}:Kaliya:B78:Mode D'urgence/,
      regexJa: /15:\y{ObjectId}:カーリア:B78:イマージャンシーモード/,
      sound: 'Long',
      infoText: function(data) {
        return {
            en: 'Final Phase',
            cn: '高伤转场AOE'
        };
      },
    },
    {
      id: 'T11 Tether Accumulate A',
      regex: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001C:/,
      regexCn: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:卡利亚:....:....:001C:/,
      regexDe: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001C:/,
      regexFr: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001C:/,
      regexJa: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:カーリア:....:....:001C:/,
      run: function(data, matches) {
        data.tetherA = data.tetherA || [];
        data.tetherA.push(matches[1]);
      },
    },
    {
      id: 'T11 Tether Accumulate B',
      regex: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001D:/,
      regexCn: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:卡利亚:....:....:001D:/,
      regexDe: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001D:/,
      regexFr: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:Kaliya:....:....:001D:/,
      regexJa: / 23:\y{ObjectId}:(\y{Name}):\y{ObjectId}:カーリア:....:....:001D:/,
      run: function(data, matches) {
        data.tetherB = data.tetherB || [];
        data.tetherB.push(matches[1]);
      },
    },
    {
      id: 'T11 Tether A',
      regex: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001C:/,
      regexCn: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:卡利亚:....:....:001C:/,
      regexDe: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001C:/,
      regexFr: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001C:/,
      regexJa: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:カーリア:....:....:001C:/,
      condition: function(data) {
        return data.tetherA.length == 2;
      },
      alarmText: function(data) {
        let partner = undefined;
        if (data.tetherA[0] == data.me)
          partner = data.tetherA[1];
        if (data.tetherA[1] == data.me)
          partner = data.tetherA[0];
        if (!partner)
          return;
        return {
            en: 'Red Tethers With ' + data.ShortName(partner),
            cn: data.ShortName(partner) + '注意红线点名',
        };
      },
    },
    {
      id: 'T11 Tether B',
      regex: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001D:/,
      regexCn: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:卡利亚:....:....:001D:/,
      regexDe: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001D:/,
      regexFr: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:Kaliya:....:....:001D:/,
      regexJa: / 23:\y{ObjectId}:\y{Name}:\y{ObjectId}:カーリア:....:....:001D:/,
      condition: function(data) {
        return data.tetherB.length == 2;
      },
      alarmText: function(data) {
        let partner = undefined;
        if (data.tetherB[0] == data.me)
          partner = data.tetherB[1];
        if (data.tetherB[1] == data.me)
          partner = data.tetherB[0];
        if (!partner)
          return;
        return {
            en: 'Blue Tethers With ' + data.ShortName(partner),
            cn: data.ShortName(partner) + '注意蓝线点名',
        };
      },
    },
    {
      id: 'T11 Tether Cleanup',
      regex: /16:\y{ObjectId}:Kaliya:B7B:Nanospore Jet:/,
      regexCn: /16:\y{ObjectId}:卡利亚:B7B:魔科学粒子散布:/,
      regexDe: /16:\y{ObjectId}:Kaliya:B7B:Nanosporen-Strahl:/,
      regexFr: /16:\y{ObjectId}:Kaliya:B7B:Jet De Magismoparticules:/,
      regexJa: /16:\y{ObjectId}:カーリア:B7B:魔科学粒子散布:/,
      run: function(data) {
        delete data.tetherA;
        delete data.tetherB;
      },
    },
  ],
  timelineReplace: [
    {
      'locale': 'de',
      'replaceSync': {
        'Weapons Node': 'Waffen-Sphäre',
        'Kaliya': 'Kaliya',
        'Gravity Node': 'Schwerkraft-Modul',
        'Engage!': 'Start!',
        'Electric Node': 'Elektrisch[a] Modul',
      },
      'replaceText': {
        'Vacuum Wave': 'Vakuumwelle',
        'Unknown Ability': 'Unknown Ability',
        'Self-detonate': 'Zerbersten',
        'Seed of the Sea': 'Samen der See',
        'Seed of the Rivers': 'Samen der Flüsse',
        'Secondary Head': 'Nebenkopf',
        'Resonance': 'Resonanz',
        'Repelling Cannons': 'Rückstoßkanone',
        'Nerve Gas': 'Nervengas',
        'Nerve Cloud': 'Nervenwolke',
        'Nanospore Jet': 'Nanosporen-Strahl',
        'Nanospore Cloud': 'Nanosporen-Wolke',
        'Main Head': 'Hauptkopf',
        'Gravity Field': 'Gravitationsfeld',
        'Forked Lightning': 'Gabelblitz',
        'Enrage': 'Finalangriff',
        'Emergency Mode': 'Notprogramm',
        'Barofield': 'Baro-Feld',
        'Auto-cannons': 'Auto-Kanone',
        '--untargetable--': '--nich anvisierbar--',
        '--targetable--': '--anvisierbar--',
        '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3',
        '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用': '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用',
      },
      '~effectNames': {
        'Stun': 'Betäubung',
        'In the Headlights': 'Hauptkopf',
        'Heavy': 'Gewicht',
        'Forked Lightning': 'Gabelblitz',
        'Energy Field Down': 'Anti-Abwehrfeld',
        'Aetherochemical Nanospores α': 'Nanosporen α',
      },
    },
    {
      'locale': 'fr',
      'replaceSync': {
        'Weapons Node': 'Sphère D\'armement',
        'Kaliya': 'Kaliya',
        'Gravity Node': 'Module De Gravité',
        'Engage!': 'À l\'attaque',
        'Electric Node': 'Module D\'électrochoc',
      },
      'replaceText': {
        'Vacuum Wave': 'Vague De Vide',
        'Unknown Ability': 'Unknown Ability',
        'Self-detonate': 'Auto-atomisation',
        'Seed of the Sea': 'Germe de la mer',
        'Seed of the Rivers': 'Germe de la rivière',
        'Secondary Head': 'Tête Secondaire',
        'Resonance': 'Résonance',
        'Repelling Cannons': 'Canons Répulsifs',
        'Nerve Gas': 'Gaz Neurotoxique',
        'Nerve Cloud': 'Nuage Neurotoxique',
        'Nanospore Jet': 'Jet De Magismoparticules',
        'Nanospore Cloud': 'Désintégration Particulaire',
        'Main Head': 'Tête Principale',
        'Gravity Field': 'Champ De Gravité',
        'Forked Lightning': 'Éclair Ramifié',
        'Enrage': 'Enrage',
        'Emergency Mode': 'Mode D\'urgence',
        'Barofield': 'Barotraumatisme',
        'Auto-cannons': 'Canons Automatiques',
        '--untargetable--': '--Impossible à cibler--',
        '--targetable--': '--Ciblable--',
        '--sync--': '--Synchronisation--',
        '--Reset--': '--Réinitialisation--',
        '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3',
        '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用': '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用',
      },
      '~effectNames': {
        'Stun': 'Étourdissement',
        'In the Headlights': 'À portée de tête',
        'Heavy': 'Pesanteur',
        'Forked Lightning': 'Éclair Ramifié',
        'Energy Field Down': 'Anti-champ Défensif',
        'Aetherochemical Nanospores α': 'Magismoparticules α',
      },
    },
    {
      'locale': 'ja',
      'replaceSync': {
        'Weapons Node': '砲撃システム',
        'Kaliya': 'カーリア',
        'Gravity Node': '重力システム',
        'Engage!': '戦闘開始！',
        'Electric Node': '雷撃システム',
      },
      'replaceText': {
        'Vacuum Wave': '真空波',
        'Unknown Ability': 'Unknown Ability',
        'Self-detonate': '爆発霧散',
        'Seed of the Sea': 'シード・オブ・シー',
        'Seed of the Rivers': 'シード・オブ・リバー',
        'Secondary Head': 'サブヘッド',
        'Resonance': 'レゾナンス',
        'Repelling Cannons': 'リペリングカノン',
        'Nerve Gas': 'ナーブガス',
        'Nerve Cloud': 'ナーブクラウド',
        'Nanospore Jet': '魔科学粒子散布',
        'Nanospore Cloud': '粒子崩壊',
        'Main Head': 'メインヘッド',
        'Gravity Field': '重力場',
        'Forked Lightning': 'フォークライトニング',
        'Emergency Mode': 'イマージャンシーモード',
        'Barofield': 'バロフィールド',
        'Auto-cannons': 'オートマチックカノン',
        '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3',
        '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用': '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用',
      },
      '~effectNames': {
        'Stun': 'スタン',
        'In the Headlights': 'メインヘッド耐性低下',
        'Heavy': 'ヘヴィ',
        'Forked Lightning': 'フォークライトニング',
        'Energy Field Down': '対防御フィールド',
        'Aetherochemical Nanospores α': '魔科学粒子α',
      },
    },
    {
      'locale': 'cn',
      'replaceSync': {
        'Weapons Node': '炮击系统',
        'Kaliya': '卡利亚',
        'Gravity Node': '重力系统',
        'Engage!': '战斗开始！',
        'Electric Node': '雷击系统',
      },
      'replaceText': {
        'Vacuum Wave': '真空波',
        'Unknown Ability': 'Unknown Ability',
        'Self-detonate': '自爆',
        'Seed of the Sea': '海洋之种',
        'Seed of the Rivers': '江河之种',
        'Secondary Head': '侧首',
        'Resonance': '共鸣',
        'Repelling Cannons': '排斥炮',
        'Nerve Gas': '神经毒气',
        'Nerve Cloud': '神经云',
        'Nanospore Jet': '魔科学粒子散布',
        'Nanospore Cloud': '粒子崩坏',
        'Main Head': '主首',
        'Gravity Field': '重力场',
        'Forked Lightning': '叉形闪电',
        'Emergency Mode': '紧急模式',
        'Barofield': '气压领域',
        'Auto-cannons': '自动火炮',
        '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：オートアタック：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/B：バハムートダンジョン3',
        '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3': '(仮)ティアマット：メカハイドラ：3連メテオ発射/A：バハムートダンジョン3',
        '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用': '(仮)ダラガブ球：AA：バハムートダンジョン3/ボス2用',
      },
      '~effectNames': {
        'Stun': '眩晕',
        'In the Headlights': '主首耐性降低',
        'Heavy': '加重',
        'Forked Lightning': '叉形闪电',
        'Energy Field Down': '防御力场抵消',
        'Aetherochemical Nanospores α': '魔科学粒子α',
      },
    },
  ],
}];
