import {ResponseService} from '../core/response.service';
import {MessageService} from '../message/message.service';

export function handleErrorHttp(error: any, responseService: ResponseService, messageService: MessageService): Promise<any> {
    let message = responseService.getErrorMessage(error);
    messageService.addAlert(message, 'danger');
    return Promise.reject(message || error);
}

