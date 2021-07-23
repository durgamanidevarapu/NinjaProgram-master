import { HomeComponent } from './../../components/home/home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import * as Rx from 'rxjs';
import { UserService } from './../../services/user.service';
import { LoginComponent } from './login.component';
import { User } from './user';
import { Router } from '@angular/router';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          {
              path: '',
              component: HomeComponent
          }
      ]),
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [LoginComponent, HomeComponent],
      providers: [
        UserService
       ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    spyOn(window.console, 'log');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onSubmit should print a  message in console', fakeAsync(() => {
    const user: User = {
      username: '',
      role: '',
      token: ''
    };
    const form = {
      value: {
        username: 'test',
        password: 'test'
      },
      valid: true
    } as NgForm;
    const service = fixture.debugElement.injector.get(UserService);
    spyOn(service, 'authenticate').and.callFake(() => {
      return Rx.of(user);
    });
    component.onSubmit(form);
    expect(component.loading).toEqual(true);
    expect(console.log).toHaveBeenCalled();
  }));

  it('onLoginError should change errorMessage Property', fakeAsync(() => {
    const errorResponse = {
      status: 401
    };
    component.onLoginError(errorResponse);
    expect(component.loginErrorMessage).toBe('Invalid Credentials....Please try again!!!');
  }));
  it('onLoginError should change loginError Property to true', fakeAsync(() => {
    const errorResponse = {
      status: 401
    };
    component.onLoginError(errorResponse);
    expect(component.loginError).toBe(true);
  }));
});
