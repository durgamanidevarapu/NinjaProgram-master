import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as alertify from 'alertify.js';
import { slideInAnimation } from '../app/app.animation';
import { RegistrationDetails } from './../../auth/registration/registration-details';
import { AccessVerifier } from './../../helpers/access.verifier';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
  animations: [slideInAnimation]
})
export class UsersListComponent implements OnInit {
  showForm = false;
  pageTitle = 'Users List';
  saved = false;
  @ViewChild('filterbox') inputText: ElementRef;
  userToBeUptaded: RegistrationDetails = {} as RegistrationDetails;
  users: RegistrationDetails[] = [];
  filter: string;
  filteredUsers: RegistrationDetails[];
  get listFilter(): string {
    return this.filter;
  }

  set listFilter(value: string) {
    this.filter = value;
    this.filteredUsers = this.filter ? this.filterUsers(this.filter) : this.users;
  }
  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    const accessVerifier = new AccessVerifier();
    const currentUser = this.userService.currentUserValue;
    const hasAccess = accessVerifier.verifyRole(currentUser.role);
    if (!hasAccess) {
      this.router.navigate(['/accessDenied']);
    }
    this.userService.getAllUsers().subscribe(
      result => {
        this.users = result;
        this.filteredUsers = this.users;
      },
      error => alert(error)
    );
  }

  filterUsers(filterBy: string): RegistrationDetails[] {
    return this.users.filter((user: RegistrationDetails) => user.username.toLocaleLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
  }

  onEdit(user: RegistrationDetails): void {
    this.showForm = true;
    this.userToBeUptaded = user;
  }
  onCancel(message: string): void {
    if (message === 'Save') {
      alertify.alert('Saved Successfully');
      this.saved = true;
      this.ngOnInit();
    }
    this.showForm = false;
  }
  onDelete(user: RegistrationDetails): void {
    if (user && user.id) {
      this.showForm = false;
      this.userService.deleteUser(user.id).subscribe(
        result => {
          this.ngOnInit();
        },
        error => console.log(error)
      );
    }
  }
}
