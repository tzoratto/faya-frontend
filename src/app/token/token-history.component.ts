import {Component, Input, OnInit} from '@angular/core';
import {Token} from './token';
import {TokenService} from './token.service';
import {PaginatedResult} from '../utils/paginated-result';
import {TokenHit} from './tokenHit';
import {PaginationParameter} from '../utils/pagination-parameter';
import {ChartParameter} from '../shared/chart/chart-parameter';

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

    private chartParameter: ChartParameter;
    private chartLoading: boolean = true;

    constructor(private tokenService: TokenService) {
    }

    ngOnInit(): void {
        this.fetchTokenHistory();
        this.fetchTokenDayHistory();
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

    fetchTokenDayHistory(): void {
        if (this.token) {
            this.tokenService.getTokenDayHistory(this.token)
                .then((chartParameter) => {
                    this.chartParameter = chartParameter;
                })
                .catch(error => {});
        }
    }

    fetchTokenMonthHistory(): void {
        if (this.token) {
            this.tokenService.getTokenMonthHistory(this.token)
                .then((chartParameter) => {
                    this.chartParameter = chartParameter;
                })
                .catch(error => {});
        }
    }

    fetchTokenYearHistory(): void {
        if (this.token) {
            this.tokenService.getTokenYearHistory(this.token)
                .then((chartParameter) => {
                    this.chartParameter = chartParameter;
                })
                .catch(error => {});
        }
    }

    chartScaleChange($event): void {
        this.fetchTokenHistory();
        switch ($event.target.value) {
            case 'day':
                this.fetchTokenDayHistory();
                break;
            case 'month':
                this.fetchTokenMonthHistory();
                break;
            case 'year':
                this.fetchTokenYearHistory();
                break;
        }
    }

    pageChanged($event): void {
        this.fetchTokenHistory();
    }

    onChartReady(): void {
        this.chartLoading = false;
    }
}
