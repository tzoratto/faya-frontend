import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {Token} from './token';
import {TokenService} from './token.service';
import {Namespace} from '../namespace/namespace';
import {MessageService} from '../core/message/message.service';

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
    private displayStartsAtPicker: boolean = false;
    private displayEndsAtPicker: boolean = false;
    private startsAt: Date = new Date();
    private endsAt: Date = new Date();

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
            this.tokenService.createToken(this.token)
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
        this.token = this.token ? this.token : new Token({namespace: this.namespace.id, active: true});
    }

    startsAtSelected(): void {
        this.displayStartsAtPicker = false;
        setTimeout(() => {
            this.token.startsAt = this.startsAt;
        }, 0);
    }

    resetStartsAt(): void {
        this.token.startsAt = null;
    }

    endsAtSelected(): void {
        this.displayEndsAtPicker = false;
        setTimeout(() => {
            this.token.endsAt = this.endsAt;
        }, 0);
    }

    resetEndsAt(): void {
        this.token.endsAt = null;
    }
}
