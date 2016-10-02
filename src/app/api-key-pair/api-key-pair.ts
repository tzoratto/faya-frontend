export class ApiKeyPair {
    id: string;
    keyId: string;
    keySecret: string;

    constructor(apiKeyPair: any) {
        this.id = apiKeyPair._id;
        this.keyId = apiKeyPair.keyId;
        this.keySecret = apiKeyPair.keySecret;
    }
}
