import {Injectable} from '@angular/core';
import {ApiKeyPair} from './api-key-pair';
import {AuthHttp} from 'angular2-jwt';
import {BACKEND_ROUTES} from '../utils/backend-routes';
import {ResponseService} from '../core/response.service';
import {MessageService} from '../message/message.service';
import {handleErrorHttp} from '../utils/errors';

@Injectable()
export class ApiKeyPairService {
    constructor(private authHttp: AuthHttp,
                private responseService: ResponseService,
                private messageService: MessageService) {

    }

    getApiKeyPairs(): Promise<Array<ApiKeyPair>> {
        return this.authHttp.get(BACKEND_ROUTES.apiKey.apiKey)
            .toPromise()
            .then(response => {
                let apiKeyPairsRaw = this.responseService.getData(response);
                let apiKeyPairs: Array<ApiKeyPair> = [];
                apiKeyPairsRaw.forEach(apiKeyPair => {
                    apiKeyPairs.push(new ApiKeyPair(apiKeyPair));
                });
                return apiKeyPairs;
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    deleteApiKeyPair(apiKeyPair: ApiKeyPair): Promise<void> {
        return this.authHttp.delete(BACKEND_ROUTES.apiKey.instance(apiKeyPair.id))
            .toPromise()
            .then(response => {})
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }

    createApiKeyPair(): Promise<ApiKeyPair> {
        return this.authHttp.post(BACKEND_ROUTES.apiKey.apiKey, null)
            .toPromise()
            .then(response => {
                return new ApiKeyPair(this.responseService.getData(response));
            })
            .catch(error => handleErrorHttp(error, this.responseService, this.messageService));
    }
}
