import {Component, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {User} from './user';
import {FormControl} from '@angular/forms';


@Component({
    selector: 'faya-user-list',
    templateUrl: 'user-list.component.html',
    styleUrls: ['user-list.component.css']
})
export class UserListComponent implements OnInit {
    private users: Array<User> = [];
    private filter = new FormControl();

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
        this.userService.getUsers()
            .subscribe(users => {
                this.users = users;
            },
            error => {});
        this.listenFilter();
    }

    listenFilter(): void {
        this.filter.valueChanges
            .debounceTime(400)
            .distinctUntilChanged()
            .switchMap(filter => this.userService.getUsers(filter))
            .subscribe(users => this.users = users,
                error => this.listenFilter());
    }
}
