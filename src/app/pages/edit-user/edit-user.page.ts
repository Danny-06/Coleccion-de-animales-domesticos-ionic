import { User } from './../../classes/user/user';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user/user.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class EditUserPage implements OnInit {

  user: User = {id: 0, name: '', details: '', favoriteAnimals: []}

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id')

    if (!id) return console.log(`Id wasn't found`)
    
    this.user = await this.userService.getUserFromStorage(+id)
  }

  async updateUser() {
    if (this.user.name === '') return
    await this.userService.updateUserFromStorage(this.user)

    this.router.navigateByUrl('user')
  }

}
