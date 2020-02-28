import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs'
import { throws } from 'assert';

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  total: any = 0;
  counter = 0;
  private totalServiceBehavior = new BehaviorSubject(0);
  totalService = this.totalServiceBehavior.asObservable();

  private totalGameServiceBehavior = new BehaviorSubject(0);
  totalGameService = this.totalServiceBehavior.asObservable();

  arrOfGames = []
  set0fgames;


  constructor() { }

  goToSeriveToClearTotal(totalSingleGame) {
    this.totalGameServiceBehavior.next(totalSingleGame)
  }

  goT0Service(operation, price, i, count) {
    if (this.counter == 0) {
      this.total = 0;
    }
    this.counter++;

    if (operation == true) {
      this.total += price;
    }
    else {
      this.total -= price;
    }

    i.count = count;
    this.arrOfGames.push(i);
    this.set0fgames = new Set(this.arrOfGames);
    this.arrOfGames = [...this.set0fgames]

    if (count == 0) {
      for (let j = 0; j < this.arrOfGames.length; j++)
        if (i == this.arrOfGames[j]) {
          this.arrOfGames.splice(j, 1)

        }
    }
    console.log("heeeeey")
    console.log(this.arrOfGames)
    this.totalServiceBehavior.next(this.total);
  }

}
