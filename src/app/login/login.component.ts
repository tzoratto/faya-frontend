import {Component} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    }

    login(email: string, password: string): void {
        this.authService.login(email, password)
            .then(() => {
                this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard']);
            })
            .catch(error => {
                alert(error);
            });
    }
}
