export class Token {
    id: string;
    namespace: string;
    value: string;
    description: string;
    count: number;
    active: boolean;
    startsAt: Date;
    endsAt: Date;
    pool: number;
    createdAt: Date;
    updatedAt: Date;

    constructor(token?: any) {
        if (token) {
            this.id = token._id;
            this.namespace = token.namespace;
            this.value = token.value;
            this.description = token.description;
            this.count = token.count;
            this.active = token.active;
            this.startsAt = token.startsAt;
            this.endsAt = token.endsAt;
            this.pool = token.pool;
            this.createdAt = token.createdAt;
            this.updatedAt = token.updatedAt;
        }
    }
}
