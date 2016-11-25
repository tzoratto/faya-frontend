import {Component, OnInit, Input, OnChanges} from '@angular/core';
import {Token} from './token';
import {FormControl} from '@angular/forms';
import {TokenService} from './token.service';
import {Namespace} from '../namespace/namespace';
import {ModalService} from '../core/modal/modal.service';
import {MessageService} from '../core/message/message.service';
import {PaginatedResult} from '../utils/paginated-result';
import {PaginationParameter} from '../utils/pagination-parameter';

@Component({
    selector: 'faya-token-list',
    templateUrl: 'token-list.component.html',
    styleUrls: ['token-list.component.css']
})
export class TokenListComponent implements OnInit, OnChanges {
    private tokens: PaginatedResult<Token> = new PaginatedResult<Token>();
    private paginationParameter: PaginationParameter = new PaginationParameter(20, 1, '-createdAt', '');
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
        this.paginationParameter.page = 1;
        this.fetchTokens();
    }

    private fetchTokens() {
        if (this.namespace)  {
            this.tokenService.getTokens(this.paginationParameter, this.namespace.id)
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
            .switchMap(filter => {
                this.paginationParameter.page = 1;
                this.paginationParameter.filter = filter;
                return this.tokenService.getTokens(this.paginationParameter, this.namespace.id);
            })
            .subscribe(tokens => this.tokens = tokens,
                error => {
                    this.filter.setValue('');
                    this.paginationParameter.filter = '';
                    this.listenFilter();
                });
    }

    onClickDelete(token: Token): void {
        this.modalService.showModal({key: 'token.confirmDelete', variables: {tokenValue: token.value}},
            () => {
                if (this.paginationParameter.page > 1 && this.tokens.resultCount === 1) {
                    this.paginationParameter.page--;
                }
                this.tokenService.deleteToken(token)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'token.deleted',
                            variables: {tokenValue: token.value}
                        });
                        this.fetchTokens();
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
        this.fetchTokens();
    }

    pageChanged($event): void {
        this.fetchTokens();
    }

    onCopyToClipboard($event, tokenValue): void {
        if ($event) {
            this.messageService.addAlertAndTranslate({
                key: 'misc.copyToClipboardSuccess',
                variables: {text: tokenValue}
            });
        } else {
            this.messageService.addAlertAndTranslate({
                key: 'misc.copyToClipboardError',
                variables: {text: tokenValue}
            }, 'danger');
        }
    }
}
