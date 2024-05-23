import { Component, ViewChild, ElementRef } from '@angular/core';
import Cropper from 'cropperjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef;
  @ViewChild('imageElement', { static: false }) imageElement!: ElementRef;
  imageUrl: string | undefined;
  cropper: Cropper | undefined;

  openCamera() {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      const video = this.videoElement.nativeElement;
      video.srcObject = stream;
      video.play();
    });
  }

  captureImage() {
    const video = this.videoElement.nativeElement;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageUrl = canvas.toDataURL('image/jpeg');
      this.initializeCropper();
    }
  }

  initializeCropper() {
    const image = this.imageElement.nativeElement;
    if (this.imageUrl) {
      image.src = this.imageUrl;
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
      });
    }
  }

  getCroppedImage() {
    if (this.cropper) {
      const croppedCanvas = this.cropper.getCroppedCanvas();
      const croppedImageUrl = croppedCanvas.toDataURL('image/jpeg');
      console.log('Cropped Image URL:', croppedImageUrl);
    }
  }
}
