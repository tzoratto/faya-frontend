import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {SettingService} from '../setting/setting.service';
import {TokenService} from '../token/token.service';
import {NamespaceService} from '../namespace/namespace.service';

@Component({
    selector: 'my-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private namespaceCount: number;
    private tokenCount: number;

    constructor(private router: Router,
                private settingService: SettingService,
                private tokenService: TokenService,
                private namespaceService: NamespaceService) {

    }

    ngOnInit(): void {
        this.settingService.checkSubscriptionEnabled()
            .catch(error => {});
        this.tokenService.getTokenCount()
            .then(count => this.tokenCount = count)
            .catch(error => {});
        this.namespaceService.getNamespaceCount()
            .then(count => this.namespaceCount = count)
            .catch(error => {});
    }
}
