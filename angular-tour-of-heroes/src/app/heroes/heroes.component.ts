import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { HEROES } from '../mock-heroes';
// being replace with hero service
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
	// keep this bc it initializes the hero object, which consists name and id
	// hero: Hero = {
	// 	id: 1,
	// 	name: "Windstorm"
	// };
	heroes = HEROES;

	selectedHero: Hero;

	
  constructor() { }

  ngOnInit() {
  }
	onSelect(hero: Hero): void {
		this.selectedHero = hero;
	}
}
