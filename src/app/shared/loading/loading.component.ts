import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'faya-loading',
    templateUrl: 'loading.component.html',
    styleUrls: ['loading.component.css']
})
export class LoadingComponent {
    @Input()
    private loading: boolean;

    constructor() {
    }
}
