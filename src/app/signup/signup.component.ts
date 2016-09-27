import {Component, OnInit} from '@angular/core';

import {AuthService} from '../utils/auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessagesService} from '../utils/messages.service';

@Component({
    selector: 'my-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private messagesService: MessagesService) {

    }

    signup(email: string, password: string): void {
        this.authService.signup(email, password)
            .then(() => {
                this.router.navigate(['login']);
                this.messagesService.clearAlert().addAlertAndTranslate('account.signedUp', 'success', 0);
            })
            .catch(error => {});
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['email'] && params['token']) {
                this.authService.signupValidation(params['email'], params['token'])
                    .then(() => {
                        this.router.navigate(['dashboard']);
                        this.messagesService.clearAlert().addAlertAndTranslate('account.validated');
                    })
                    .catch(error => {});
            }
        });
    }
}
