import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {Injectable} from '@angular/core';

import 'rxjs/add/operator/toPromise';
import {AuthHttp} from 'angular2-jwt';
import {User} from '../user/user';
import {Observable} from 'rxjs';
import {Token} from './token';
import {HandleErrorService} from '../core/handle-error.service';
import {PaginationParameter} from '../utils/pagination-parameter';
import {PaginatedResult} from '../utils/paginated-result';
import {TokenHit} from './tokenHit';
import {ChartService} from '../shared/chart/chart.service';
import {ChartParameter} from '../shared/chart/chart-parameter';

@Injectable()
export class TokenService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private handleErrorService: HandleErrorService,
                private chartService: ChartService) {

    }

    getTokenCount(user?: User): Promise<number> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.count + (user ? '?user=' + user.id : ''))
            .toPromise()
            .then(response => {
                return this.responseService.getData(response).count;
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokens(paginationParameter: PaginationParameter, namespaceId = ''): Observable<PaginatedResult<Token>> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.token + paginationParameter.buildQueryString() + '&namespace=' + namespaceId)
            .map(response => {
                return new PaginatedResult<Token>(this.responseService.getData(response), Token);
            })
            .catch(error => this.handleErrorService.handleErrorHttpObservable(error));
    }

    createToken(token: Token): Promise<Token> {
        let body = JSON.stringify(token);

        return this.authHttp.post(BACKEND_ROUTES.api.token.token, body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    deleteToken(token: Token): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.api.token.instance(token.id))
            .toPromise()
            .then(response => {})
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    updateToken(token: Token): Promise<Token> {
        let body = JSON.stringify(token);

        return this.authHttp.put(BACKEND_ROUTES.api.token.instance(token.id), body)
            .toPromise()
            .then(response => {
                return new Token(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokenHistory(token: Token, paginationParameter: PaginationParameter): Promise<PaginatedResult<TokenHit>> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.history(token.id) + paginationParameter.buildQueryString())
            .toPromise()
            .then(response => {
                return new PaginatedResult<TokenHit>(this.responseService.getData(response), TokenHit);
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokenYearHistory(token: Token): Promise<ChartParameter> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.history.year(token.id))
            .toPromise()
            .then(response => {
                return this.chartService.yearHistoryChartData(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokenMonthHistory(token: Token): Promise<ChartParameter> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.history.month(token.id))
            .toPromise()
            .then(response => {
                return this.chartService.monthHistoryChartData(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }

    getTokenDayHistory(token: Token): Promise<ChartParameter> {
        return this.authHttp.get(BACKEND_ROUTES.api.token.history.day(token.id))
            .toPromise()
            .then(response => {
                return this.chartService.dayHistoryChartData(this.responseService.getData(response));
            })
            .catch(error => this.handleErrorService.handleErrorHttp(error));
    }
}
