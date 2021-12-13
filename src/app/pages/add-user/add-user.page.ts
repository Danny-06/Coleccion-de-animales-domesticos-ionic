import { Router } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { User } from './../../classes/user/user';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AddUserPage implements OnInit {

  user: User = {id: 0, name: '', details: '', favoriteAnimals: []}

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {}

  async addUser() {
    if (this.user.name === '') return

    this.user.id = await this.getMaxUserId() + 1

    await this.userService.addUserToStorage(this.user)

    this.router.navigateByUrl('user')
  }

  async getMaxUserId(): Promise<number> {
    const users = await this.userService.getUsersFromStorage()

    if (users.length === 0) return -1

    const usersID = users.map(user => user.id)

    return Math.max(...usersID)
  }

}
