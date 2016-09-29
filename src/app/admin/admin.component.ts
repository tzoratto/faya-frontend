import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {SettingService} from '../core/setting.service';

@Component({
    selector: 'my-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private namespaceCount: number;
    private tokenCount: number;

    constructor(private settingService: SettingService,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.data.forEach((data: { values: any }) => {
            this.namespaceCount = data.values.namespaceCount;
            this.tokenCount = data.values.tokenCount;
        });
    }
}
