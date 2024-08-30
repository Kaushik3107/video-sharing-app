import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
})
export class VideoPlayerComponent implements OnInit, OnDestroy {
  videoTitle: string = '';
  videoUrl: string = '';
  private objectUrl: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private videoService: VideoService
  ) {}

  ngOnInit() {
    const videoId = this.route.snapshot.paramMap.get('id');

    if (videoId) {
      this.videoService.getVideos().subscribe((videos) => {
        const video = videos.find((v) => v._id === videoId);
        console.log(video);

        if (video) {
          this.videoTitle = video.title;
          this.videoService.streamVideo(videoId).subscribe((blob) => {
            this.objectUrl = window.URL.createObjectURL(blob);
            this.videoUrl = this.objectUrl;
          });
        }
      });
    }
  }

  ngOnDestroy() {
    if (this.objectUrl) {
      window.URL.revokeObjectURL(this.objectUrl);
    }
  }
}
