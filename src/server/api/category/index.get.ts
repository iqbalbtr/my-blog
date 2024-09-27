import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import { ResponseApi } from '~/types/common.type';


export default defineEventHandler(async e => {

    const list = fs.readdirSync(path.resolve(process.cwd(), 'public/contents'), { recursive: true });

    let result = new Set()

    list.forEach(data => {

        if ((data as string).split('.').slice(-1)[0] !== 'md')
            return

        const file = fs.readFileSync(path.resolve(process.cwd(), 'public/contents', data as string));        
        if (file) {            
            return result.add(matter(file).data.category);
        }
    })

    let map: string[] = [];

    result.forEach(data => map.push(data as string))

    return {
        data: map,
        message: 'All data category',
        status: true
    } as ResponseApi<string[]>
});
