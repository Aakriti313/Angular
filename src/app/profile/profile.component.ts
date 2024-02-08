import { Component, ElementRef } from '@angular/core';
import { GetService } from "../services/get.service";
import { PostService } from '../services/post.service';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  userData: any;
  isEditable: boolean = false;

  constructor(private fb: FormBuilder, private _GetService: GetService, private postService: PostService, private el:ElementRef) {
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

  edit() {
    this.isEditable = true;
    this.UserForm.enable();
  }

  save() {
    this.postService.updateUser(this.userData).subscribe((result ) => {
      console.log('Datos actualizados correctamente:', result);
      this.isEditable = false;
      this.UserForm.disable();
    },
    (error) => {
      console.error('Error al actualizar los datos:', error);
    });
  }

  ngOnInit(): void {
    this._GetService.getUsersInfo().subscribe((data: any) => {
      this.userData = data;
      this.UserForm.patchValue(data);
    });
    //Scroll
    this.scrollToView();
  }
  
  scrollToView(){
    this.el.nativeElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest"});
  }
}
