import { Component, ElementRef } from '@angular/core';
import { GetService } from '../services/get.service';
import { PostService } from '../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../clases/users';
import { ImageService } from '../services/image.service';
import { IsLogued } from '../services/logued.service';


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
    private imageService: ImageService,
    private fb: FormBuilder, 
    private get: GetService, 
    private post: PostService, 
    private el:ElementRef,
    private log : IsLogued) {
    this.userData = [];
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
    this.get.getUsersInfo().subscribe((data: any) => {
      this.userData = data;
      this.UserForm.patchValue(data);
    });
    
    //Scroll
    this.scrollToView();

    //Mostrar imagen seleccionada
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
    this.selectedImage = localStorage.getItem('selectedImage_' + currentUser.nickname);
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
  
}
