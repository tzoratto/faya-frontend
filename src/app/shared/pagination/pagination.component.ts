import {Component, Input, Output, EventEmitter, forwardRef, OnChanges} from '@angular/core';
import {NG_VALUE_ACCESSOR, ControlValueAccessor} from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PaginationComponent),
    multi: true
};

const noop = () => {};

@Component({
    selector: 'faya-pagination',
    templateUrl: 'pagination.component.html',
    styleUrls: ['pagination.component.css'],
    providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
})
export class PaginationComponent implements ControlValueAccessor, OnChanges {
    @Input()
    limit: number;
    @Input()
    resultCount: number;
    @Input()
    totalCount: number;
    @Input()
    maxSize: number = 5;
    @Input()
    boundaryLinks: boolean = true;
    @Output()
    pageChanged = new EventEmitter<number>();

    private _page: number;
    private onChange: (_: any) => void = noop;
    private onTouched: (_: any) => void = noop;

    constructor() {

    }

    ngOnChanges(): void {
        // FIXME This is a temporary workaround for ng2-bootstrap pagination.
        // Fix ng2-bootstrap bug when requested page is after the last page
        // see https://github.com/valor-software/ng2-bootstrap/issues/1167
        // or https://github.com/valor-software/ng2-bootstrap/issues/899
        let lastPage = Math.ceil(this.totalCount / this.limit);
        if (lastPage < this.page) {
            this.page = lastPage > 0 ? lastPage : 1;
        }
    }

    writeValue(obj: any): void {
        this.page = obj;
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    get page(): number {
        return this._page;
    }

    set page(value: number) {
        if (value !== this._page) {
            this._page = value;
            this.onChange(this._page);
        }
    }

    onPageChanged(event): void {
        // When pageChanged is triggered, the selected page is not directly updated
        setTimeout(() => {
            this.pageChanged.emit(event);
        }, 0);
    }
}
