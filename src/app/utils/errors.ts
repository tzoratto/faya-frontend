import {ResponseService} from './response.service';
import {MessagesService} from './messages.service';

export function handleErrorHttp(error: any, responseService: ResponseService, messagesService: MessagesService): Promise<any> {
    let message = responseService.getErrorMessage(error);
    messagesService.addAlert(message, 'danger');
    return Promise.reject(message || error);
}

