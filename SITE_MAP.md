# 📊 页面关系与导航结构

## 网站架构图

```
                    🏠 首页 (/)
                    poke survivor
                    1,061 words
                         |
        +----------------+----------------+
        |                |                |
    英文内容          中文内容          游戏资源
        |                |                |
        |                |                |
   +----+----+      +----+----+      pokesurvivor.com
   |    |    |      |         |         (iframe)
   |    |    |      |         |
   V    V    V      V         V
        
📊 强度榜        🇨🇳 中文攻略     📱 手机版
tier-list        zh/            zh/mobile
1,144 词         3,981字符      9,324字符

⭐ 开局推荐
best-pokemon
2,475 词

📖 新手教程
how-to-play
2,987 词

👥 合作模式
co-op
1,325 词

⚔️ 裂隙打法
rifts
2,129 词

📚 图鉴
pokedex
966 只宝可梦
```

## 内部链接关系

```
首页 (/)
├─→ tier-list (强度榜完整版)
├─→ best-pokemon (开局选择建议)
├─→ how-to-play (新手教程)
├─→ co-op (合作玩法)
├─→ rifts (裂隙系统)
├─→ pokedex (图鉴，"966 Pokémon" 卡片)
└─→ zh/ (中文版本)

图鉴 (/pokedex)
├─→ / (返回首页)
└─→ 主导航 / 页脚 (所有页面)

强度榜 (/tier-list)
├─→ / (返回首页)
├─→ best-pokemon (开局推荐)
└─→ zh/ (中文版本)

开局推荐 (/best-pokemon)
├─→ / (返回首页)
├─→ tier-list (完整榜单)
└─→ how-to-play (游戏教程)

新手教程 (/how-to-play)
├─→ / (返回首页)
├─→ best-pokemon (选择宝可梦)
└─→ rifts (裂隙系统)

合作模式 (/co-op)
├─→ / (返回首页)
└─→ how-to-play (基础操作)

裂隙打法 (/rifts)
├─→ / (返回首页)
└─→ tier-list (宝可梦选择)

中文攻略 (/zh/)
├─→ / (English version)
├─→ mobile (手机版指南)
├─→ pokedex (图鉴，英文；正文 966 隻寶可夢段落)
└─→ tier-list (强度榜)

手机版 (/zh/mobile)
├─→ /zh/ (返回中文首页)
└─→ / (English version)
```

## 全局导航

- 英文主导航: Home / How to Play / Tier List / Best Pokémon / Pokédex / Rifts / Co-op / 中文
- 中文主导航: 首頁攻略 / 手機版 / 圖鑑（英文） / 英文進階攻略
- 页脚指南列表（中英）均包含 `/pokedex/`
- 移动端: 导航为横向滚动列表（`global.css` 中 `.nav-links` 的 `overflow-x: auto`），新增项无需额外样式

## 用户旅程地图

### 路径1: 新手玩家
```
首页 → 新手教程 → 开局推荐 → 开始游戏
  ↓
强度榜（后期参考）
```

### 路径2: 进阶玩家
```
首页 → 强度榜 → 裂隙打法 → 合作模式
```

### 路径3: 中文玩家
```
首页 → 中文攻略 → 手机版指南（移动端）
```

### 路径4: SEO流量
```
Google搜索
  ├─→ "poke survivor" → 首页
  ├─→ "pokesurvivor tier list" → 强度榜
  ├─→ "pokesurvivor pokedex" → 图鉴
  ├─→ "pokesurvivor best pokemon" → 开局推荐
  ├─→ "how to play pokesurvivor" → 新手教程
  ├─→ "pokesurvivor 攻略" → 中文攻略
  ├─→ "pokesurvivor co-op" → 合作模式
  └─→ "pokesurvivor rifts" → 裂隙打法
```

---

## 📱 响应式断点

```css
/* 移动端优先 */
默认: 320px - 767px (手机)
  
/* 平板 */
@media (min-width: 768px)
  
/* 桌面 */
@media (min-width: 1024px)
  
/* 大屏 */
@media (min-width: 1440px)
```

所有页面完全响应式，在所有设备上都能完美显示。

---

## 🔗 外部链接

每个页面都包含以下外部资源引用：

1. **游戏iframe**: pokesurvivor.com (首页、中文攻略、合作模式)
2. **官方来源**: 
   - pokesurvivor.com/en/guide/ (教程参考)
   - pokesurvivor.com/en/legendaries/ (裂隙参考)
3. **社区资源**:
   - pokesurvivorwiki.wiki (数据验证)

所有外部链接使用 `rel="noopener noreferrer"` 安全属性。
