import { User } from './../../classes/user/user';
import { UserService } from './../../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserPage implements OnInit {

  users: User[] = []

  constructor(private router: Router, private userService: UserService) {}

  async ngOnInit() {}

  // Use this method instead of 'ngOnInit' to make sure data gets updated after navigation
  async ionViewWillEnter() {
    const users = await this.userService.getUsersFromStorage()

    if (users.length === 0) this.users = await this.userService.loadDefaultUsersFromJSON()
    else this.users = users
  }

  goToAddUser() {
    this.router.navigateByUrl('/add-user')
  }

  goToUser(id: number) {
    this.router.navigateByUrl(`/user/${id}`)
  }

  editUser(id: number) {
    this.router.navigateByUrl(`/edit-user/${id}`)
  }

  async deleteUser(id: number) {
    await this.userService.deleteUserFromStorage(id)
    this.users = await this.userService.getUsersFromStorage()
  }

}
