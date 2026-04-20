# Personal Life Blog Technical Design

状态：Draft v0.1

关联文档：[PRD](./prd.md)、[Publishing Guide](./publishing-guide.md)

## 1. 技术目标

第一版目标是实现一个极简、静态、可长期维护的个人生活博客。

技术设计优先满足：

1. 网站可以部署到 GitHub Pages。
2. 内容通过 Markdown 和图片文件维护。
3. 文章和照片是两个独立内容类型。
4. 文章首页像目录，只展示文章入口，不展示正文或正文摘要。
5. 中文为默认语言，英文使用 `/en/` 路径。
6. 单语内容和双语内容都能正常工作。
7. 后续可以接入 Obsidian、手机记录或 iMessages 草稿导入。

## 2. 技术栈

建议第一版使用：

- Astro
- TypeScript
- Astro Content Collections
- Markdown
- 原生 CSS
- GitHub Actions
- GitHub Pages

第一版不引入：

- React
- Vue
- Svelte
- Tailwind CSS
- CMS
- 数据库
- 服务端 API

原因是第一版交互很少，原生 Astro 和 CSS 已经足够。减少依赖可以降低维护成本，也更适合学习静态站点和 GitHub 发布流程。

## 3. 架构概览

网站采用静态生成。

构建时 Astro 读取 `src/content/` 下的 Markdown 内容，生成静态 HTML、CSS 和图片引用。部署后 GitHub Pages 只负责托管静态文件，不运行服务端逻辑。

```text
Markdown content
      |
      v
Astro build
      |
      v
Static files in dist/
      |
      v
GitHub Pages
```

## 4. 项目目录设计

建议目录结构：

```text
.
├── docs/
│   ├── prd.md
│   ├── technical-design.md
│   └── github-learning-notes.md
├── public/
│   └── images/
│       ├── posts/
│       └── photos/
├── src/
│   ├── components/
│   │   ├── DateText.astro
│   │   ├── LanguageSwitch.astro
│   │   ├── PhotoTimeline.astro
│   │   ├── PostDirectory.astro
│   │   └── SiteHeader.astro
│   ├── content/
│   │   ├── pages/
│   │   │   ├── about.en.md
│   │   │   └── about.zh.md
│   │   ├── photos/
│   │   │   ├── en/
│   │   │   └── zh/
│   │   └── posts/
│   │       ├── en/
│   │       └── zh/
│   ├── i18n/
│   │   ├── routes.ts
│   │   └── ui.ts
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── PostLayout.astro
│   ├── pages/
│   │   ├── about.astro
│   │   ├── index.astro
│   │   ├── photos.astro
│   │   ├── posts/
│   │   │   └── [slug].astro
│   │   └── en/
│   │       ├── about.astro
│   │       ├── index.astro
│   │       ├── photos.astro
│   │       └── posts/
│   │           └── [slug].astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

说明：

- `docs/` 放产品、技术和 GitHub 学习文档。
- `src/content/posts/` 放文章内容。
- `src/content/photos/` 放照片记录内容。
- `src/content/pages/` 放关于页这类静态页面文案。
- `public/images/` 放图片文件，使用稳定 URL 引用。
- `src/i18n/` 放语言、路径和 UI 文案映射。

## 5. 内容模型

使用 Astro Content Collections 管理内容，并通过 schema 校验 frontmatter。

### 5.1 Post

文章用于长文本记录。

建议 frontmatter：

```yaml
title: "一次春天散步"
date: 2026-04-19
lang: "zh"
urlSlug: "spring-walk"
draft: false
description: "给文章详情页 SEO 使用的简短描述，首页目录不展示。"
tags:
  - life
translationKey: "spring-walk"
```

正文使用 Markdown。

文章目录页只读取：

- `title`
- `date`
- `lang`
- `urlSlug`
- `tags`

文章目录页不读取、不展示：

- 正文
- 正文节选
- `description`

`description` 仅用于文章详情页的 meta description 或后续 RSS。

### 5.2 Photo

照片记录用于图片和简短描述。

建议 frontmatter：

```yaml
title: "河边散步"
date: 2026-04-19
lang: "zh"
urlSlug: "river-walk"
draft: false
description: "下午沿着河边走了一段，风很轻。"
location: "Chicago"
images:
  - src: "/images/photos/2026/04/river-walk-01.jpg"
    alt: "河边步道和树影"
translationKey: "river-walk"
```

照片记录第一版可以没有独立详情页，直接在照片页展示。

### 5.3 Page

关于页使用简单 Markdown 内容，便于后续非代码编辑。

建议 frontmatter：

```yaml
title: "关于"
lang: "zh"
description: "个人说明页面"
```

## 6. 内容文件命名

建议文章文件：

```text
src/content/posts/zh/2026-04-19-spring-walk.md
src/content/posts/en/2026-04-19-spring-walk.md
```

建议照片文件：

```text
src/content/photos/zh/2026-04-19-river-walk.md
src/content/photos/en/2026-04-19-river-walk.md
```

文件名用于人工识别，实际 URL 使用 frontmatter 中的 `urlSlug`。

这样后续 Obsidian 或自动化导入可以按日期生成文件，不依赖 Astro 内部路由规则。

## 7. 路由设计

### 7.1 中文路由

```text
/                 文章目录
/posts/[slug]/    文章详情
/photos/          照片页
/about/           关于页
```

### 7.2 英文路由

```text
/en/              英文文章目录
/en/posts/[slug]/ 英文文章详情
/en/photos/       英文照片页
/en/about/        英文关于页
```

### 7.3 文章目录行为

文章目录页按语言过滤内容。

中文首页：

- 只展示 `lang: zh`
- 过滤 `draft: true`
- 按 `date` 倒序
- 列表像目录，不展示正文、摘要或封面

英文首页：

- 只展示 `lang: en`
- 过滤 `draft: true`
- 按 `date` 倒序
- 列表像目录，不展示正文、摘要或封面

### 7.4 照片页行为

照片页按语言过滤内容。

中文照片页：

- 只展示 `lang: zh`
- 过滤 `draft: true`
- 按 `date` 倒序

英文照片页：

- 只展示 `lang: en`
- 过滤 `draft: true`
- 按 `date` 倒序

如果某条照片记录只有中文，就只出现在中文照片页。

## 8. 双语设计

支持语言：

```text
zh
en
```

默认语言：

```text
zh
```

双语内容通过 `translationKey` 关联。

语言切换逻辑：

1. 当前内容有 `translationKey`。
2. 查找另一种语言中相同 `translationKey` 的内容。
3. 如果找到，展示语言切换链接。
4. 如果找不到，不展示语言切换链接。

UI 文案放在 `src/i18n/ui.ts`：

```text
文章 / Posts
照片 / Photos
关于 / About
中文 / Chinese
English / English
```

路由辅助逻辑放在 `src/i18n/routes.ts`，用于生成当前语言下的路径。

每个页面需要设置正确的 HTML `lang`：

```text
zh 页面：<html lang="zh-CN">
en 页面：<html lang="en">
```

## 9. 图片策略

第一版图片放在 `public/images/`。

原因：

- 路径稳定。
- 容易手动管理。
- 容易从 Obsidian、手机脚本或其他工具生成。
- 不要求在 Markdown 中 import 图片。

建议路径：

```text
public/images/photos/2026/04/river-walk-01.jpg
public/images/posts/2026/04/example.jpg
```

内容中引用：

```text
/images/photos/2026/04/river-walk-01.jpg
```

第一版实现时需要注意：

- 图片使用 `loading="lazy"`。
- 图片必须有 `alt`。
- 页面设置合理的图片最大宽度。
- 不在仓库中提交过大的原图。

后续如果需要图片优化，可以再迁移到 Astro assets 或增加图片压缩脚本。

## 10. 视觉实现

第一版使用原生 CSS。

全局样式放在：

```text
src/styles/global.css
```

基础 CSS 变量建议：

```css
:root {
  --color-bg: #fbfbfd;
  --color-text: #1d1d1f;
  --color-muted: #6e6e73;
  --color-border: #d2d2d7;
  --content-width: 680px;
}
```

字体栈：

```css
font-family:
  -apple-system,
  BlinkMacSystemFont,
  "SF Pro Text",
  "PingFang SC",
  "Hiragino Sans GB",
  "Microsoft YaHei",
  "Noto Sans CJK SC",
  sans-serif;
```

文章正文建议：

```text
字号：16px 或 17px
行高：1.75 - 1.9
内容宽度：640px - 720px
```

文章目录建议：

```text
每行一篇文章
左侧标题
右侧或下一行日期
少量灰色辅助信息
无卡片
无摘要
无正文预览
```

## 11. 组件设计

建议组件：

### BaseLayout.astro

负责：

- HTML 结构
- `<head>` metadata
- 字体和全局样式
- 页面语言
- header / main / footer

### SiteHeader.astro

负责：

- 主导航
- 当前页面高亮
- 中文和英文文案

导航项：

```text
文章 / Posts
照片 / Photos
关于 / About
```

### PostDirectory.astro

负责首页文章目录。

展示字段：

- 标题
- 日期
- 标签，可选
- 语言，可选

不展示：

- 正文
- 摘要
- 封面图

### PhotoTimeline.astro

负责照片页列表。

展示字段：

- 图片
- 日期
- 描述
- 地点，可选

### LanguageSwitch.astro

负责语言切换。

只在目标语言内容存在时展示。

### DateText.astro

负责统一日期格式。

中文建议：

```text
2026 年 4 月 19 日
```

英文建议：

```text
Apr 19, 2026
```

## 12. 构建与部署

本地常用命令：

```text
npm install
npm run dev
npm run build
npm run preview
```

GitHub Pages 使用 GitHub Actions 部署。

建议工作流：

```text
push 到 main
      |
      v
GitHub Actions 安装依赖
      |
      v
运行 Astro build
      |
      v
上传 dist
      |
      v
部署到 GitHub Pages
```

GitHub Pages 设置：

```text
Settings > Pages > Source > GitHub Actions
```

后续如果使用自定义域名，再增加：

```text
public/CNAME
```

## 13. 内容编辑流程

日常操作以 [Publishing Guide](./publishing-guide.md) 为准。本节只保留技术流程概览。

### 13.1 新增文章

流程：

```text
复制文章模板
填写 frontmatter
写正文
本地预览
提交 commit
push
等待 GitHub Pages 发布
```

文章模板后续可以放在：

```text
templates/post.zh.md
templates/post.en.md
```

### 13.2 新增照片记录

流程：

```text
压缩或整理照片
放入 public/images/photos/YYYY/MM/
复制照片模板
填写 frontmatter
本地预览
提交 commit
push
等待 GitHub Pages 发布
```

照片模板后续可以放在：

```text
templates/photo.zh.md
templates/photo.en.md
```

## 14. GitHub 学习文档

后续新增：

```text
docs/github-learning-notes.md
```

建议随着真实操作逐步补充，而不是一次写完。

第一批内容可以包括：

- `git status` 看当前改动
- `git add` 选择要提交的文件
- `git commit` 保存一次变更
- `git push` 推送到 GitHub
- GitHub Actions 如何查看部署状态
- GitHub Pages 如何确认发布地址
- issue 如何记录待办

## 15. 验证方式

第一版实现后，每次发布前至少验证：

1. `npm run build` 成功。
2. 中文首页只显示中文文章目录。
3. 英文首页只显示英文文章目录。
4. 文章目录不展示正文或摘要。
5. 中文文章详情页可以打开。
6. 英文文章详情页可以打开。
7. 照片页图片正常显示。
8. 关于页中文和英文版本正常显示。
9. 没有翻译版本时不展示语言切换。
10. GitHub Actions 部署成功。

## 16. 后续演进预留

### 16.1 Obsidian

可以让 Obsidian 管理 `src/content/posts/` 或某个草稿目录。正式发布前再移动到对应语言目录。

### 16.2 手机记录

手机记录可以先进入草稿目录：

```text
src/content/inbox/
```

人工确认后再转成正式文章或照片记录。

### 16.3 iMessages

iMessages 更适合作为灵感入口，不直接发布到正式博客。

建议未来流程：

```text
iMessages
  -> 导出或脚本同步
  -> inbox 草稿
  -> 人工整理
  -> posts 或 photos
```

## 17. 暂不实现

第一版技术上暂不实现：

- 后台管理
- 网页上传
- 搜索
- RSS
- 评论
- 访问统计
- 图片自动压缩
- 自动翻译
- 自动从 Obsidian 同步
- 自动从 iMessages 导入
- 深色模式

这些能力可以在网站形态稳定后再按真实需求加入。

## 18. 待确认问题

实现前建议继续确认：

1. 照片页第一版使用时间流还是网格。
2. 文章标签第一版是否展示。
3. 关于页中英文文案是否同时准备。
4. 是否需要第一版就准备内容模板文件。
5. GitHub Pages 使用用户站点仓库还是项目站点仓库。
