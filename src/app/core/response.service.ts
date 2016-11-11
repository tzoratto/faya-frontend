import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {TranslateService} from 'ng2-translate';

@Injectable()
export class ResponseService {
    constructor(private translateService: TranslateService) {

    }

    isSuccessful(response: Response): boolean {
        return response.json().status === 'success';
    }

    getData(response: Response): any {
        return response.json().data;
    }

    getMessage(response: Response): string {
        return response.json().message;
    }

    getErrorMessage(error: Response): string {
        if (error.status === 0) {
            return this.translateService.instant('misc.serverUnavailable');
        }
        let errorMessage;
        let errorJson = error.json();
        errorMessage = errorJson.message;
        if (!errorMessage && errorJson.data) {
            errorMessage = '';
            Object.keys(errorJson.data).forEach(function (key) {
                errorMessage += errorJson.data[key] + '\n';
            });
        }
        errorMessage = errorMessage || this.translateService.instant('misc.unknownError');

        return errorMessage;
    }

}
