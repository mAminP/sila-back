export class PaginateItems {

    constructor(
        page,// number
        limit, // number
        total,// number
        items,// any[]
    ) {
    this.page =page
    this.limit =limit
    this.total =total
    this.items =items
    }
}
