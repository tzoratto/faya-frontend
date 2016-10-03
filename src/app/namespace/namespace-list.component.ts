import {Component, OnInit} from '@angular/core';
import {Namespace} from './namespace';
import {NamespaceService} from './namespace.service';
import {FormControl} from '@angular/forms';
import {ModalService} from '../modal/modal.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-namespace-list',
    templateUrl: 'namespace-list.component.html',
    styleUrls: ['namespace-list.component.css']
})
export class NamespaceListComponent implements OnInit {
    private namespaces: Array<Namespace> = [];
    private filter = new FormControl();
    private createNamespace: boolean = false;

    constructor(private namespaceService: NamespaceService,
                private modalService: ModalService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.fetchNamespaces();
        this.listenFilter();
    }

    private fetchNamespaces(filter?: string) {
        this.namespaceService.getNamespaces(filter)
            .subscribe(namespaces => {
                    this.namespaces = namespaces;
                },
                error => {
                });
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => this.namespaceService.getNamespaces(filter))
            .subscribe(namespaces => this.namespaces = namespaces,
                error => this.listenFilter());
    }

    onClickDelete(namespace: Namespace): void {
        this.modalService.showModal({key: 'namespace.confirmDelete', variables: {namespaceName: namespace.name}},
            () => {
                this.namespaceService.deleteNamespace(namespace)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'namespace.deleted',
                            variables: {namespaceName: namespace.name}
                        });
                        this.fetchNamespaces(this.filter.value ? this.filter.value : '');
                    })
                    .catch(error => {});
            });
    }

    onClickCreate(): void {
        this.createNamespace = true;
    }

    onCreated(): void {
        this.createNamespace = false;
        this.fetchNamespaces(this.filter.value ? this.filter.value : '');
    }
}
