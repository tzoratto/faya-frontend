import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../core/auth/auth.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-password-reset',
    templateUrl: './password-reset.component.html',
    styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
    private email: string;
    private token: string;
    constructor(private route: ActivatedRoute,
                private authService: AuthService,
                private router: Router,
                private messageService: MessageService) {

    }

    submitFirtStep(email: string): void {
        this.authService.passwordReset(email)
            .then(() => {
                this.router.navigate([''])
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate('account.passwordResetSent');
                    });
            })
            .catch(error => {});
    }

    submitFinalStep(password: string): void {
        this.authService.passwordResetValidation(this.email, this.token, password)
            .then(() => {
                this.router.navigate(['dashboard'])
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate('account.passwordResetDone');
                    });
            })
            .catch(error => {});
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            if (params['email'] && params['token']) {
                this.email = params['email'];
                this.token = params['token'];
            }
        });
    }
}
