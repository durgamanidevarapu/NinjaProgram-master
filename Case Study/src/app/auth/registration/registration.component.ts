import { UserService } from './../../services/user.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RegistrationDetails } from './registration-details';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInAnimation } from '../../components/app/app.animation';

function passwordValidator(c: FormControl): { [key: string]: boolean } | null {
  if (c.value) {
    const regEx = new RegExp(/^[a-zA-Z0-9](.*)/);
    if (!regEx.test(c.value)) {
      return { specialcharacter: true };
    }
  }
  return null;
}
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  animations: [slideInAnimation]
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  roles = ['Admin', 'User'];
  cardTitle: string;
  btnText: string;
  @Input() registrationDetails: RegistrationDetails = {} as RegistrationDetails;
  @Output() closeCard: EventEmitter<string> = new EventEmitter<string>();
  width: number;
  marginLeft: number;
  editMode = false;
  registrationError = false;
  registrationErrorMessage: string;
  loading = false;
  originalDetails: RegistrationDetails;
  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      id: [''],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      role: ['']
    });
    this.originalDetails = { ...this.registrationDetails };
    if (this.registrationDetails && this.registrationDetails.id != null && this.registrationDetails.id > 0) {
      this.editMode = true;
    }
    if (this.editMode) {
      this.cardTitle = 'Edit User';
      this.btnText = 'Save';
      this.width = 100;
      this.marginLeft = 0;
      this.registrationForm.setValue({
        username: this.registrationDetails.username,
        password: this.registrationDetails.password,
        role: this.registrationDetails.role,
        id: this.registrationDetails.id
      });
      this.registrationForm.get('password').clearValidators();
    }
    else {
      this.cardTitle = 'Register';
      this.btnText = 'Register';
      this.width = 50;
      this.marginLeft = 25;
    }
  }

  onRegistrationError(errorResponse): void {
    if (errorResponse.status === 400) {
      this.registrationErrorMessage = 'Username already exists!!!!';
    }
    else {
      this.registrationErrorMessage = 'Sorry.... Something went wrong!!!!';
    }
    this.registrationError = true;
    this.loading = false;
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.loading = true;
      this.registrationDetails = this.registrationForm.value;
      this.userService.addUser(this.registrationDetails).subscribe(
        result => {
          if (this.editMode === true) {
            this.closeCard.emit('Save');
          }
          else {
            this.router.navigate(['/login']);
          }
        },
        error => this.onRegistrationError(error)
      );
    }
  }

  onCancel(): void {
    this.closeCard.emit('Cancel');
  }
}
