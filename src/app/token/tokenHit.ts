export class TokenHit {
    id: string;
    token: string;
    ip: string;
    date: Date;
    userAgent: string;
    response: boolean;

    constructor(tokenHit?: any) {
        if (tokenHit) {
            this.id = tokenHit._id;
            this.token = tokenHit.token;
            this.ip = tokenHit.ip;
            this.date = tokenHit.date ? new Date(tokenHit.date) : null;
            this.userAgent = tokenHit.userAgent;
            this.response = tokenHit.response;
        }
    }
}
