import {Component, OnInit} from '@angular/core';
import {ApiKeyPair} from './api-key-pair';
import {ModalService} from '../modal/modal.service';
import {ApiKeyPairService} from './api-key-pair.service';
import {MessageService} from '../message/message.service';

@Component({
    selector: 'faya-api-key-pair',
    templateUrl: 'api-key-pair.component.html',
    styleUrls: ['api-key-pair.component.css']
})
export class ApiKeyPairComponent implements OnInit {
    private apiKeyPairs: Array<ApiKeyPair> = [];

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
            .catch();
    }

    private fetchApiKeyPairs(): void {
        this.apiKeyPairService.getApiKeyPairs()
            .then(apiKeyPairs => {
                this.apiKeyPairs = apiKeyPairs;
            })
            .catch(error => {
            });
    }

    ngOnInit(): void {
        this.fetchApiKeyPairs();
    }
}
