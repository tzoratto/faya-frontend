import {Component} from '@angular/core';

import {AuthService} from '../utils/auth/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router) {

    }

    login(email: string, password: string): void {
        this.authService.login(email, password)
            .then(() => {
                this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard']);
            })
            .catch(error => {});
    }
}
