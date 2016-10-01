import {ApiKeyPair} from '../api-key-pair/api-key-pair';

class Local {
    email: string;
    valid: boolean;
    date: Date;

    constructor(local: any) {
        this.email = local.email;
        this.valid = local.valid;
        this.date = local.date;
    }
}

export class User {
    id: string;
    local: Local;
    lastAccess: Date;
    createdAt: Date;
    apiKeyPairs: Array<ApiKeyPair>;
    admin: boolean;

    constructor(user: any) {
        this.id = user._id;
        this.local = new Local(user.local);

        this.lastAccess = user.lastAccess;
        this.createdAt = user.createdAt;
        this.apiKeyPairs = [];
        if (user.apiKeyPairs) {
            user.apiKeyPairs.forEach(entry => {
                this.apiKeyPairs.push(new ApiKeyPair(entry));
            });
        }
        this.admin = user.admin;
    }

    isAdmin(): boolean {
        return this.admin;
    }
}
