import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { ResponseApi } from '~/types/common.type';


export default defineEventHandler(async e => {

    // const list = fs.readdirSync(path.resolve(process.cwd(), 'public/contents'), { recursive: true });
    const list = await $fetch(`https://api.github.com/repos/iqbalbtr/my-blog/contents/src/public/contents`) as any[];    

    let result = new Set()

    // list.forEach(data => {

    //     if ((data as string).split('.').slice(-1)[0] !== 'md')
    //         return

    //     const file = fs.readFileSync(path.resolve(process.cwd(), 'public/contents', data as string));        
    //     if (file) {            
    //         return result.add(matter(file).data.category);
    //     }
    // })

    // })

    for (const data of list) {

        if ((data.name as string).split('.').slice(-1)[0] !== 'md')
            continue;

        // const file = fs.readFileSync(path.resolve(process.cwd(), 'public/contents', data as string));
        // const file = await src.getItem(`src/assets/contents/${data as string}`) as string; 
        const file = await $fetch(`https://api.github.com/repos/iqbalbtr/my-blog/contents/src/public/contents/${data.name}`) as any;

        if (file) {
            result.add(matter(atob(file.content)).data.category);
        }
    }

    let map: string[] = [];

    result.forEach(data => map.push(data as string))

    return {
        data: map,
        message: 'All data category',
        status: true
    } as ResponseApi<string[]>
});
