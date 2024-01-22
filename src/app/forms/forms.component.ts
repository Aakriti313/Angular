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
    user_nombre: ['', Validators.required],
    user_password: ['', Validators.required],
  });

  signUpForm = this.fb.group({
      user_nombre: ['', Validators.required],
      user_apellido: ['', Validators.required],
      user_nickname: ['', Validators.required],
      user_edad: ['', Validators.required],
      user_email: ['', [Validators.required, Validators.min(0), Validators.email]],
      user_telefono: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      user_password: ['', Validators.required],
      repeat_password: ['', Validators.required],
    });

  onSubmitLogIn(){
    if (this.logInForm.valid) {
      let username = this.logInForm.value.user_nombre as string;
      let password = this.logInForm.value.user_password as string;
  
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
      if (this.signUpForm.value.user_password === this.signUpForm.value.repeat_password) {
        let newUser = new User(
          this.signUpForm.value.user_nombre as string,
          this.signUpForm.value.user_apellido as string,
          this.signUpForm.value.user_nickname as string,
          parseInt(this.signUpForm.value.user_edad as string, 10) || 0,
          this.signUpForm.value.user_email as string,
          parseInt(this.signUpForm.value.user_edad as string, 10) || 0,
          this.signUpForm.value.user_password as string
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
