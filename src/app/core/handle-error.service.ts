import {Injectable} from '@angular/core';
import {ResponseService} from './response.service';
import {MessageService} from './message/message.service';
import {Observable} from 'rxjs';
import {Response} from '@angular/http';
import {Router} from '@angular/router';

@Injectable()
export class HandleErrorService {

    constructor(private responseService: ResponseService,
                private messageService: MessageService,
                private router: Router) {

    }

    private handleError(error: Response): Response {
        if (error.status === 401) {
            this.router.navigate(['']);
            return;
        }
        let message = this.responseService.getErrorMessage(error);
        this.messageService.addAlert(message, 'danger');
        return error;
    }

    handleErrorHttp(error: Response): Promise<any> {
        this.handleError(error);
        return Promise.reject(error);
    }

    handleErrorHttpObservable(error: Response): Observable<any> {
        this.handleError(error);
        return Observable.throw(error);
    }
}
