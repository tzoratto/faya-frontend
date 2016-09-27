import {Component} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import '../style/styles.css';
import {MessagesService} from './utils/messages.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(translateService: TranslateService, private messagesService: MessagesService) {
        translateService.setDefaultLang('en');

        let lang = navigator.language ? navigator.language.split('-')[0] : 'en';
        translateService.use(lang);
    }
}
