# Mo's Corner Publishing Guide

状态：Living document

关联文档：[PRD](./prd.md)、[Technical Design](./technical-design.md)

这份文档记录日常写作、预览和发布流程。PRD 和技术设计解释“为什么这样做”，这份文档只写“以后怎么操作”。

## 1. 日常流程总览

每次更新内容，建议按这个顺序做：

```text
新建或修改 Markdown
添加或整理图片
本地预览
运行构建检查
提交 commit
push 到 GitHub
等待 GitHub Pages 自动发布
打开线上地址确认
```

常用命令：

```bash
npm run build
git status
git add .
git commit -m "Add new post"
git push
```

线上地址：

[https://paulsweet318.github.io/personal-blog/](https://paulsweet318.github.io/personal-blog/)

GitHub Actions：

[https://github.com/paulsweet318/personal-blog/actions](https://github.com/paulsweet318/personal-blog/actions)

## 2. 本地预览

第一次在新电脑上打开项目时，先安装依赖：

```bash
npm install
```

启动本地开发服务：

```bash
npm run dev -- --host 127.0.0.1 --port 4321
```

本地访问地址：

```text
http://127.0.0.1:4321/personal-blog/
```

发布前至少跑一次构建：

```bash
npm run build
```

如果 `npm run build` 报错，先修好错误再 push。Astro 会检查 Markdown frontmatter 的字段类型，所以很多内容错误可以在本地提前发现。

## 3. 新增文章

中文文章放在：

```text
src/content/posts/zh/
```

英文文章放在：

```text
src/content/posts/en/
```

文件名建议使用日期加英文短名：

```text
src/content/posts/zh/2026-04-20-my-note.md
src/content/posts/en/2026-04-20-my-note.md
```

中文文章模板：

```md
---
title: "文章标题"
date: 2026-04-20
lang: "zh"
urlSlug: "my-note"
draft: false
description: "给文章详情页和 SEO 使用的简短描述。"
tags:
  - life
translationKey: "my-note"
---

这里写正文，使用 Markdown。
```

英文文章模板：

```md
---
title: "Post Title"
date: 2026-04-20
lang: "en"
urlSlug: "my-note"
draft: false
description: "A short description for the post page and SEO."
tags:
  - life
translationKey: "my-note"
---

Write the post body here in Markdown.
```

字段说明：

- `title`：页面标题和文章目录标题。
- `date`：发布日期，格式用 `YYYY-MM-DD`。
- `lang`：中文写 `zh`，英文写 `en`。
- `urlSlug`：URL 里的稳定英文标识，只用小写字母、数字和短横线。
- `draft`：草稿写 `true`，正式发布写 `false`。
- `description`：文章详情页的说明，不会显示在首页目录里。
- `tags`：标签；第一版只在目录里简单展示。
- `translationKey`：中英文对应关系。同一篇内容的中英文版本使用同一个值。

文章 URL 规则：

```text
中文：/personal-blog/posts/my-note/
英文：/personal-blog/en/posts/my-note/
```

首页只像目录一样展示文章标题、日期和标签，不展示正文。

## 4. 中英文内容怎么处理

不需要每篇都同时写中英文。

只写中文时：

```text
只创建 src/content/posts/zh/...md
```

只写英文时：

```text
只创建 src/content/posts/en/...md
```

如果同一篇内容有中英文版本：

```text
两个文件使用相同的 translationKey
建议两个文件也使用相同的 urlSlug
```

示例：

```yaml
translationKey: "spring-walk"
urlSlug: "spring-walk"
```

文章详情页只有在找到对应翻译时，才会显示语言切换链接。没有翻译版本时，不会显示语言切换。

如果中文和英文不是严格翻译，而只是同一主题的两篇独立文章，可以不给 `translationKey`，或者使用不同的 `translationKey`。

## 5. 新增照片记录

中文照片记录放在：

```text
src/content/photos/zh/
```

英文照片记录放在：

```text
src/content/photos/en/
```

本地图片建议放在：

```text
public/images/photos/YYYY/MM/
```

例如：

```text
public/images/photos/2026/04/evening-walk-01.jpg
```

Markdown 里引用图片时，路径从 `/images/...` 开始：

```yaml
src: "/images/photos/2026/04/evening-walk-01.jpg"
```

照片记录模板：

```md
---
title: "傍晚散步"
date: 2026-04-20
lang: "zh"
urlSlug: "evening-walk"
draft: false
description: "今天傍晚出去走了一会。"
location: "Chicago"
images:
  - src: "/images/photos/2026/04/evening-walk-01.jpg"
    alt: "傍晚路边的树和天空"
    width: 1200
    height: 800
translationKey: "evening-walk"
---
```

照片字段说明：

- `title`：照片记录标题。
- `date`：记录日期。
- `lang`：中文写 `zh`，英文写 `en`。
- `urlSlug`：稳定英文标识。第一版照片页暂时不单独使用它生成详情页，但仍建议认真填写。
- `draft`：草稿写 `true`，正式发布写 `false`。
- `description`：照片页显示的文字描述。
- `location`：地点，可选。
- `images`：一条记录可以包含一张或多张图片。
- `alt`：图片说明，给可访问性和图片加载失败时使用。
- `width` / `height`：图片原始尺寸，建议填写，能减少页面加载时的跳动。
- `translationKey`：中英文照片记录的对应关系，可选。

常见图片比例已经有隐藏测试页：

[https://paulsweet318.github.io/personal-blog/image-specs/](https://paulsweet318.github.io/personal-blog/image-specs/)

## 6. 修改关于页

中文关于页：

```text
src/content/pages/about.zh.md
```

英文关于页：

```text
src/content/pages/about.en.md
```

关于页也是 Markdown，可以直接改正文。frontmatter 保持这个结构：

```md
---
title: "关于"
lang: "zh"
description: "个人说明页面"
---
```

## 7. 发布前检查

发布前建议至少检查：

```bash
npm run build
```

本地页面：

```text
http://127.0.0.1:4321/personal-blog/
http://127.0.0.1:4321/personal-blog/en/
http://127.0.0.1:4321/personal-blog/photos/
http://127.0.0.1:4321/personal-blog/about/
```

重点看：

- 中文首页只出现中文文章。
- 英文首页只出现英文文章。
- 文章详情页能打开。
- 照片页图片能显示。
- 关于页中英文内容正常。
- 草稿内容不会出现在页面上。

## 8. Git 提交和发布

查看当前改动：

```bash
git status
```

查看具体改了什么：

```bash
git diff
```

添加改动：

```bash
git add .
```

提交改动：

```bash
git commit -m "Add new post"
```

推送到 GitHub：

```bash
git push
```

推送成功后，GitHub Actions 会自动构建并部署到 GitHub Pages。

常见 commit message：

```text
Add new post
Add photo note
Update about page
Fix photo description
Update publishing guide
```

## 9. 确认发布成功

push 后打开 GitHub Actions：

[https://github.com/paulsweet318/personal-blog/actions](https://github.com/paulsweet318/personal-blog/actions)

确认最新的 `Deploy to GitHub Pages` 是绿色成功状态。

然后打开线上地址：

[https://paulsweet318.github.io/personal-blog/](https://paulsweet318.github.io/personal-blog/)

GitHub Pages 有缓存，刚部署完可能需要等几十秒。如果页面暂时没变化，先等一会儿再刷新。

## 10. 常见问题

### 10.1 新文章没有显示

检查：

- 文件是否放在正确目录，例如 `src/content/posts/zh/`。
- `lang` 是否和目录一致。
- `draft` 是否为 `false`。
- `date` 是否是合法日期。
- 是否已经 `git add`、`git commit`、`git push`。
- GitHub Actions 是否部署成功。

### 10.2 图片没有显示

检查：

- 图片是否放在 `public/images/photos/...`。
- Markdown 里的路径是否从 `/images/photos/...` 开始。
- 文件名大小写是否一致。GitHub Pages 是区分大小写的。
- 图片文件是否已经提交到 Git。

### 10.3 GitHub Pages 是 404

检查：

- GitHub Actions 是否成功。
- GitHub 仓库 Settings > Pages 的 Source 是否为 GitHub Actions。
- 访问地址是否包含 `/personal-blog/`。

正确地址：

```text
https://paulsweet318.github.io/personal-blog/
```

### 10.4 push 失败

这个仓库已经配置为使用 SSH：

```text
git@github.com:paulsweet318/personal-blog.git
```

本机有两把 GitHub SSH key：

- `id_ed25519` 绑定 `paulsweet318`
- `id_rsa` 绑定 `paulsweet`

当前仓库已固定使用 `id_ed25519`。如果以后换电脑，需要确认新电脑的 SSH key 已添加到 `paulsweet318` 账号。

## 11. 建议习惯

- 一次 commit 只做一类事情，例如只新增一篇文章，或只修改一条照片记录。
- 写作草稿可以先用 `draft: true`，准备发布时改成 `draft: false`。
- 图片文件名使用英文、小写、短横线，不使用空格。
- `urlSlug` 一旦发布后尽量不要改，否则旧链接会失效。
- 每次 push 前跑 `npm run build`。
