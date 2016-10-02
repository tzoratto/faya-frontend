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
    private tokenCount: Promise<number>;
    private namespaceCount: Promise<number>;
    private user: User;

    constructor(private tokenService: TokenService,
                private namespaceService: NamespaceService,
                private authService: AuthService) {

    }

    ngOnInit() {
        this.user = this.authService.getUser();
        this.tokenCount = this.tokenService.getTokenCount(this.user)
            .catch(error => {});
        this.namespaceCount = this.namespaceService.getNamespaceCount(this.user)
            .catch(error => {});
    }
}
