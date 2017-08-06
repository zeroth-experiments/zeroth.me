---
title: "Project Mould"
slug: project-mould
layout: page
published_at: 2015-07-12
article: true
tags:
    - opensource
    - static-site-generator
    - site-generator
    - python
    - experiment
---

Yet another static site generator. this is inspired by jekyllrb. Mould is written in python. it's still in beta. so there might be few errors. check the code on [Github](https://github.com/zeroth-experiments/mould)

Static site generator is a software that takes some text + templates as input and produces html files on the output.
```
|------|   |-----------|   |-------------|
| text | + | templates | = | .html files |
|------|   |-----------|   |-------------|
```
mould is written in python, currently moudl uses - Markdown: for text to html - Jinja2: to render templates

It has plugin architecture in place so one can add different functionalities. for now only new actions can be added as plugins.

Actions are the main argument to the mould, like build and new.

how to use:
```
    get mould

    git clone https://github.com/zeroth/mould.git
    cd mould
    pip install -r requirements.txt
    cd ..

    create new structure

    python mould/main.py new <dir_name>

    generate site

    cd <dir_name> python ../mould/main.py build
```
what's inside new
```
    |-- assets
    |   |-- apple-touch-icon-144-precomposed.png
    |   |-- css
    |   |   |-- mould_style.css
    |   |-- favicon.ico
    |-- config.json
    |-- index.html
    |-- _layouts
    |   |-- _includes
    |   |   |-- head.html
    |   |   |-- sidebar.html
    |   |-- default.html
    |   |-- page.html
    |   |-- post.html
    |   |-- post_list.html
    |-- _posts
            |-- welcome.md
```
require template files

`index.html page.html post.html post_list.html`

where

- index.html
    root index file its the home page of the site
- page.html 
    is use to render single page
- post.html
    is use to render single post
- post_list.html
    is use to render the list of post on the blog home page

