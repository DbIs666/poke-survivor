# Cloudflare Pages 部署指南

## 📋 部署前准备

已完成：
- ✅ 项目构建成功 (dist目录已生成)
- ✅ 域名配置完成 (poke-survivors.org)
- ✅ www强制跳转配置完成
- ✅ 安全头配置完成
- ✅ HTTPS强制跳转配置完成

---

## 🚀 部署步骤

### 方法1: 使用 Wrangler CLI（推荐）

```bash
# 1. 确保已登录 Cloudflare
npx wrangler login

# 2. 部署到 Cloudflare Pages
npx wrangler pages deploy dist --project-name=poke-survivors

# 3. 等待部署完成，会输出部署URL
```

### 方法2: 使用 Cloudflare Dashboard

1. 访问 https://dash.cloudflare.com/
2. 进入 **Workers & Pages** 
3. 点击 **Create application** → **Pages** → **Upload assets**
4. 上传 `dist` 文件夹
5. 项目名称: `poke-survivors`
6. 点击 **Deploy**

---

## 🌐 自定义域名配置

部署完成后，在 Cloudflare Dashboard 配置自定义域名：

### 1. 添加自定义域名

1. 进入项目 → **Settings** → **Custom domains**
2. 点击 **Set up a custom domain**
3. 输入: `poke-survivors.org`
4. 点击 **Continue** → **Activate domain**

### 2. 添加 www 子域名（用于重定向）

1. 同样在 **Custom domains** 点击 **Set up a custom domain**
2. 输入: `www.poke-survivors.org`
3. 点击 **Continue** → **Activate domain**

> **注意**: 我们的 `functions/_middleware.ts` 已经配置了自动将 `www.poke-survivors.org` 重定向到 `poke-survivors.org`

---

## 🔒 DNS 配置

### 如果域名在 Cloudflare 托管

自动配置，无需手动操作。

### 如果域名在其他DNS服务商

需要手动添加以下记录：

```
类型: CNAME
名称: @
目标: poke-survivors.pages.dev
代理状态: 已代理（橙色云朵）

类型: CNAME
名称: www
目标: poke-survivors.pages.dev
代理状态: 已代理（橙色云朵）
```

---

## ✅ 部署后验证

### 1. 验证站点可访问

```bash
curl -I https://poke-survivors.org
```

应返回 `200 OK`

### 2. 验证 www 重定向

```bash
curl -I https://www.poke-survivors.org
```

应返回 `301 Moved Permanently` 并重定向到 `https://poke-survivors.org`

### 3. 验证 HTTP→HTTPS 重定向

```bash
curl -I http://poke-survivors.org
```

应返回 `301` 并重定向到 `https://poke-survivors.org`

### 4. 验证安全头

```bash
curl -I https://poke-survivors.org | grep -E "(X-Content-Type-Options|X-Frame-Options|Content-Security-Policy)"
```

应输出：
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
Content-Security-Policy: default-src 'self'; ...
```

### 5. 验证 Sitemap

```bash
curl https://poke-survivors.org/sitemap-index.xml
```

应返回正确的 sitemap XML

---

## 🔧 重定向配置总结

我们已实现的重定向逻辑（在 `functions/_middleware.ts` 中）：

### 1. www → 裸域名（优先级最高）
```
https://www.poke-survivors.org/any-path
  → 301 → https://poke-survivors.org/any-path

http://www.poke-survivors.org/any-path
  → 301 → https://poke-survivors.org/any-path
```

### 2. HTTP → HTTPS
```
http://poke-survivors.org/any-path
  → 301 → https://poke-survivors.org/any-path
```

### 执行顺序
1. 先检查是否是 `www` 子域名 → 重定向到裸域名（已包含HTTPS）
2. 再检查是否是 HTTP 协议 → 重定向到 HTTPS
3. 最后应用安全头

---

## 📊 性能优化建议

部署后第1周内完成：

### 1. 启用 Cloudflare 缓存优化

1. 进入 Cloudflare Dashboard → **Caching** → **Configuration**
2. 设置 **Browser Cache TTL**: 4 hours
3. 启用 **Always Online**

### 2. 配置 Transform Rules（可选）

如果Workers Functions中间件未生效，可在Dashboard手动添加：

1. 进入 **Rules** → **Transform Rules** → **Modify Response Header**
2. 添加规则应用于 `poke-survivors.org/*`
3. 添加所有安全头（参考 `functions/_middleware.ts`）

---

## 🐛 故障排除

### 问题1: www重定向不生效

**检查**:
```bash
curl -v https://www.poke-survivors.org 2>&1 | grep -E "(301|Location)"
```

**解决**: 
- 确认 `functions/_middleware.ts` 已部署
- 检查 Cloudflare Pages 设置中是否同时添加了两个自定义域名

### 问题2: 安全头未应用

**检查**:
```bash
curl -I https://poke-survivors.org | grep X-Content-Type-Options
```

**解决**:
- 确认 `functions/_middleware.ts` 存在于 `dist` 目录
- 重新部署: `npx wrangler pages deploy dist --project-name=poke-survivors`

### 问题3: DNS未生效

**解决**:
- 等待DNS传播（最多48小时，通常5-10分钟）
- 使用 `nslookup poke-survivors.org` 检查DNS记录
- 清除浏览器DNS缓存

---

## 📈 部署后监控

### Google Search Console

1. 访问 https://search.google.com/search-console
2. 添加资源: `poke-survivors.org`
3. 验证所有权（DNS或HTML标签）
4. 提交Sitemap: `https://poke-survivors.org/sitemap-index.xml`

### Cloudflare Web Analytics

1. 进入项目 → **Analytics**
2. 启用 **Web Analytics**
3. 复制 beacon 代码
4. 添加到 `src/components/SEOHead.astro` 的 `<head>` 中

---

## 🎉 部署完成检查清单

- [ ] 运行 `npx wrangler pages deploy dist --project-name=poke-survivors`
- [ ] 在Dashboard添加自定义域名 `poke-survivors.org`
- [ ] 在Dashboard添加自定义域名 `www.poke-survivors.org`
- [ ] 验证 `https://poke-survivors.org` 可访问
- [ ] 验证 `https://www.poke-survivors.org` → 301重定向到裸域名
- [ ] 验证 `http://poke-survivors.org` → 301重定向到HTTPS
- [ ] 验证安全头存在
- [ ] 提交Sitemap到Google Search Console
- [ ] 设置Cloudflare缓存规则

---

**最后更新**: 2026-10-17  
**部署目标**: Cloudflare Pages  
**项目名称**: poke-survivors  
**主域名**: https://poke-survivors.org
