# Mo's Corner

一个用于记录生活的个人博客项目。

第一版目标是做一个界面简洁、易维护、可部署到 GitHub Pages 的静态博客。内容以 Markdown 和图片文件维护，先完成网站形态，再逐步优化内容更新方式。

## 第一版范围

- 文章页：作为首页使用，像目录一样展示文章标题和日期，不展示正文摘要。
- 照片页：记录照片和简单描述。
- 关于页：放个人说明和项目背景。

## 技术方向

计划使用 Astro 构建静态网站，并通过 GitHub Actions 发布到 GitHub Pages。

第一版尽量保持简单：

- Astro
- Markdown
- 原生 CSS
- GitHub Pages
- 中文默认，英文使用 `/en/`

## 项目文档

- [PRD](docs/prd.md)
- [Technical Design](docs/technical-design.md)
- [Publishing Guide](docs/publishing-guide.md)

## 当前状态

第一版已经上线到 GitHub Pages。

发布地址：[https://paulsweet318.github.io/personal-blog/](https://paulsweet318.github.io/personal-blog/)
