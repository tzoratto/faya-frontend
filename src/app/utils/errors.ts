import {ResponseService} from '../core/response.service';
import {MessageService} from '../message/message.service';
import {Observable} from 'rxjs';

let handleError = function (responseService: ResponseService, error: any, messageService: MessageService) {
    let message = responseService.getErrorMessage(error);
    messageService.addAlert(message, 'danger');
    return message;
};

export function handleErrorHttp(error: any, responseService: ResponseService, messageService: MessageService): Promise<any> {
    let message = handleError(responseService, error, messageService);
    return Promise.reject(message || error);
}

export function handleErrorHttpObservable(error: any, responseService: ResponseService, messageService: MessageService): Observable<any> {
    let message = handleError(responseService, error, messageService);
    return Observable.throw(message || error);
}


