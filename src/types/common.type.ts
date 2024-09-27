export type Blog = {
    title: string;
    created_at: string;
    update_at: string;
    slug: string,
    image: string,
    tags: string[],
    category: string,
    creator: string,
    draft: boolean;
    body?: string;
    word: number;
}

export type ResponseApi<T> = {
    status: boolean;
    message: string;
    data: T
}

export type Pagging = {
    total_item: number;
    page: number;
    total_page: number;
    item: number;
}