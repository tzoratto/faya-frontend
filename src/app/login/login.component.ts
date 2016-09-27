import {Component} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessagesService} from '../utils/messages.service';

@Component({
    selector: 'my-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private messagesService: MessagesService) {

    }

    login(email: string, password: string): void {
        this.authService.login(email, password)
            .then(() => {
                this.router.navigate([this.authService.redirectUrl ? this.authService.redirectUrl : 'dashboard']);
            })
            .catch(error => {
                this.messagesService.addAlert(error, 'danger', true, 5000);
            });
    }
}
