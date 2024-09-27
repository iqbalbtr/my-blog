const numFormat = (num: number) => {

    return String(num).length === 1 ? "0" + num : num
}

export const formatDate = (date: string, anchor: string) => {

    const now = new Date(date);

    return now.getFullYear() + anchor + numFormat((now.getMonth() + 1)) + anchor + numFormat(now.getDate())
}