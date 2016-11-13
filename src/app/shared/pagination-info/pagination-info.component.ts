import {Component, Input} from '@angular/core';

@Component({
    selector: 'faya-pagination-info',
    templateUrl: 'pagination-info.component.html',
    styleUrls: ['pagination-info.component.css']
})
export class PaginationInfoComponent {
    @Input()
    page: number;
    @Input()
    limit: number;
    @Input()
    resultCount: number;
    @Input()
    totalCount: number;

    constructor() {

    }
}
