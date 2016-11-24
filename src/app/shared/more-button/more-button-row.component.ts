import {Component} from '@angular/core';

@Component({
    selector: 'faya-more-button-row',
    templateUrl: 'more-button-row.component.html',
    styleUrls: ['more-button-row.component.css']
})
export class MoreButtonRowComponent {
    constructor() {
    }

    onClick(event): boolean {
        return false;
    }
}
