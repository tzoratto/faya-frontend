import {Component, OnInit} from '@angular/core';
import {SettingService} from '../core/setting.service';
import {TokenService} from '../token/token.service';
import {NamespaceService} from '../namespace/namespace.service';

@Component({
    selector: 'faya-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private namespaceCount: number;
    private tokenCount: number;
    private subscriptionEnabled: boolean;
    private loading: boolean = true;

    constructor(private settingService: SettingService,
                private tokenService: TokenService,
                private namespaceService: NamespaceService) {

    }

    ngOnInit(): void {
        Promise.all([
            this.settingService.checkSubscriptionEnabled(),
            this.tokenService.getTokenCount(),
            this.namespaceService.getNamespaceCount()
        ]).then(data => {
            this.subscriptionEnabled = data[0];
            this.tokenCount = data[1];
            this.namespaceCount = data[2];
            this.loading = false;
        }).catch(error => {
            this.loading = false;
        });
    }

    onChangeSubscriptionEnabled() {
        this.settingService.updateSubscriptionEnabled(this.subscriptionEnabled)
            .catch((error) => {
                this.subscriptionEnabled = !this.subscriptionEnabled;
            });
    }
}
