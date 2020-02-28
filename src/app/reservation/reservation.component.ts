import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  selctedHour: any = [];
  user;
  selectedGames = []
  total;
  // ........//
  selectedClasses;
  createdArray = [];
  allowTosubmit = false;
  visaNumber = "";
  visaPassword = "";


  constructor(private service: HttpServiceService, private router: Router) {

    this.user = this.service.getData("user");
    this.selectedGames = this.service.getData("choosenGames");
    this.total = this.service.getData("finalTotal");



    localStorage.removeItem("finalTotal");
    localStorage.removeItem("choosenGames");

    for (let i of this.selectedGames) {
      let obj = {
        id: i.id,
        name: i.name,
        price: i.price,
        desc: i.desc,
        count: i.count,
        placeId: i.placeId,
        img: i.img,
        hours: "0",
        date: "0"
      }
      this.selctedHour.push("select Time")
      this.createdArray.push(obj)

    }


  }


  ngOnInit() {
    // this.selectedGames = []

  }

  getDate(val, i) {

    this.createdArray[i].date = val.srcElement.value;
    this.checking()

  }

  gettingHours(val, i) {

    this.selctedHour[i] = val.target.text;
    this.createdArray[i].hours = val.target.text;
    this.checking()

  }

  handlinSubmit() {


    let headers = { "Conetent-Type": "application/json" }
    let body = {
      "userId": this.user.id,
      "totalPrice": this.total,
      "visaNumber": this.visaNumber,
      "reservedGame": this.createdArray
    }
    this.service.postHistory(body, headers).subscribe(data => {
      console.log(data)
      this.router.navigate(["/"]);

    })


  }




  checking() {
    for (let item of this.createdArray) {
      if (item.hours == "0" || item.date == "0") {
        return;
      }
    }

    if (this.visaNumber.length == 12 && this.visaPassword.length == 4
      && this.visaCVY.length == 3 && this.visaExpiredDate.length > 1) { this.allowTosubmit = true; }
    else {
      this.allowTosubmit = false;
    }

  }

  gettingvisaNumber(val) {
    this.visaNumber = val.target.value;
    this.checking()
  }
  visaCVY = "";
  visaExpiredDate = "";

  gettingCVY(val) {
    this.visaCVY = val.target.value;
    this.checking()
  }
  gettingExpiredDate(val) {
    this.visaExpiredDate = val.target.value;
    this.checking()
  }

  gettingvisaPassword(val) {
    this.visaPassword = val.target.value;
    this.checking()
  }
}