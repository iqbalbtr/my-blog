import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { ResponseApi } from '~/types/common.type';


export default defineEventHandler(async e => {

    const list = fs.readdirSync(path.resolve(__dirname, process.cwd(), 'src/assets/contents'), { recursive: true });

    let result = new Set()

    list.forEach(data => {

        if ((data as string).split('.').slice(-1)[0] !== 'md')
            return

        const file = fs.readFileSync(path.resolve(__dirname, process.cwd(), 'src/assets/contents', data as string));
        if (file) {            
            return matter(file).data.tags.forEach((tag: string) => {
                result.add(tag)
            })
        }
    })

    let map: string[] = [];

    result.forEach(data => map.push(data as string))

    return {
        status: true,
        message: 'Success',
        data: map
    } as ResponseApi<string[]>
});
