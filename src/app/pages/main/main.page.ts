import { Router } from '@angular/router';
import { AnimalService } from './../../services/animal/animal.service';
import { Animal } from './../../classes/animal/animal';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class MainPage implements OnInit {

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
