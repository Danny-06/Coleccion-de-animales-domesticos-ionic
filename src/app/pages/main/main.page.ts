import { Router } from '@angular/router';
import { AnimalService } from './../../services/animal/animal.service';
import { Animal } from './../../classes/animal/animal';
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MainPage implements OnInit {

   // Drowpdown filter
   filterOptions: {name: string}[] = [
    {name: 'all'},
    {name: 'cat'},
    {name: 'dog'},
    {name: 'parrot'}
  ]

  @Input()
  filterSelected: string = this.filterOptions[0].name

  filterAnimals(): any {
    const type = this.filterSelected
    if (type === 'all') return this.animals = this.animalService.getAnimals()

    this.animals = this.animalService.getAnimals().filter(animal => animal.type === type)
  }

  constructor(private animalService: AnimalService, private router: Router) {}

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  async ngOnInit() {
    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    this.animals = animals
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
