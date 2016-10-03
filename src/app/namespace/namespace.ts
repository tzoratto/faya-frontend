export class Namespace {
    id: string;
    userId: string;
    name: string;
    description: string;

    constructor(namespace: any) {
        this.id = namespace._id;
        this.userId = namespace.user;
        this.name = namespace.name;
        this.description = namespace.description;
    }
}
