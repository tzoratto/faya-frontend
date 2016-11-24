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
            this.startsAt = token.startsAt ? new Date(token.startsAt) : null;
            this.endsAt = token.endsAt ? new Date(token.endsAt) : null;
            this.pool = token.pool;
            this.createdAt = token.createdAt;
            this.updatedAt = token.updatedAt;
        }
    }

    isValid(): boolean {
        if (this.active) {
            let currentDate = new Date();
            let respectStartDate = !this.startsAt || this.startsAt < currentDate;
            let respectEndDate = !this.endsAt || this.endsAt > currentDate;
            let respectPool = this.pool === undefined || this.pool === null || this.pool > 0;
            return !!(respectStartDate && respectEndDate && respectPool);
        }
        return false;
    }
}
