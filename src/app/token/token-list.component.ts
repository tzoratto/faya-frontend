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
    private displayTokenHistory: boolean = false;
    private tokenSelected: Token;
    private loading: boolean = true;
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
        this.clearSelection();
    }

    private fetchTokens() {
        if (this.namespace) {
            this.loading = true;
            this.tokenService.getTokens(this.paginationParameter, this.namespace.id)
                .subscribe(tokens => {
                        this.tokens = tokens;
                        this.loading = false;
                    },
                    error => {
                        this.loading = false;
                    });
        }
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => {
                this.loading = true;
                this.paginationParameter.page = 1;
                this.paginationParameter.filter = filter;
                return this.tokenService.getTokens(this.paginationParameter, this.namespace.id);
            })
            .subscribe(tokens => {
                    this.tokens = tokens;
                    this.loading = false;
                },
                error => {
                    this.filter.setValue('');
                    this.paginationParameter.filter = '';
                    this.listenFilter();
                    this.loading = false;
                });
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
                        this.fetchTokens();
                    })
                    .catch(error => {});
            });
    }

    onClickDetails(token: Token): void {
        this.tokenSelected = token;
        this.displayTokenHistory = false;
        this.displayTokenDetails = true;
    }

    onClickCreate(): void {
        this.displayTokenHistory = false;
        this.displayTokenDetails = true;
    }

    onDetailsDone(): void {
        this.displayTokenDetails = false;
        this.tokenSelected = null;
        this.fetchTokens();
    }

    onClickHistory(token: Token): void {
        this.tokenSelected = token;
        this.displayTokenDetails = false;
        this.displayTokenHistory = true;
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

    clearSelection(): void {
        this.fetchTokens();
        this.tokenSelected = null;
        this.displayTokenHistory = false;
        this.displayTokenDetails = false;
    }
}
