import { Animal } from './../../classes/animal/animal';
import { RequestService } from './../request/request.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private req: RequestService) {}

  animals: Animal[] = []

  async loadAnimals(): Promise<Animal[]> {
    return this.animals = await this.req.fetch('assets/animals.json', 'json') as Animal[]
  }

  getAnimals(): Animal[] {
    return this.animals
  }
}
