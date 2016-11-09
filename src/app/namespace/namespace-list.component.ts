import {Component, OnInit, Output, EventEmitter} from '@angular/core';
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
    private displayNamespaceDetails: boolean = false;
    private namespaceToModify: Namespace;
    @Output()
    namespaceSelected = new EventEmitter<Namespace>();
    private _namespaceSelected: Namespace;

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
                    if (!this._namespaceSelected) {
                        this._namespaceSelected = this.namespaces[0];
                        this.onClickNamespace(this._namespaceSelected);
                    }
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

    onClickDetails(namespace: Namespace): void {
        this.namespaceToModify = namespace;
        this.displayNamespaceDetails = true;
    }

    onClickCreate(): void {
        this.displayNamespaceDetails = true;
    }

    onDetailsDone(): void {
        this.displayNamespaceDetails = false;
        this.namespaceToModify = null;
        this.fetchNamespaces(this.filter.value ? this.filter.value : '');
    }

    onClickNamespace(namespace: Namespace): void {
        this._namespaceSelected = namespace;
        this.namespaceSelected.emit(namespace);
    }
}
