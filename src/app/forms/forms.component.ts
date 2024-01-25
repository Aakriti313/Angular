import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import { User } from '../clases/users';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})

export class FormsComponent {

  //Mostrar SignUpForm
  isLogInFormVisible = true;
  isSignUpFormVisible = false;
  
  showSignUpForm() {
    this.isLogInFormVisible = false;
    this.isSignUpFormVisible = true;
  }

  //Formularios
  constructor(private fb: FormBuilder, private userService: UserService) {}

  logInForm = this.fb.group({
    name_user: ['', Validators.required],
    password_user: ['', Validators.required],
  });

  signUpForm = this.fb.group({
      name_user: ['', Validators.required],
      surname_user: ['', Validators.required],
      nickname_user: ['', Validators.required],
      age_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.min(0), Validators.email]],
      phone_user: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password_user: ['', Validators.required],
      repeat_password_user: ['', Validators.required],
    });

  onSubmitLogIn(){
    if (this.logInForm.valid) {
      let username = this.logInForm.value.name_user as string;
      let password = this.logInForm.value.password_user as string;
  
      if (this.userService.logInValidation(username, password)) {
        this.isLogInFormVisible = false;
        this.isSignUpFormVisible = false;
        alert('Inicio de sesión');
        console.log(this.logInForm.value);
      } else {
        alert('Usuario o contraseña incorrectos.');
      }
    }
  }

  onSubmitSignUp(){
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.password_user === this.signUpForm.value.repeat_password_user) {
        let newUser = new User(
          this.signUpForm.value.name_user as string,
          this.signUpForm.value.surname_user as string,
          this.signUpForm.value.nickname_user as string,
          parseInt(this.signUpForm.value.age_user as string, 10) || 0,
          this.signUpForm.value.email_user as string,
          parseInt(this.signUpForm.value.age_user as string, 10) || 0,
          this.signUpForm.value.password_user as string
        );

        this.userService.addUser(newUser);

        console.log(this.signUpForm.value);
        this.isLogInFormVisible = true;
        this.isSignUpFormVisible = false;
      }else{
        alert("Las contraseñas no coinciden")
      }
    }else{
      alert("Formulario invalido")
    }
  }

  //Contraseña segura

}
