export class ApiKeyPair {
    keyId: string;
    keySecret: string;

    constructor(apiKeyPair: any) {
        this.keyId = apiKeyPair.keyId;
        this.keySecret = apiKeyPair.keySecret;
    }
}
