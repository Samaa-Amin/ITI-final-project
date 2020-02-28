import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../http-service.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  histroy;
  ownerHistory = [];
  places;
  owenerplace;
  owner;
  idPlace;

  options;
  ownerOptions = [];

  // ..............//
  optionCheck = false;
  OptionValid = true;
  fileData: File;
  OptionName: any = "";
  optionDesc: any = "";
  optionPrice: any = "";
  imageSrc = "http://placehold.it/200/200";
  // .........................///
  arrOfCats = [];
  id;
  editArr: any = [];
  constructor(private httpService: HttpServiceService, private router: Router) {
    this.owner = this.httpService.getData("owneruser");
    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;
      for (let place of this.places) {

        if (place.ownerId == this.owner.id) {
          this.owenerplace = place;
          break;
        }
      }

      this.httpService.gettingData().subscribe(data => {
        this.cats = data;
        for (let i of this.cats) {
          setTimeout(() => {
            this.id = document.getElementById(i.id);
            this.arrOfCats.push(this.id)
            // console.log(this.arrOfCats)
          }, 10)
        }

      })
      this.httpService.getHistroy().subscribe(data => {
        this.histroy = data;
        for (let i of this.histroy) {
          if (i.reservedGame[0].placeId == this.owenerplace.id) {
            this.ownerHistory.push(i);
          }
        }
        console.log("hiiiiiiiiiiiiistroy")
        console.log(data)
        console.log(this.ownerHistory)
      })

      this.httpService.gettingPtions().subscribe(data => {
        this.options = data;
        this.ownerOptions = [];
        for (let i of this.options) {
          this.editArr.push(false);
          if (i.placeId == this.owenerplace.id) {
            this.ownerOptions.push(i);
          }
        }

      })
    })
  }

  ngOnInit() {
  }
  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader;
    reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.imageSrc = reader.result;
      this.verfyingOption(this.OptionName, this.optionDesc, this.optionPrice, false)

    }
  }


  verfyingOption(OptionName, optionDesc, optionPrice, state = true) {
    if (state == true) {
      this.OptionName = OptionName.value;
      this.optionDesc = optionDesc.value;
      this.optionPrice = optionPrice.value;
    }
    if (this.OptionName.length > 0 && this.optionDesc.length > 0 && this.optionPrice.length > 0) {
      this.OptionValid = false;
    }
    else {
      this.OptionValid = true;
    }

  }

  //ha3mml el object
  submitiingEditedPlace() {
    this.optionCheck = false;
    let optionObj;
    let headers = { "Conetent-Type": "application/json" }
    optionObj = {
      "name": this.OptionName,
      "imgs": [
        "http://placehold.it/200/200"
      ],
      "desc": this.optionDesc,
      "price": this.optionPrice,
      "placeId": this.owenerplace.id,
      "img": this.imageSrc
    }

    this.httpService.postOptions(optionObj, headers).subscribe(data => {
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
      console.log(data)
      this.httpService.gettingPtions().subscribe(data => {
        this.options = data;
        this.ownerOptions = [];
        for (let i of this.options) {
          if (i.placeId == this.owenerplace.id) {
            this.ownerOptions.push(i);
          }
        }

      })
    })



  }

  addOption() {
    this.optionCheck = true;
  }

  deletinOption(id) {
    this.httpService.deleteOption(id).subscribe(data => {
      console.log(data)
      this.httpService.gettingPtions().subscribe(data => {
        this.options = data;
        this.ownerOptions = [];
        for (let i of this.options) {
          if (i.placeId == this.owenerplace.id) {
            this.ownerOptions.push(i);
          }
        }

      })
    })
  }

  // ..................TestBed................///
  // ..............place details....................///


  fileData2;
  imageSrc2 = "http://placehold.it/200/200";

  statusOwner;
  reservationOwner;
  kidsOwner;
  statusOwnerText;
  reservationOwnerText;
  kidsOwnerText;
  placename = "";
  placecontact = "";
  placeaddres = "";
  placelocation = "";
  checkbox = false; //byashof hal hoa owener wala la
  chechDiv = true;
  placeDesc: any = "";
  openStart: any = "";
  openEnd: any = "";
  cats;
  celectedArr = [];

  readURL2(event: any) {
    this.fileData2 = <File>event.target.files[0];
    this.preview();
  }
  preview2() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    let reader;
    reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.imageSrc2 = reader.result;
      this.verfyingPlcae(this.placename, this.placelocation, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
    }
  }

  gettingStatus(val) {
    this.statusOwner = val.srcElement.attributes.value.value;
    this.statusOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placelocation, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }
  gettingReservation(val) {
    this.reservationOwner = val.srcElement.attributes.value.value;
    this.reservationOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placelocation, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)

  }
  gettingKidsArea(val) {
    this.kidsOwner = val.srcElement.attributes.value.value;
    this.kidsOwnerText = val.target.text;
    this.verfyingPlcae(this.placename, this.placelocation, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }


  selectingCats() {
    this.celectedArr = [];
    for (let i of this.arrOfCats) {
      if (i.checked == true) {
        this.celectedArr.push(i.id)
      }
    }
    console.log(this.celectedArr)
    this.verfyingPlcae(this.placename, this.placelocation, this.placecontact, this.placeaddres, this.placeDesc, this.openStart, this.openEnd, false)
  }

  verfyingPlcae(placeNName, contact, address, location, desc, openHoursEnd, openHoursStart, state = true) {
    if (state == true) {
      this.placename = placeNName.value;
      this.placelocation = location.value;
      this.placecontact = contact.value;
      this.placeaddres = address.value;
      this.placeDesc = desc.value;
      this.openStart = openHoursStart.value;
      this.openEnd = openHoursEnd.value;
    }
    // && this.imageSrc != "not yet"
    if (this.placename.length > 0 && this.placelocation.length > 0
      && this.placecontact.length > 0 && this.placeaddres.length > 0 && this.placeDesc.length > 0
      && this.openStart.length > 0 && this.celectedArr.length != 0 && this.celectedArr.length <= 3 && this.openEnd
      && this.statusOwner && this.reservationOwner && this.kidsOwner) {
      console.log("finaaaaaaally")
      this.chechDiv = true;
    }
    else {
      this.chechDiv = false;
      console.log("still no");

    }

  }
  placeObj;
  // ........................t7der object el place...................//

  addPlaceToThisOwner() {

    let headers = { "Conetent-Type": "application/json" }
    this.placeObj = {
      "name": this.placename,
      "catId": this.celectedArr,
      "address": this.placeaddres,
      "location": this.placelocation,
      "rates": [1, 2, 3, 4, 5],
      "paymentMethod": "Ticket",
      "avgrate": 5,
      "mainImage": this.imageSrc,
      "imgs": [
        "https://www.shorouknews.com/uploadedimages/Other/original/masrah.jpg",
        "https://image.shutterstock.com/image-illustration/theater-masks-drama-comedy-red-260nw-718511797.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQUKz1NJwH13z3qGk2sRFbgZBaTB-pSqxyKNWe87bDDld0DpXnu"
      ],
      "status": this.statusOwner,
      "openHours": this.openStart + "to" + this.openEnd,
      "desc": this.placeDesc,
      "reservation": this.reservationOwner,
      "kid-friendly": this.kidsOwner,
      "contact": {
        "phone": this.placecontact,
        "facebook": "",
        "instagram": ""
      },
      "ownerId": this.owner.id
    }

    this.idPlace = this.owenerplace.id;
    this.httpService.PutPlaces(this.idPlace, this.placeObj, headers).subscribe(data => {
      console.log("shatreeeeeeeeeeeeeeeen eee7na el 3 ")

      console.log(data);
      this.router.navigate(["/place", this.idPlace])
    })

  }
  canseliing() {
    this.optionCheck = false;
  }


  ///edit option
  allowAddEdit = false;

  editOption(ii, id) {
    this.editArr[ii] = true;
  }

  canselingEditOption(ii) {
    this.editArr[ii] = false
  }
  checkingAllowAddEdited(id) {
    let input;
    input = Array.from(document.getElementsByClassName(id))
    if (input[0].value.length > 0 && input[1].value.length > 0 && input[2].value.length > 0) {
      this.allowAddEdit = true;
    }
    else {
      this.allowAddEdit = false;
    }
  }
  addingEdtedOption(i, ii, id) {
    let input;
    input = Array.from(document.getElementsByClassName(id))
    console.log(input)
    console.log(input[0].value)
    console.log(input[1].value)
    console.log(input[2].value)
    this.editArr[ii] = false;

    ////a7der elobject
    let headers = { "Conetent-Type": "application/json" }
    let obj;
    obj = {
      "id": i.id,
      "name": input[0].value,
      "imgs": [
        "http://placehold.it/200/200"
      ],
      "desc": input[1].value,
      "longDesc": "You are locked up in a strange room  Explore the room, find hidden items and solve riddles.Then you will be able to escape from the room.Let's escape!",
      "price": input[2].value,
      "placeId": this.owenerplace.id,
      "img": "http://placehold.it/200/200"
    }
    this.httpService.PutOptions(id, obj, headers).subscribe(data => {
      console.log("shatraaa ya esraaaaa")
      console.log(data);
      this.httpService.gettingPtions().subscribe(data => {
        this.options = data;
        this.ownerOptions = [];
        for (let i of this.options) {
          if (i.placeId == this.owenerplace.id) {
            this.ownerOptions.push(i);
          }
        }

      })

    })



  }
}
