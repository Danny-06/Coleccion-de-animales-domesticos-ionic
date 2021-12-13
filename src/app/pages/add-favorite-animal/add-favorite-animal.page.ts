import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { AnimalService } from './../../services/animal/animal.service';
import { User } from './../../classes/user/user';
import { Animal } from './../../classes/animal/animal';
import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'app-add-favorite-animal',
  templateUrl: './add-favorite-animal.page.html',
  styleUrls: ['./add-favorite-animal.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class AddFavoriteAnimalPage implements OnInit {

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

  user: User = {id: -1, name: '', details: '', favoriteAnimals: []}

  animals: Animal[] = []

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(private animalService: AnimalService, private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) throw new Error(`Id couldn't be found`)

    this.user = await this.userService.getUserFromStorage(+id)


    const animals = await this.animalService.loadAnimals()

    animals.forEach(animal => {
      if (!animal.shortDescription) animal.shortDescription = 'Short Description no available' 
      if (!animal.description) animal.description = 'Description no available'
    })

    this.animals = animals
  }

  toggleFavoriteAnimal(id: number) {
    const {favoriteAnimals} = this.user
    if (favoriteAnimals.includes(id)) this.user.favoriteAnimals = favoriteAnimals.filter(idA => idA !== id)
    else favoriteAnimals.push(id)

    this.userService.updateUserFromStorage(this.user)
  }

  isFavoriteAnimal(id: number): boolean {
    return this.user.favoriteAnimals.includes(id)
  }

}
