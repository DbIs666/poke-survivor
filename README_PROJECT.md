# Poke Survivor 攻略站项目

## 项目概述

这是一个关于 PokeSurvivor 游戏的粉丝攻略站，使用 Astro 构建，部署在 Cloudflare Workers。

### 技术栈

- **框架**: Astro 7.3.8
- **语言**: TypeScript 5.9.3
- **部署**: Cloudflare Workers
- **集成**: @astrojs/sitemap
- **国际化**: 英文 (en) + 繁体中文 (zh)

### 项目结构

```
poke-survivor/
├── src/
│   ├── components/
│   │   ├── SEOHead.astro          # SEO meta标签组件
│   │   └── GameEmbed.astro        # 游戏iframe嵌入组件
│   ├── layouts/
│   │   └── BaseLayout.astro       # 基础布局（导航+页脚）
│   ├── pages/
│   │   ├── index.astro            # P0: 首页
│   │   ├── tier-list.astro        # P0: 强度榜
│   │   ├── best-pokemon.astro     # P1: 开局推荐
│   │   ├── how-to-play.astro      # P1: 新手教程
│   │   ├── co-op.astro            # P2: 合作模式
│   │   ├── rifts.astro            # P2: 裂隙打法
│   │   └── zh/
│   │       ├── index.astro        # P0: 中文攻略
│   │       └── mobile.astro       # P1: 手机版指南
│   └── styles/
│       └── global.css             # 全局样式系统
├── public/
│   ├── images/                    # 游戏截图和图标
│   ├── favicon.svg
│   ├── og-default.jpg             # 社交分享图
│   └── robots.txt
├── astro.config.mjs
├── package.json
├── wrangler.toml                  # Cloudflare配置
└── SEO_VALIDATION.md              # SEO验收清单
```

## 页面清单

### P0 优先级（核心流量页）

| 页面 | 路径 | 关键词 | 字数 | 状态 |
|------|------|--------|------|------|
| 首页 | `/` | poke survivor | 1061词 | ✅ |
| 强度榜 | `/tier-list` | pokesurvivor tier list | 1144词 | 🔧 优化中 |
| 中文攻略 | `/zh/` | pokesurvivor 攻略 | 265词 | ✅ |

### P1 优先级（功能页）

| 页面 | 路径 | 关键词 | 字数 | 状态 |
|------|------|--------|------|------|
| 开局推荐 | `/best-pokemon` | pokesurvivor best pokemon | 1944词 | 🔧 优化中 |
| 新手教程 | `/how-to-play` | how to play pokesurvivor | 2321词 | 🔧 优化中 |
| 手机版 | `/zh/mobile` | poke survivor 中文 手機 | 252词 | 🔧 优化中 |

### P2 优先级（扩展内容）

| 页面 | 路径 | 关键词 | 字数 | 状态 |
|------|------|--------|------|------|
| 合作模式 | `/co-op` | pokesurvivor co-op | 854词 | 🔧 优化中 |
| 裂隙打法 | `/rifts` | pokesurvivor rifts | 1552词 | 🔧 优化中 |

## SEO 规范

### 关键词密度要求

每页主关键词密度必须达到 **2-3%**：

- 计算公式：`(关键词出现次数 / 总词数) × 100%`
- 验证工具：运行 `bash check-keywords.sh`

### On-Page SEO 要求

每个页面必须包含：

- ✅ H1标签（含主关键词）
- ✅ Meta description（150-160字符）
- ✅ Meta keywords
- ✅ Canonical URL
- ✅ Open Graph标签
- ✅ Twitter Card标签
- ✅ Schema.org结构化数据
- ✅ 至少1张图片（带alt文本）
- ✅ 至少3个内部链接
- ✅ hreflang标签（中文页面）

### 内容要求

- ✅ 最少1000字（英文）/ 1000字符（中文）
- ✅ 真实来源引用
- ✅ 清晰的H2-H3层级结构
- ✅ 自然融入关键词，不堆砌

## 开发命令

```bash
# 安装依赖
npm install

# 本地开发
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 关键词密度检查
bash check-keywords.sh

# 部署到Cloudflare
npx wrangler pages deploy dist
```

## 设计系统

### 配色方案

采用深色主题游戏站风格：

- **背景梯度**: `#05070C` → `#0A0D12` → `#0F131C` → `#161D2B` → `#1E2636`
- **主色调**: 电光蓝 `#38BDF8`
- **次要色**: 暖橙色 `#E9A568`, 翡翠绿 `#6EE7B7`
- **文本**: 主文本 `#F8FAFC`, 次要文本 `#94A3B8`

### 排版

- **字体**: Inter / System UI
- **流式大小**: 使用 `clamp()` 实现响应式
- **行高**: 正文 1.6, 标题紧凑
- **字间距**: 标题负值，正文默认

### 布局

- **网格优先**: CSS Grid 承载主布局
- **最大宽度**: 1200px
- **圆角**: 完全圆润风格 (999px pills, 50% circles)
- **间距**: Token化（xs/sm/md/lg/xl）

## 数据来源

所有游戏信息来自可验证来源：

1. **官方网站**: [pokesurvivor.com](https://pokesurvivor.com)
2. **itch.io**: [jpter78.itch.io/pokesurvivor](https://jpter78.itch.io/pokesurvivor)
3. **官方指南**: [pokesurvivor.com/en/guide/](https://pokesurvivor.com/en/guide/)
4. **传说系统**: [pokesurvivor.com/en/legendaries/](https://pokesurvivor.com/en/legendaries/)
5. **社区Wiki**: [pokesurvivorwiki.wiki](https://www.pokesurvivorwiki.wiki/)

## 部署流程

### 1. 验证构建

```bash
npm run build
```

确保无错误，生成9个静态页面。

### 2. SEO验收

```bash
bash check-keywords.sh
```

所有页面关键词密度必须在2-3%范围内。

### 3. 本地预览

```bash
npm run preview
```

在 http://localhost:4321 检查所有页面。

### 4. 部署到Cloudflare

```bash
npx wrangler pages deploy dist
```

或配置GitHub Actions自动部署。

### 5. 提交sitemap

访问 Google Search Console，提交：
```
https://poke-survivors.org/sitemap-index.xml
```

## 后续优化

- [ ] 替换placeholder图片为真实游戏截图
- [ ] 添加更多内部链接
- [ ] 配置Google Analytics
- [ ] 设置Google Search Console
- [ ] 监控Core Web Vitals
- [ ] A/B测试页面标题和描述
- [ ] 添加FAQ结构化数据
- [ ] 实施AMP（可选）

## 维护建议

1. **定期更新内容**：游戏更新后及时调整攻略
2. **监控关键词排名**：使用Ahrefs/SEMrush跟踪
3. **分析用户行为**：Google Analytics查看热门页面
4. **响应用户反馈**：根据评论优化内容
5. **保持新鲜度**：定期更新tier list日期

## 许可声明

本站为非官方粉丝站点，不隶属于任天堂或宝可梦公司。
所有宝可梦相关商标归其各自所有者。
游戏 PokeSurvivor 由 JPTER78 开发，免费且非盈利。
