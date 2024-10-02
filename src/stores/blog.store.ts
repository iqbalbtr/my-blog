import type { Blog } from "~/types/common.type";

export const useBlog = defineStore('blog', {
    state: () => ({
        categories: [] as string[],
        tags: [] as string[],
        blogs: [] as Blog[],
        pagging: {
            page: 1,
            item: 0,
            query: 'idle',
            queryType: 'category',
            itemPerPage: 6,
            totalPage: 1
        }
    }),
    actions: {
        async init() {
            const blogs = await queryContent('/').sort(({ created_at: -1 })).limit(this.pagging.itemPerPage).find() as Blog[];
            const count = await queryContent("/").count();
            this.pagging.item = count;
            this.pagging.totalPage = Math.floor(count/ this.pagging.itemPerPage);
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
        setBlog(blogs: Blog[], type: 'new' | "current" = 'new') {


            if (type == 'new')
                this.blogs = [];

            setTimeout(() => {
                const newBlog = type === 'new' ? [...blogs] : [...this.blogs, ...blogs];
                this.blogs = [...newBlog];
            }, 100)
        },
        async handleQuery(query: 'tags' | 'category', value: string, pagination: boolean = false) {

            if (this.pagging.query === value) {
                this.pagging.query = 'idle'
                this.pagging.queryType = 'category'
                value = '';
                this.pagging.page = 1;
                this.pagging.totalPage = Math.floor(this.pagging.item / this.pagging.itemPerPage);
            }
            this.pagging.query = value;
            this.pagging.queryType = query;

            const searchTerm = new RegExp(this.pagging.query, 'i')
            const blogs: any = await queryContent('/').where({ [this.pagging.queryType]: searchTerm }).sort(({ created_at: -1 })).limit(this.pagging.itemPerPage).find();
            const count: any = await queryContent('/').where({ [this.pagging.queryType]: searchTerm }).sort(({ created_at: -1 })).limit(this.pagging.itemPerPage).count();

            this.pagging.item = count;
            this.setBlog(blogs);
        },
        async handlePagination() {


            if (this.pagging.page >= this.pagging.totalPage)
                return

            const skip = (++this.pagging.page - 1) * this.pagging.itemPerPage;

            const searchTerm = new RegExp(this.pagging.query, 'i')
            const blogs: any = await queryContent('/')
                .where({ ...(this.pagging.query != 'idle' && { [this.pagging.queryType]: searchTerm }) })
                .sort(({ created_at: -1 }))
                .limit(this.pagging.itemPerPage)
                .skip(skip)
                .find();

            this.setBlog(blogs, "current");
        }
    }
})