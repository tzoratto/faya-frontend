import {Component, ViewContainerRef} from '@angular/core';
import {TranslateService} from 'ng2-translate/ng2-translate';

import '../style/styles.css';

@Component({
    selector: 'faya-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(translateService: TranslateService,
                public viewContainerRef: ViewContainerRef) {
        translateService.setDefaultLang('en');

        let lang = navigator.language ? navigator.language.split('-')[0] : 'en';
        translateService.use(lang);
    }
}
