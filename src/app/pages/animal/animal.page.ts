import { Animal } from './../../classes/animal/animal';
import { AnimalService } from './../../services/animal/animal.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.page.html',
  styleUrls: ['./animal.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AnimalPage implements OnInit {

  animal: Animal = new Animal()

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private animalService: AnimalService) {}

  async ngOnInit() {

    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`ID is ${id}`)

    this.animal = animals.filter(animal => animal.id === +id)[0]
  }

  goTo(path: string) {
    this.router.navigateByUrl(path)
  }

}
