import {ResponseService} from '../response/response.service';

export function handleErrorHttp(error: any, responseService: ResponseService): Promise<any> {
    let message = responseService.getErrorMessage(error);
    return Promise.reject(message || error);
}
