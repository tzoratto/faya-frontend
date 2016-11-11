import {ResponseService} from '../core/response.service';
import {Observable} from 'rxjs';
import {MessageService} from '../core/message/message.service';

let handleError = function (responseService: ResponseService, error: any, messageService: MessageService) {
    let message = responseService.getErrorMessage(error);
    messageService.addAlert(message, 'danger');
    return error;
};

export function handleErrorHttp(error: any, responseService: ResponseService, messageService: MessageService): Promise<any> {
    handleError(responseService, error, messageService);
    return Promise.reject(error);
}

export function handleErrorHttpObservable(error: any, responseService: ResponseService, messageService: MessageService): Observable<any> {
    handleError(responseService, error, messageService);
    return Observable.throw(error);
}


