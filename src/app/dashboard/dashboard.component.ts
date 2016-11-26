import {Component, OnInit} from '@angular/core';
import {TokenService} from '../token/token.service';
import {NamespaceService} from '../namespace/namespace.service';
import {AuthService} from '../core/auth/auth.service';
import {User} from '../user/user';

@Component({
    selector: 'faya-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    private tokenCount: number;
    private namespaceCount: number;
    private user: User;
    private loading: boolean = true;

    constructor(private tokenService: TokenService,
                private namespaceService: NamespaceService,
                private authService: AuthService) {

    }

    ngOnInit() {
        this.user = this.authService.getUser();
        Promise.all([
            this.tokenService.getTokenCount(this.user),
            this.namespaceService.getNamespaceCount(this.user)
        ]).then(data => {
            this.tokenCount = data[0];
            this.namespaceCount = data[1];
            this.loading = false;
        }).catch(error => {});
    }
}
