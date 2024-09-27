import * as fs from 'fs';
import * as path from 'path';
import markdownit from 'markdown-it';
import matter from 'gray-matter';
import hljs from 'highlight.js'
import mdAnchor from 'markdown-it-anchor';
import { Blog, ResponseApi } from '~/types/common.type';


const md = markdownit({
    linkify: true,
    typographer: true,
    breaks: true,
    html: true,
    highlight: function (str, lang): string {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class=""><code>${hljs.highlight(str, { language: lang }).value}</code></pre>`;
            } catch (__) {

            }
        }

        return `<pre class=""><code>${md.utils.escapeHtml(str)}</code></pre>`;
    }
});

md.renderer.rules.code_inline = function (tokens, idx, options, env, slf) {
    return `<code class="line-code">${md.utils.escapeHtml(tokens[idx].content)}</code>`;
};
md.use(mdAnchor)

export default defineEventHandler(async e => {

    const { postId } = getRouterParams(e);

    const src = useStorage('root');

    const list = fs.readFileSync(path.resolve(process.cwd(), `public/contents/${postId}.md`));
    // const list = await src.getItem( `src/assets/contents/${postId}.md`)

    if (!list)
        return createError({
            statusCode: 404,
            data: {
                status: false,
                message: 'Blog is not found'
            }
        })

    const info = matter(list.toString());
    const word = info.content.split(' ').length

    return {
        data: {
            ...info.data,
            body: md.render(info.content).toString(),
            word
        } as Blog,
        message: 'Blog is found',
        status: true
    } as ResponseApi<Blog>
});
