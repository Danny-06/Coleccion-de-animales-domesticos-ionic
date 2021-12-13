import { User } from './../../classes/user/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from './../../services/animal/animal.service';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})

export class UserDetailsPage implements OnInit {

  user: User = {id: -1, name: '', details: '', favoriteAnimals: []}

  animalIcons: { [key: string]: string } = {cat: '🐱', dog: '🐶', parrot: '🦜'}

  constructor(private userService: UserService, private animalService: AnimalService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    await this.animalService.loadAnimals()

    const id = this.activatedRoute.snapshot.paramMap.get('id')
    if (!id) throw new Error('User Id not found')

    const users = await this.userService.getUsersFromStorage();

    [this.user] = users.filter(u => u.id === +id)

    if (!this.user.details) this.user.details = 'User details is empty'
  }

  getUserAnimalCount() {
    const animals = this.animalService.getAnimals()
    const {favoriteAnimals} = this.user
    const userAnimals = favoriteAnimals.map(id => animals.filter(a => a.id === id)[0])

    const cats    = userAnimals.filter(a => a.type === 'cat').length
    const dogs    = userAnimals.filter(a => a.type === 'dog').length
    const parrots = userAnimals.filter(a => a.type === 'parrot').length
    
    return {cats, dogs, parrots}
  }

  goToAddFavoriteAnimal(id: number) {
    this.router.navigateByUrl(`/add-favorite-animal/${id}`)
  }

}
