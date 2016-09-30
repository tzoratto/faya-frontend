import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'my-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private namespaceCount: number;
    private tokenCount: number;
    private subscriptionEnabled: boolean;

    constructor(private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.data.forEach((data: { values: any }) => {
            this.namespaceCount = data.values.namespaceCount;
            this.tokenCount = data.values.tokenCount;
            this.subscriptionEnabled = data.values.subscriptionEnabled;
        });
    }
}
