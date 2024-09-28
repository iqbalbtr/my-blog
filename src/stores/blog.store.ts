import type { Blog } from "~/types/common.type";

export const useBlog = defineStore('blog', {
    state: () => ({
        categories: [] as string[],
        tags: [] as string[],
        blogs: [] as Blog[],
        pagging: {
            page: 1,
            item: 0
        }
    }),
    actions: {
        async init() {
            const blogs = await queryContent('/').sort(({ created_at: -1})).find() as Blog[];
            this.setCategories(blogs);
            this.setBlog(blogs);
            this.setTags(blogs);
        },
        setCategories(blogs: Blog[]) {

            const arr: string[] = [];
            for (const blog of blogs) {
                if (!arr.find(fo => fo == blog.category)) {
                    arr.push(blog.category);
                }
            }

            this.categories = [...arr.slice(0, 3)]
        },
        setTags(blogs: Blog[]) {

            const arr: string[] = [];
            for (const blog of blogs) {
                for (const tag of blog.tags) {
                    if (!arr.find(fo => fo == tag)) {
                        arr.push(tag);
                    }
                }
            }

            this.tags = [...arr.slice(0, 12)]
        },
        setBlog(blogs: Blog[]) {
            this.blogs = [...blogs];
        },
        async handleQuery(query: 'tags' | 'category', value: string){
            const searchTerm = new RegExp(value, 'i')
            const blogs: any = await queryContent('/').where({[query]: searchTerm}).sort(({ created_at: -1})).find();
            this.blogs = [...blogs];
        }
    }
})