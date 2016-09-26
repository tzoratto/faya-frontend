import {Component, OnInit} from '@angular/core';

import {AuthService} from '../auth/auth.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
    selector: 'my-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {

    }

    signup(email: string, password: string): void {
        this.authService.signup(email, password)
            .then(() => {
                this.router.navigate(['login']);
            })
            .catch(error => {
                alert(error);
            });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            if (params['email'] && params['token']) {
                this.authService.signupValidation(params['email'], params['token'])
                    .then(() => {
                        this.router.navigate(['dashboard']);
                    })
                    .catch(error => {
                        alert(error);
                    });
            }
        });
    }
}
