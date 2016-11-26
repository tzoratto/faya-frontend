import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Namespace} from './namespace';
import {NamespaceService} from './namespace.service';
import {FormControl} from '@angular/forms';
import {ModalService} from '../core/modal/modal.service';
import {MessageService} from '../core/message/message.service';
import {PaginatedResult} from '../utils/paginated-result';
import {PaginationParameter} from '../utils/pagination-parameter';

@Component({
    selector: 'faya-namespace-list',
    templateUrl: 'namespace-list.component.html',
    styleUrls: ['namespace-list.component.css']
})
export class NamespaceListComponent implements OnInit {
    private namespaces: PaginatedResult<Namespace> = new PaginatedResult<Namespace>();
    private paginationParameter: PaginationParameter = new PaginationParameter(10, 1, 'name', '');
    private filter = new FormControl();
    private displayNamespaceDetails: boolean = false;
    private namespaceToModify: Namespace;
    private loading: boolean = true;
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

    private fetchNamespaces() {
        this.loading = true;
        this.namespaceService.getNamespaces(this.paginationParameter)
            .subscribe(namespaces => {
                    this.namespaces = namespaces;
                    if (!this._namespaceSelected) {
                        this._namespaceSelected = this.namespaces.result[0];
                        this.onClickNamespace(this._namespaceSelected);
                    }
                    this.loading = false;
                },
                error => {
                });
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => {
                this.loading = true;
                this.paginationParameter.page = 1;
                this.paginationParameter.filter = filter;
                return this.namespaceService.getNamespaces(this.paginationParameter);
            })
            .subscribe(namespaces => {
                    this.namespaces = namespaces;
                    this.loading = false;
                },
                error => {
                    this.filter.setValue('');
                    this.paginationParameter.filter = '';
                    this.listenFilter();
                }
            );
    }

    onClickDelete(namespace: Namespace): void {
        this.modalService.showModal({key: 'namespace.confirmDelete', variables: {namespaceName: namespace.name}},
            () => {
                if (this.paginationParameter.page > 1 && this.namespaces.resultCount === 1) {
                    this.paginationParameter.page--;
                }
                this.namespaceService.deleteNamespace(namespace)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'namespace.deleted',
                            variables: {namespaceName: namespace.name}
                        });
                        this.fetchNamespaces();
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
        this.fetchNamespaces();
    }

    onClickNamespace(namespace: Namespace): void {
        this._namespaceSelected = namespace;
        this.namespaceSelected.emit(namespace);
    }

    pageChanged($event): void {
        this.fetchNamespaces();
    }
}
