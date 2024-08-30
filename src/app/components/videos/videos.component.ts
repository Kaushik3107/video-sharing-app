import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
})
export class VideosComponent implements OnInit {
  videos: any[] = [];

  constructor(private videoService: VideoService) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe({
      next: (videos) => {
        if (videos.length === 0) {
          console.warn('No videos found for this user.');
        } else {
          console.log('Videos fetched:', videos);
          this.videos = videos;
        }
      },
      error: (err) => {
        console.error('Error fetching videos:', err);
        // Handle the error, such as displaying a message to the user
      },
    });
  }
}
