---
layout: post
title: 使用 Jekyll 搭建我的 github.io
date: 2025-07-17  
categories: jekyll update
---

### Jekyll 简介

Jekyll 是一个高效、简洁且极具透明性的静态网站生成器，由 GitHub 联合创始人 Tom Preston-Werner 开发，采用 Ruby 编写。它允许你用最直观的方式（Markdown + 配置文件）来管理和发布内容，无需数据库和繁琐的后端开发。

Jekyll 广泛应用于个人博客、学术主页、项目文档、API 文档等场景，GitHub Pages 也原生支持 Jekyll，使得部署变得极其简单。它特别适合那些喜欢"所见即所得"与完全掌控内容结构的用户，以及追求轻量化、高性能网站的开发者。

**Jekyll 的核心优势：**
- **零数据库依赖**：所有内容都存储在文件系统中，便于版本控制和备份
- **高度可定制**：从内容结构到样式表现，一切都可以精确控制
- **性能卓越**：生成的静态网站加载速度极快，SEO 友好
- **社区生态丰富**：拥有大量主题、插件和扩展，满足各种需求
- **Git 友好**：完美适配 Git 工作流，支持协作开发和内容管理


### 运行方式

1. **核心命令**
   - 在项目根目录下运行：
     ```bash
     bundle exec jekyll serve
     ```
   或者运行：
   ```
   jekyll serve
   ```
   - 本地会自动启动一个服务器，监听所有文件变动，实时生成静态网页。

2. **Markdown 到静态资源的映射**
   - Jekyll 会自动将 `_posts/` 下的每个 md 文件渲染为 HTML，并输出到 `_site/` 目录。
   - 页面引用的图片、CSS、JS 等静态资源，建议统一放在 `assets/` 目录下，引用时用 `/assets/xxx` 路径，方便管理和迁移。
   - 你在 md 文件中插入的图片（如 `![图](../assets/img/xxx.png)`），Jekyll 会原样复制到 `_site/assets/`，页面访问时自动映射。


### 目录组织结构

**主要目录结构与职责：**
- `_posts/`：存放所有博客文章，文件名格式为 `YYYY-MM-DD-title.md`。每个 md 文件会被 Jekyll 自动解析为独立的 HTML 页面。
- `_layouts/`：定义页面的整体布局（如 post、page、default 等），md 文件会根据 Front Matter 里的 layout 字段套用相应模板。
- `_includes/`：可复用的页面片段（如导航栏、页脚等），可在 layout 或页面中用 `{% raw %}{% include %}{% endraw %}` 引入。
- `_sass/` 和 `assets/`：样式和静态资源。`_sass/` 用于 Sass 预处理，`assets/` 存放编译后的 CSS、JS、图片等。
- `blog.md`、`publication.md` 等：独立页面，通常用于聚合或展示特定内容。
- `_config.yml`：全局配置文件，决定站点的基本信息、导航、插件等。
- `_site/`：Jekyll 生成的最终静态网站，包含所有编译后的 HTML、CSS、JS 文件。

**Jekyll 文件映射与编译过程：**
1. **源文件识别**
   - Jekyll 扫描项目根目录，识别所有需要处理的文件类型（.md、.html、.scss 等）
   - 带有 YAML Front Matter 的文件会被标记为需要处理的动态内容

2. **内容处理流程**
   - **Markdown 解析**：将 `.md` 文件转换为 HTML 格式
   - **Liquid 模板渲染**：处理文件中的 `{% raw %}{{ }}{% endraw %}` 和 `{% raw %}{% %}{% endraw %}` 语法
   - **布局应用**：根据 Front Matter 中的 layout 字段，将内容嵌入对应的布局模板
   - **包含文件处理**：解析 `{% raw %}{% include %}{% endraw %}` 指令，将片段文件内容插入

3. **静态资源编译**
   - **Sass 预处理**：将 `_sass/` 目录下的 .scss 文件编译为 CSS
   - **资源拷贝**：将 `assets/` 目录下的图片、字体、JavaScript 等静态文件复制到 `_site/`
   - **路径重写**：自动处理相对路径和绝对路径的映射关系

4. **输出生成**
   - 所有处理后的文件统一输出到 `_site/` 目录
   - 目录结构根据原始文件路径和配置的 permalink 规则生成
   - 最终形成完整的静态网站，可直接部署到任何支持静态文件的服务器

这种"源码 → 编译 → 静态站点"的工作流程，使得开发者可以专注于内容创作，而将复杂的网站生成逻辑交给 Jekyll 自动处理。


### 心得体会

我认为 jekyll 具有很好**透明性**。什么是**透明性**？相信学习过数据库设计理论并使用过 Jekyll 的读者可以理解！

更多信息可以参考官方文档：

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll's GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
