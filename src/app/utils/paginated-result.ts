export class PaginatedResult<T> {
    private _resultCount: number;
    private _totalCount: number;
    private _page: number;
    private _result: Array<T> = [];

    constructor(data?: {
        resultCount,
        totalCount,
        page,
        result
    }, type?: any) {
        this._resultCount = data ? data.resultCount : 0;
        this._totalCount = data ? data.totalCount : 0;
        this._page = data ? data.page : 0;
        if (data) {
            data.result.forEach(entry => {
                this._result.push(new type(entry));
            });
        }
    }

    get result(): Array<T> {
        return this._result;
    }

    get resultCount(): number {
        return this._resultCount;
    }

    get totalCount(): number {
        return this._totalCount;
    }

    get page(): number {
        return this._page;
    }
}
