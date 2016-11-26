import {Component, OnInit} from '@angular/core';
import {ApiKeyPair} from './api-key-pair';
import {ApiKeyPairService} from './api-key-pair.service';
import {ModalService} from '../core/modal/modal.service';
import {MessageService} from '../core/message/message.service';

@Component({
    selector: 'faya-api-key-pair',
    templateUrl: 'api-key-pair.component.html',
    styleUrls: ['api-key-pair.component.css']
})
export class ApiKeyPairComponent implements OnInit {
    private apiKeyPairs: Array<ApiKeyPair> = [];
    private loading: boolean = true;

    constructor(private modalService: ModalService,
                private apiKeyPairService: ApiKeyPairService,
                private messageService: MessageService) {

    }

    onClickDelete(apiKeyPair: ApiKeyPair): void {
        this.modalService.showModal({key: 'account.apiKeyPairConfirmDelete', variables: {apiKeyId: apiKeyPair.keyId}},
            () => {
                this.apiKeyPairService.deleteApiKeyPair(apiKeyPair)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'account.apiKeyPairDeleted',
                            variables: {apiKeyId: apiKeyPair.keyId}
                        });
                        this.fetchApiKeyPairs();
                    })
                    .catch(error => {});
            });
    }

    onClickCreate(): void {
        this.apiKeyPairService.createApiKeyPair()
            .then(apiKeyPair => {
                this.messageService.clearAlert().addAlertAndTranslate({
                    key: 'account.apiKeyPairCreated',
                    variables: {apiKeyId: apiKeyPair.keyId, apiKeySecret: apiKeyPair.keySecret}
                }, 'success', 0);
                this.fetchApiKeyPairs();
            })
            .catch(error => {});
    }

    private fetchApiKeyPairs(): void {
        this.loading = true;
        this.apiKeyPairService.getApiKeyPairs()
            .then(apiKeyPairs => {
                this.apiKeyPairs = apiKeyPairs;
                this.loading = false;
            })
            .catch(error => {
                this.loading = false;
            });
    }

    ngOnInit(): void {
        this.fetchApiKeyPairs();
    }
}
