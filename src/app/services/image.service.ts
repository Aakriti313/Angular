import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private selectedImageSubject = new BehaviorSubject<string | null>(null);
  selectedImage$ = this.selectedImageSubject.asObservable();

  constructor() {
    // Al inicializar el servicio, intenta recuperar la imagen seleccionada del localStorage
    const selectedImage = localStorage.getItem('selectedImage');
    if (selectedImage) {
      this.selectedImageSubject.next(selectedImage);
    }
  }

  setSelectedImage(image: string | null) {
    this.selectedImageSubject.next(image);
    // Almacena la imagen seleccionada en localStorage
    localStorage.setItem('selectedImage', image || ''); // Guarda una cadena vacía si la imagen es null
  }

  getSelectedImage(): string | null {
    return this.selectedImageSubject.getValue(); // Devuelve la última imagen seleccionada
  }
}
