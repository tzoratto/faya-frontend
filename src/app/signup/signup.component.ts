import {Component, OnInit} from '@angular/core';

import {AuthService} from '../core/auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';
import {MessageService} from '../core/message/message.service';

@Component({
    selector: 'faya-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    constructor(private authService: AuthService,
                private router: Router,
                private route: ActivatedRoute,
                private messageService: MessageService) {

    }

    signup(email: string, password: string): void {
        this.authService.signup(email, password)
            .then(() => {
                this.router.navigate(['login'])
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate('account.signedUp', 'success', 0);
                    });
            })
            .catch(error => {});
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['email'] && params['token']) {
                this.authService.signupValidation(params['email'], params['token'])
                    .then(() => {
                        this.router.navigate(['dashboard'])
                            .then(() => {
                                this.messageService.clearAlert().addAlertAndTranslate('account.validated');
                            });
                    })
                    .catch(error => {});
            }
        });
    }
}
