import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { Blog, Pagging, ResponseApi } from '~/types/common.type';

export default defineEventHandler(async e => {

    // const src = useStorage('root');

    // const list = fs.readdirSync(path.resolve(process.cwd(),'public/contents'), { recursive: true });
    const list = await $fetch(`https://api.github.com/repos/iqbalbtr/my-blog/contents/src/public/contents`) as any[];    

    let result: any[] = []

    // list.forEach(async data => {        

    //     if ((data.name as string).split('.').slice(-1)[0] !== 'md')
    //         return

    //     // const file = fs.readFileSync(path.resolve(process.cwd(), 'public/contents', data as string));
    //     // const file = await src.getItem(`src/assets/contents/${data as string}`) as string; 
    //     const file = await $fetch(`https://api.github.com/repos/iqbalbtr/my-blog/contents/src/public/contents/${data.name}`) as any;    

    //     if (file) {
    //         result.push({
    //             ...matter(atob(file.content)).data,
    //             word: matter(atob(file.content)).content.split(' ').length,
    //             slug: (data.name as string).split('.')[0]
    //         })
    //     }
    // })

    for(const data of list) {        

        if ((data.name as string).split('.').slice(-1)[0] !== 'md')
            continue;

        // const file = fs.readFileSync(path.resolve(process.cwd(), 'public/contents', data as string));
        // const file = await src.getItem(`src/assets/contents/${data as string}`) as string; 
        const file = await $fetch(`https://api.github.com/repos/iqbalbtr/my-blog/contents/src/public/contents/${data.name}`) as any;    

        if (file) {
            result.push({
                ...matter(atob(file.content)).data,
                word: matter(atob(file.content)).content.split(' ').length,
                slug: (data.name as string).split('.')[0]
            })
        }
    }

    const query = getQuery(e);


    const queryResult = query ?
        result.
            sort((a, b) => b.created_at - a.created_at).
            filter(blog => (
                query.tag ? blog.tags.map((fo: string) => fo.toLowerCase()).includes((query.tag as string).toLowerCase()) : true &&
                    query.category ? blog.category.toLowerCase().includes((query.category as string).toLowerCase()) : true &&
                        query.title ? blog.title.toLowerCase().includes((query.title as string).toLowerCase()) : true &&
                            query.draft ? query.draft === '1' ? blog.draft : !blog.draft : true
            )) : result;

    let page = 1;
    let item = 6;
    let total = queryResult.length;
    let skip = (page - 1) * item

    return {
        data: {
            blog: queryResult.slice(skip, skip + item) as Blog[],
            pagging: {
                page,
                total_item: total,
                item,
                total_page: Math.ceil(total / item)
            }
        },
        message: 'data is found',
        status: true
    } as ResponseApi<{ blog: Blog[], pagging: Pagging }>
});
