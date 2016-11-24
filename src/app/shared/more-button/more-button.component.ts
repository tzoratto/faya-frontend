import {Component} from '@angular/core';

@Component({
    selector: 'faya-more-button',
    templateUrl: 'more-button.component.html',
    styleUrls: ['more-button.component.css']
})
export class MoreButtonComponent {
    public disabled: boolean = false;
    public status: {isopen: boolean} = {isopen: false};

    constructor() {

    }
}
