import { Component } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  title: string = '';
  selectedFile: File | null = null;

  constructor(private videoService: VideoService, private router: Router) {}

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onUpload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('video', this.selectedFile);

    this.videoService.uploadVideo(formData).subscribe(
      () => {
        this.router.navigate(['/videos']);
      },
      (error) => {
        console.error('Upload failed', error);
        alert('Video upload failed');
      }
    );
  }
}
