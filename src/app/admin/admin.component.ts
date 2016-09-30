import {Component, OnInit} from '@angular/core';

import {ActivatedRoute} from '@angular/router';
import {SettingService} from '../core/setting.service';

@Component({
    selector: 'faya-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private namespaceCount: number;
    private tokenCount: number;
    private subscriptionEnabled: boolean;

    constructor(private settingService: SettingService,
                private route: ActivatedRoute) {

    }

    ngOnInit(): void {
        this.route.data.forEach((data: { values: any }) => {
            this.namespaceCount = data.values.namespaceCount;
            this.tokenCount = data.values.tokenCount;
            this.subscriptionEnabled = data.values.subscriptionEnabled;
        });
    }

    onChangeSubscriptionEnabled() {
        this.settingService.updateSubscriptionEnabled(this.subscriptionEnabled)
            .catch((error) => {
                this.subscriptionEnabled = !this.subscriptionEnabled;
            });
    }
}
