import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import { ResponseApi } from '~/types/common.type';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineEventHandler(async e => {

    const list = fs.readdirSync(path.resolve(__dirname, '..', '..', 'src/assets/contents'), { recursive: true });

    let result = new Set()

    list.forEach(data => {

        if ((data as string).split('.').slice(-1)[0] !== 'md')
            return

        const file = fs.readFileSync(path.resolve(__dirname, '..', '..', 'src/assets/contents', data as string));
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
