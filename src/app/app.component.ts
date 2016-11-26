import {Component, ViewContainerRef} from '@angular/core';
import {TranslateService} from 'ng2-translate';
import {ComponentsHelper} from 'ng2-bootstrap/ng2-bootstrap';

import '../style/styles.css';

@Component({
    selector: 'faya-app',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(translateService: TranslateService,
                public viewContainerRef: ViewContainerRef,
                componentsHelper: ComponentsHelper) {

        // FIXME This is a temporary workaround for ng2-bootstrap modal.
        // See https://github.com/valor-software/ng2-bootstrap/issues/986#issue-177218652
        componentsHelper.setRootViewContainerRef(viewContainerRef);

        translateService.setDefaultLang('en');
        let lang = navigator.language ? navigator.language.split('-')[0] : 'en';
        translateService.use(lang);
    }
}
