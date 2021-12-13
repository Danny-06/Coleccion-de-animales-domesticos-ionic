import { User } from './../../classes/user/user';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private req: RequestService) {}

  async addUserToStorage(user: User) {
    const users = await this.getUsersFromStorage()
    users.push(user)

    const usersStringify = JSON.stringify(users)

    await Storage.set({
      key: 'users',
      value: usersStringify
    })
  }

  async getUserFromStorage(id: number): Promise<User> {
    const users = await this.getUsersFromStorage()
    return users.filter(user => user.id === id)[0]
  }


  async getUsersFromStorage(): Promise<User[]> {
    const storageResult = await Storage.get({key: 'users'})
    const usersStringify = storageResult.value ?? '[]'
    const users = JSON.parse(usersStringify)

    return users
  }

  async loadDefaultUsersFromJSON(): Promise<User[]> {
    const users = await this.req.fetch('assets/default-users.json', 'json') as User[]
    const usersStringify = JSON.stringify(users)
    await Storage.set({
      key: 'users',
      value: usersStringify
    })

    return users
  }

  async updateUserFromStorage(user: User) {
    const {id} = user
    const users = await this.getUsersFromStorage()

    const updatedUsers = users.map(u => u.id !== id ? u : user)
    const updatedUsersStringify = JSON.stringify(updatedUsers)

    await Storage.set({
      key: 'users',
      value: updatedUsersStringify
    })
  }

  async deleteUserFromStorage(id: number) {
    const users = await this.getUsersFromStorage()
    const filteredUsers = users.filter(user => user.id !== id)
    const filteredUsersStringify = JSON.stringify(filteredUsers)

    await Storage.set({
      key: 'users',
      value: filteredUsersStringify
    })
  }

}
