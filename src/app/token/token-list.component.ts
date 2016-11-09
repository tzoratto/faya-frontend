import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Token} from './token';
import {FormControl} from '@angular/forms';
import {TokenService} from './token.service';
import {Namespace} from '../namespace/namespace';
import {ModalService} from '../modal/modal.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-token-list',
    templateUrl: 'token-list.component.html',
    styleUrls: ['token-list.component.css']
})
export class TokenListComponent implements OnInit, OnChanges {
    private tokens: Array<Token> = [];
    private filter = new FormControl();
    private displayTokenDetails: boolean = false;
    private tokenToModify: Token;
    @Input()
    namespace: Namespace;

    constructor(private tokenService: TokenService,
                private modalService: ModalService,
                private messageService: MessageService) { }

    ngOnInit() {
        this.fetchTokens();
        this.listenFilter();
    }

    ngOnChanges() {
        this.fetchTokens(this.filter.value ? this.filter.value : '');
    }

    private fetchTokens(filter?: string) {
        if (this.namespace)  {
            this.tokenService.getTokens(filter, this.namespace.id)
                .subscribe(tokens => {
                        this.tokens = tokens;
                    },
                    error => {});
        }
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => this.tokenService.getTokens(filter, this.namespace.id))
            .subscribe(tokens => this.tokens = tokens,
                error => this.listenFilter());
    }

    onClickDelete(token: Token): void {
        this.modalService.showModal({key: 'token.confirmDelete', variables: {tokenValue: token.value}},
            () => {
                this.tokenService.deleteToken(token)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'token.deleted',
                            variables: {tokenValue: token.value}
                        });
                        this.fetchTokens(this.filter.value ? this.filter.value : '');
                    })
                    .catch(error => {});
            });
    }

    onClickDetails(token: Token): void {
        this.tokenToModify = token;
        this.displayTokenDetails = true;
    }

    onClickCreate(): void {
        this.displayTokenDetails = true;
    }

    onDetailsDone(): void {
        this.displayTokenDetails = false;
        this.tokenToModify = null;
        this.fetchTokens(this.filter.value ? this.filter.value : '');
    }
}
