import {Component, Input, OnInit} from '@angular/core';
import {Token} from './token';
import {TokenService} from './token.service';
import {PaginatedResult} from '../utils/paginated-result';
import {TokenHit} from './tokenHit';
import {PaginationParameter} from '../utils/pagination-parameter';

@Component({
    selector: 'faya-token-history',
    templateUrl: 'token-history.component.html',
    styleUrls: ['token-history.component.css']
})
export class TokenHistoryComponent implements OnInit {
    @Input()
    private token: Token;
    private loading: boolean = true;
    private tokenHits: PaginatedResult<TokenHit> = new PaginatedResult<TokenHit>();
    private paginationParameter: PaginationParameter = new PaginationParameter(20, 1, '-date', '');

    constructor(private tokenService: TokenService) {
    }

    ngOnInit(): void {
        this.fetchTokenHistory();
    }

    fetchTokenHistory(): void {
        if (this.token) {
            this.loading = true;
            this.tokenService.getTokenHistory(this.token, this.paginationParameter)
                .then((tokenHits) => {
                    this.tokenHits = tokenHits;
                    this.loading = false;
                })
                .catch(error => {
                    this.loading = false;
                });
        }
    }

    pageChanged($event): void {
        this.fetchTokenHistory();
    }
}
