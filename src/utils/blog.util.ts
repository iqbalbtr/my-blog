export function totalWord(arr: any) {
    let total = 0;

    for (const item of arr) {
        if(typeof item.value == 'string'){
            ++total
        }

        if (item.children && item.children.length > 0) {
            total += totalWord(item.children);
        }
    }

    return total;
}