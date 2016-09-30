import {Component} from '@angular/core';

import {Router} from '@angular/router';

@Component({
    selector: 'faya-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

    constructor(private router: Router) {

    }
}
