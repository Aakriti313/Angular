import { Component} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent {
  isLogInFormVisible = true;
  isSignUpFormVisible = false;

  showLogInForm() {
    this.isLogInFormVisible = true;
    this.isSignUpFormVisible = false;
  }

  showSignUpForm() {
    this.isLogInFormVisible = false;
    this.isSignUpFormVisible = true;
  }

  hideForm(){
    this.isLogInFormVisible = false;
  }

  //Formulario
  constructor(private fb: FormBuilder) {}

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
    console.warn(this.logInForm.value);
  }
  onSubmitSignUp(){
    console.warn(this.signUpForm.value);
  }
}
