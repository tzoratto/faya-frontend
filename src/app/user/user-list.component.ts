import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';
import {FormControl} from '@angular/forms';
import {ModalService} from '../core/modal/modal.service';
import {MessageService} from '../core/message/message.service';
import {PaginatedResult} from '../utils/paginated-result';
import {PaginationParameter} from '../utils/pagination-parameter';


@Component({
    selector: 'faya-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    private users: PaginatedResult<User> = new PaginatedResult<User>();
    private paginationParameter: PaginationParameter = new PaginationParameter(20, 1, '', '');
    private filter = new FormControl();
    private loading: boolean = true;

    constructor(private userService: UserService,
                private modalService: ModalService,
                private messageService: MessageService) {

    }

    ngOnInit(): void {
        this.fetchUsers();
        this.listenFilter();
    }

    private fetchUsers() {
        this.loading = true;
        this.userService.getUsers(this.paginationParameter)
            .subscribe(users => {
                    this.users = users;
                    this.loading = false;
                },
                error => {
                });
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => {
                this.loading = true;
                this.paginationParameter.page = 1;
                this.paginationParameter.filter = filter;
                return this.userService.getUsers(this.paginationParameter);
            })
            .subscribe(users => {
                    this.users = users;
                    this.loading = false;
            },
                error => {
                    this.filter.setValue('');
                    this.paginationParameter.filter = '';
                    this.listenFilter();
                });
    }

    onClickDelete(user: User): void {
        this.modalService.showModal({key: 'account.confirmDelete', variables: {userEmail: user.local.email}},
            () => {
                if (this.paginationParameter.page > 1 && this.users.resultCount === 1) {
                    this.paginationParameter.page--;
                }
                this.userService.deleteUser(user)
                    .then(() => {
                        this.messageService.clearAlert().addAlertAndTranslate({
                            key: 'account.deleted',
                            variables: {userEmail: user.local.email}
                        });
                        this.fetchUsers();
                    })
                    .catch(error => {});
            });
    }

    pageChanged($event): void {
        this.fetchUsers();
    }
}
