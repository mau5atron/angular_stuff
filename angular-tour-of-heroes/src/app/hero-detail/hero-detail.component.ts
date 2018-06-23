import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero'; 
import { HeroService } from '../hero.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
	@Input() hero: Hero;

  constructor(
  	private route: ActivatedRoute,
  	private heroService: HeroService,
  	private location: Location
  ) { }

  ngOnInit(): void {
  	this.getHero();
  }

  getHero(): void {
  	const id = +this.route.snapshot.paramMap.get('id');

  	this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
  	this.location.back();	
  }

  save(): void {
    this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
  }

  // Updates the hero on the server 
  updateHero (hero: Hero): Observable<any>{
    return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updatedHero'))
    );
  }

}
