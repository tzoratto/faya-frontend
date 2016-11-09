import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {MessageService} from '../message/message.service';
import {Token} from './token';
import {TokenService} from './token.service';
import {Namespace} from '../namespace/namespace';

@Component({
    selector: 'faya-token-details',
    templateUrl: 'token-details.component.html',
    styleUrls: ['token-details.component.css']
})
export class TokenDetailsComponent implements OnInit {
    @Output()
    done = new EventEmitter<boolean>();
    @Input()
    token: Token;
    @Input()
    namespace: Namespace;

    constructor(private tokenService: TokenService,
                private messageService: MessageService) {

    }

    onSubmit() {
        if (this.token.id) {
            this.tokenService.updateToken(this.token)
                .then(token => {
                    this.messageService.clearAlert().addAlertAndTranslate({
                        key: 'token.updated',
                        variables: {tokenValue: token.value}
                    });
                    this.done.emit(true);
                })
                .catch(error => {});
        } else {
            this.tokenService.createToken(this.namespace.id,
                this.token.description,
                this.token.active,
                this.token.startsAt,
                this.token.endsAt,
                this.token.pool)
                .then(token => {
                    this.messageService.clearAlert().addAlertAndTranslate({
                        key: 'token.created',
                        variables: {tokenValue: token.value}
                    });
                    this.done.emit(true);
                })
                .catch(error => {});
        }
    }

    onCancel() {
        this.done.emit(false);
    }

    ngOnInit(): void {
        this.token = this.token ? this.token : new Token({active: true});
    }
}
