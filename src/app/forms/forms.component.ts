import { Component, ElementRef} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../clases/users';
import { PostService } from '../services/post.service';
import { IsLogued } from '../services/logued.service';
import { ImageService } from '../services/image.service';


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css',
})

export class FormsComponent {
  
  isLogInFormVisible = true;
  isSignUpFormVisible = false;
  
  isLogued :any;
  
  //Mostrar SignUpForm
  showSignUpForm() {
    this.isLogInFormVisible = false;
    this.isSignUpFormVisible = true;
  }

  //Formularios
  constructor(
    private imageService: ImageService,
    private router: Router,
    private fb: FormBuilder, 
    private postService: PostService, 
    private el: ElementRef, 
    private logued : IsLogued) {}

  logInForm = this.fb.group({
    nickname_user: ['', Validators.required],
    password_user: ['', Validators.required],
  });

  signUpForm = this.fb.group({
      image_user: ['', Validators.required],
      name_user: ['', Validators.required],
      surname_user: ['', Validators.required],
      nickname_user: ['', Validators.required],
      age_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.min(0), Validators.email]],
      phone_user: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]],
      password_user: ['', Validators.required],
      repeat_password_user: ['', Validators.required],
    });

    
  //LogIn
  onSubmitLogIn() {
    if (this.logInForm.valid) {
      let nickname = this.logInForm.value.nickname_user as string;
      let password = this.logInForm.value.password_user as string;

      let user: User = {
        nickname_user: nickname,
        password: password
      };

      this.postService.postUserLogIn(user).subscribe((result) => {
        console.log(result);
        if (result["message"] == "Inicio de sesión exitoso") {
          this.logued.setIsLogued(true);
          this.logued.setUserType(result["user"]["user_type"]);
          this.isLogInFormVisible = false;
          this.isSignUpFormVisible = false;
          localStorage.setItem('currentUser', JSON.stringify(result["user"]));
          localStorage.setItem('nickname_user', result["user"]["nickname_user"]);
          this.router.navigate(['/app-games']);

          // Recuperamos la imagen seleccionada del localStorage y la establecemos en el servicio ImageService
          const selectedImage = localStorage.getItem('selectedImage');
          if (selectedImage) {
            this.imageService.setSelectedImage(selectedImage);
          }
        } else if (result = "Usuario no encontrado") {
          alert(result);
        } else if (result = "Credenciales inválidas") {
          alert(result);
        }
      });
    }
  }

  //SignUp
  onSubmitSignUp(){
    if (this.signUpForm.valid) {
      if (this.signUpForm.value.password_user === this.signUpForm.value.repeat_password_user) {
        let newUser = new User(
          this.signUpForm.value.name_user as string,
          this.signUpForm.value.surname_user as string,
          this.signUpForm.value.nickname_user as string,
          parseInt(this.signUpForm.value.age_user as string, 10) || 0,
          this.signUpForm.value.email_user as string,
          parseInt(this.signUpForm.value.phone_user as string, 10) || 0,
          this.signUpForm.value.password_user as string,
        );
        
        this.postService.postUserSignUp(newUser).subscribe((result) => {console.log(result)});
        
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

  //Scroll
  ngOnInit(): void {
    this.scrollToView();
  }
  scrollToView(){
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest"});
  }

  //Show & select Avatars
  imagenes: string[] = [
    '../../assets/img/PerfilAvatar/BoyBlondeeBrown.png',
    '../../assets/img/PerfilAvatar/BoyBlondeePale.png',
    '../../assets/img/PerfilAvatar/BoyBrownBrown.png',
    '../../assets/img/PerfilAvatar/BoyBrownPale.png',
    '../../assets/img/PerfilAvatar/GirlBlondeeBrown.png',
    '../../assets/img/PerfilAvatar/GirlBlondeePale.png',
    '../../assets/img/PerfilAvatar/GirlBrownBrown.png',
    '../../assets/img/PerfilAvatar/GirlBrownPale.png',
  ]

  selectedImage: string | null = null;

  selectImage(image: string) {
    this.selectedImage = image;
    this.signUpForm.patchValue({
      image_user: image
    });
    this.imageService.setSelectedImage(image);
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    localStorage.setItem('selectedImage_' + currentUser.nickname_user, image); // Aquí se corrige la clave
  }
  

  getImagenStyle(imagen: string): any {
    return {
        'height': 'auto',
        'width': '100px',
        'cursor': 'pointer',
        'border': imagen === this.selectedImage ? '2px solid #9eccfa' : 'none',
        'border-radius': imagen === this.selectedImage ? '5px' : 'none',
        'padding-bottom': imagen === this.selectedImage ? '11px' : '11px',
        'box-shadow': imagen === this.selectedImage ? 'rgb(144, 200, 255) 0px 0px 15px' : 'none'
    };
}

}
