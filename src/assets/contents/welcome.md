---
title: Welcome
created_at: 2024-09-26
update_at: 2024-09-26
description: ''
image: ''
tags: [Personal]
category: 'Personal'
creator: Iqbal Bahtiar
draft: false 
---

# Welcome to website

```js
import { Blog } from 'portofolio';
import { posts } from 'data';
import { port } from 'config';

const web = new Blog({
    name: '< Blog />',
    post: posts
});

web.listen(port, () => {
    console.log('Welcome my blog website');
});
```

<br>

Hi, Saya iqbal dari jepara, web ini dibuat untuk membagikan aktivitas berkaitan blog saya. Nantinya saya akan mengunggah blog di sini berkaitan opini, cara, atau bahkan hal random yang saya unggah.

<br>

Web ini bersifat open source jadi jika ada yang berminat untuk berkontribusi bisa mengunjungi repository yang saya sediakan. 

<br>

> Happy Coding!