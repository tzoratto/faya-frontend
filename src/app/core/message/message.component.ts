import {Component} from '@angular/core';

import {MessageService} from './message.service';

@Component({
    selector: 'faya-message',
    templateUrl: 'message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {
    constructor(private messageService: MessageService) {

    }
}
