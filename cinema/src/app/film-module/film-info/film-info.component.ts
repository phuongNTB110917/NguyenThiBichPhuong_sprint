import {Component, OnInit} from '@angular/core';
import {FilmService} from '../service/film.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Film} from '../../model/film';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-film-info',
  templateUrl: './film-info.component.html',

  styleUrls: ['./film-info.component.css']
})
export class FilmInfoComponent implements OnInit {

  film: Film;

  otherFilm: Film[] = [];


  constructor(private filmService: FilmService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = Number(paramMap.get('id'));
      console.log(id);
      this.filmService.getInfoFilmById(id).subscribe(next => {
        console.log(next);
        this.film = next;
      });
    });
    this.getSomeOtherFilm();
    console.log(this.otherFilm);
  }

  getSomeOtherFilm(): void {

    for (let i = 1; i < 3; i++) {
      this.filmService.getInfoFilmById(i).subscribe(next => {
        this.otherFilm.push(next);
      });
    }
  }

  ngOnInit(): void {


    // this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
    //   const id = paramMap.get("id");
    //   console.log(id);
    //   this.filmService.getInfoFilmById(Number(id)).subscribe(next => {
    //     this.film = next;
    //     console.log(next)
    //   })
    // })
  }

  // closeYt() {
  //   console.log(this.player.nativeElement.attributes)
  // }

  closeYt = () => {
    const videos = document.querySelectorAll('iframe, video');
    // tslint:disable-next-line:only-arrow-functions
    Array.prototype.forEach.call(videos, function(video) {
      if (video.tagName.toLowerCase() === 'video') {
        video.pause();
      } else {
        const src = video.src;
        video.src = src;
      }
    });
  }

}
