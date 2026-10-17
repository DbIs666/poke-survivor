# 部署指南

## 前置要求

1. Node.js >= 22.12.0
2. npm 或 pnpm
3. Cloudflare账号
4. Wrangler CLI（`npm install -g wrangler`）

## 快速部署

### 步骤1：克隆并安装

```bash
git clone <repository-url>
cd poke-survivor
npm install
```

### 步骤2：本地测试

```bash
# 开发模式
npm run dev
# 访问 http://localhost:4321

# 构建生产版本
npm run build

# 预览生产版本
npm run preview
# 访问 http://localhost:4321
```

### 步骤3：SEO验证

```bash
# 检查关键词密度
bash check-keywords.sh

# 检查构建输出
ls -lh dist/

# 验证sitemap生成
cat dist/sitemap-index.xml
```

### 步骤4：部署到Cloudflare Workers

#### 方法A：Wrangler CLI（推荐）

```bash
# 登录Cloudflare
wrangler login

# 部署
npx wrangler pages deploy dist --project-name=poke-survivor
```

#### 方法B：GitHub Actions（自动化）

创建 `.github/workflows/deploy.yml`：

\`\`\`yaml
name: Deploy to Cloudflare Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '22'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
          projectName: poke-survivor
          directory: dist
\`\`\`

**设置Secrets**：
- `CLOUDFLARE_API_TOKEN`: Cloudflare API Token
- `CLOUDFLARE_ACCOUNT_ID`: Cloudflare Account ID

#### 方法C：Cloudflare Dashboard

1. 登录 [dash.cloudflare.com](https://dash.cloudflare.com)
2. 进入 **Workers & Pages** → **Create Application** → **Pages**
3. 选择 **Upload assets**
4. 上传 `dist` 文件夹

## 域名配置

### 自定义域名

1. 在Cloudflare Pages项目中点击 **Custom domains**
2. 添加 `poke-survivors.org`
3. Cloudflare会自动配置DNS记录
4. 等待SSL证书激活（通常几分钟）

### DNS设置

如果使用外部DNS：

```
Type: CNAME
Name: @
Target: <your-pages-project>.pages.dev
Proxy: Yes (橙色云朵)
```

## SEO配置

### Google Search Console

1. 访问 [search.google.com/search-console](https://search.google.com/search-console)
2. 添加资源：`https://poke-survivors.org`
3. 验证所有权（HTML文件或DNS TXT记录）
4. 提交Sitemap：
   ```
   https://poke-survivors.org/sitemap-index.xml
   ```

### Google Analytics（可选）

在 `src/layouts/BaseLayout.astro` 的 `<head>` 中添加：

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Bing Webmaster Tools

1. 访问 [bing.com/webmasters](https://www.bing.com/webmasters)
2. 添加并验证站点
3. 提交Sitemap

## 性能优化

### 1. 启用Cloudflare缓存

在 `wrangler.toml` 中添加：

```toml
[site]
bucket = "./dist"

[build]
command = "npm run build"

[[headers]]
for = "/*"
[headers.values]
Cache-Control = "public, max-age=3600, s-maxage=86400"

[[headers]]
for = "/images/*"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/*.css"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
for = "/*.js"
[headers.values]
Cache-Control = "public, max-age=31536000, immutable"
```

### 2. 图片优化

将所有placeholder SVG替换为优化后的WebP格式：

```bash
# 安装cwebp
# 转换图片
cwebp -q 80 input.jpg -o output.webp
```

在 `<img>` 标签中使用：

```html
<img src="/images/screenshot.webp" 
     alt="Poke Survivor gameplay" 
     loading="lazy"
     width="800" 
     height="600">
```

### 3. 启用Brotli压缩

Cloudflare Pages自动启用，无需配置。

## 监控和分析

### PageSpeed Insights

定期检查：
```
https://pagespeed.web.dev/analysis?url=https://poke-survivors.org
```

目标分数：
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### Cloudflare Analytics

在Cloudflare Dashboard查看：
- 页面浏览量
- 独立访客
- 地理分布
- 热门页面

### 搜索排名追踪

使用以下工具监控关键词排名：
- [Ahrefs](https://ahrefs.com)
- [SEMrush](https://www.semrush.com)
- [Google Search Console Performance Report](https://search.google.com/search-console)

## 故障排除

### 构建失败

```bash
# 清理缓存
rm -rf node_modules dist .astro
npm install
npm run build
```

### 部署失败

```bash
# 检查Wrangler版本
wrangler --version

# 更新Wrangler
npm install -g wrangler@latest

# 重新登录
wrangler logout
wrangler login
```

### 页面404错误

确保 `astro.config.mjs` 中：

```js
export default defineConfig({
  site: 'https://poke-survivors.org',
  // ...
});
```

### Sitemap未生成

检查 `astro.config.mjs`：

```js
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://poke-survivors.org',
  integrations: [sitemap()],
});
```

## 更新流程

### 内容更新

1. 编辑相应 `.astro` 文件
2. 本地测试：`npm run dev`
3. 验证关键词密度：`bash check-keywords.sh`
4. 构建：`npm run build`
5. 部署：`npx wrangler pages deploy dist`

### 图片更新

1. 将新图片放入 `public/images/`
2. 更新 `.astro` 文件中的 `<img>` 标签
3. 优化图片（WebP, 压缩）
4. 重新构建和部署

### 样式更新

1. 编辑 `src/styles/global.css` 或组件内 `<style>`
2. 测试响应式布局
3. 验证可访问性（颜色对比度）
4. 重新构建和部署

## 安全最佳实践

1. **永不提交敏感信息**：
   - API密钥 → 环境变量
   - Cloudflare Tokens → GitHub Secrets

2. **启用HTTPS**：
   - Cloudflare自动提供

3. **CSP头部**：
   在 `wrangler.toml` 添加：
   ```toml
   [[headers]]
   for = "/*"
   [headers.values]
   Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; frame-src https://pokesurvivor.com"
   ```

4. **定期更新依赖**：
   ```bash
   npm audit
   npm update
   ```

## 支持

遇到问题？

1. 检查 [Astro文档](https://docs.astro.build)
2. 查看 [Cloudflare Workers文档](https://developers.cloudflare.com/workers)
3. 参考 `SEO_VALIDATION.md` 验收清单
4. 提交Issue到项目仓库
