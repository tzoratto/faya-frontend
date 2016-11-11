import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';
import {FormControl} from '@angular/forms';
import {ModalService} from '../core/modal/modal.service';
import {MessageService} from '../core/message/message.service';


@Component({
    selector: 'faya-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    private users: Array<User> = [];
    private filter = new FormControl();

    constructor(private userService: UserService,
                private modalService: ModalService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.fetchUsers();
        this.listenFilter();
    }

    private fetchUsers(filter?: string) {
        this.userService.getUsers(filter)
            .subscribe(users => {
                    this.users = users;
                },
                error => {
                });
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => this.userService.getUsers(filter))
            .subscribe(users => this.users = users,
                error => this.listenFilter());
    }

    onClickDelete(user: User): void {
        this.modalService.showModal({key: 'account.confirmDelete', variables: {userEmail: user.local.email}},
            () => {
                this.userService.deleteUser(user)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'account.deleted',
                            variables: {userEmail: user.local.email}
                        });
                        this.fetchUsers(this.filter.value);
                    })
                    .catch(error => {});
            });
    }
}
