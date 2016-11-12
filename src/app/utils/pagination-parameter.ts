export class PaginationParameter {
    limit: number;
    page: number;
    sort: string;
    filter: string;

    constructor(limit?: number,
                page?: number,
                sort?: string,
                filter?: string) {
        this.limit = limit ? limit : 10;
        this.page = page ? page : 1;
        this.sort = sort ? sort : '';
        this.filter = filter ? filter : '';
    }

    buildQueryString(): string {
        return '?q=' + this.filter + '&limit=' + this.limit + '&page=' + this.page + '&sort=' + this.sort;
    }
}
