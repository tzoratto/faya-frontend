import {Component, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {NamespaceService} from './namespace.service';
import {Namespace} from './namespace';
import {MessageService} from '../core/message/message.service';

@Component({
    selector: 'faya-namespace-details',
    templateUrl: 'namespace-details.component.html',
    styleUrls: ['namespace-details.component.css']
})
export class NamespaceDetailsComponent implements OnInit {
    @Output()
    done = new EventEmitter<boolean>();
    @Input()
    namespace: Namespace;
    constructor(private namespaceService: NamespaceService,
                private messageService: MessageService) {

    }

    onSubmit() {
        if (this.namespace.id) {

            this.namespaceService.updateNamespace(this.namespace)
                .then(namespace => {
                    this.messageService.clearAlert().addAlertAndTranslate({
                        key: 'namespace.updated',
                        variables: {namespaceName: namespace.name}
                    });
                    this.done.emit(true);
                })
                .catch(error => {});
        } else {
            this.namespaceService.createNamespace(this.namespace)
                .then(namespace => {
                    this.messageService.clearAlert().addAlertAndTranslate({
                        key: 'namespace.created',
                        variables: {namespaceName: namespace.name}
                    });
                    this.done.emit(true);
                })
                .catch(error => {});
        }
    }

    onCancel() {
        this.done.emit(false);
    }

    ngOnInit(): void {
        this.namespace = this.namespace ? this.namespace : new Namespace();
    }
}
