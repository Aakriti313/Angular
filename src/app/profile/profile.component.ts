import { Component, ElementRef } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../clases/users';
import { IsLogued } from '../services/logued.service';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any;
  isEditable: boolean = false;
  selectedImage: string | null = '';
  //Datos user
  datos = JSON.parse(localStorage.getItem("currentUser")||"{}");

  constructor(
    private fb: FormBuilder, 
    private post: PostService, 
    private el:ElementRef,
    private themeService: ThemeService,
    private log : IsLogued) {
    this.userData = [];
    this.themeService.isDarkMode$.subscribe(isDarkMode => {
          this.isDarkMode = isDarkMode;
        });
  }

  UserForm = this.fb.group({
    name_user: [{value: '', disabled: !this.isEditable}, Validators.required],
    surname_user: [{value: '', disabled: !this.isEditable}, Validators.required],
    nickname_user: [{value: '', disabled: !this.isEditable}, Validators.required],
    age_user: [{value: '', disabled: !this.isEditable}, Validators.required],
    email_user: [{value: '', disabled: !this.isEditable}, [Validators.required, Validators.email]],
    phone_user: [{value: '', disabled: !this.isEditable}, Validators.required],
    password_user: [{value: '', disabled: !this.isEditable}, Validators.required],
  });

  ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    this.selectedImage = localStorage.getItem('selectedImage_' + currentUser.nickname_user);
    console.log('Perfil',currentUser);

      // Verificar si hay una imagen seleccionada en el almacenamiento local
    const storedImage = localStorage.getItem('selectedImage');
    if (storedImage) {
      this.selectedImage = storedImage;
    }

    this.scrollToView();

    this.themeService.isDarkMode$.subscribe(isDarkMode => {
      this.isDarkMode = isDarkMode;
      this.buttonText = isDarkMode ? 'Modo claro' : 'Modo oscuro';
    });
  }
  
  scrollToView(){
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
  }

  edit() {
    this.isEditable = true;
    this.UserForm.enable();
  }

  save() {
    const updatedUserData = this.UserForm.value;
    this.post.updateUser(updatedUserData).subscribe(
        (result) => {
            console.log('Datos actualizados correctamente:', result);
            // Actualizamos los datos locales del usuario
            this.datos = { ...this.datos, ...updatedUserData };
            localStorage.setItem("currentUser", JSON.stringify(this.datos));
            this.isEditable = false;
            this.UserForm.disable();
        },
        (error) => {
            console.error('Error al actualizar los datos:', error);
        }
    );
  }

  logOut(){
    this.log.setIsLogued(false);
  }

  delete(){
    let currentUser:User = JSON.parse(localStorage.getItem("currentUser")||JSON.stringify(new User()));
    console.log(currentUser)

    this.post.deleteUser(currentUser.nickname_user||"").subscribe((result) => {console.log(result)});
  }

  isDarkMode: boolean = false;
  buttonText: string = 'Modo claro';

  onMouseEnter() {
    this.buttonText = this.isDarkMode ? 'Modo claro' : 'Modo oscuro';
  }

  onMouseLeave() {
    this.buttonText = this.isDarkMode ? 'Modo oscuro' : 'Modo claro';
  }

  toggleDarkMode() {
    this.themeService.toggleTheme(!this.isDarkMode);
  }
}
