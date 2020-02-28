import { UsersService } from '../users.service';
import { Component, OnInit, ViewChild, ElementRef, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpServiceService } from '../http-service.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  checker: boolean = true;
  userData;
  myForm: FormGroup;
  loggedinheader = false;

  @ViewChild("owner", { static: true }) owenerCheck: ElementRef;

  OwnerData;
  checkerowner = true;
  ownerloggedinheader = false;
  getuserowner;
  loggedowner;
  userfromlocalowner;
  // ...................///

  getuser;
  logged;
  userfromlocal;

  // ..............place details....................///
  fileData;
  imageSrc = "not yet";

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

  // ........test cats.......///
  id;
  arrOfCats = [];
  celectedArr: any = [];
  owner2;


  // .................................///
  constructor(private formBuilder: FormBuilder, private service: UsersService, private router: Router, private httpService: HttpServiceService) {


    this.httpService.gettingData().subscribe(data => {
      this.cats = data;

    })

  }


  ngOnInit() {

    this.myForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],
      // confirmEmail: ['', [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/)]],
      confirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{5,}$/)]]
    })

    this.service.getUsers().subscribe(data => {
      this.userData = data;

    })
    console.log(this.userData);
    this.httpService.getownerdata().subscribe(data => {
      this.OwnerData = data;
    })


  }




  clickingCheckBox() {
    this.checkbox = this.owenerCheck.nativeElement.checked;
    if (this.checkbox == true) {
      for (let i of this.cats) {
        setTimeout(() => {
          this.id = document.getElementById(i.id);
          this.arrOfCats.push(this.id)
          // console.log(this.arrOfCats)
        }, 10)
      }
      this.chechDiv = false;
      console.log(this.chechDiv)
    } else {
      this.chechDiv = true;
    }

  }
  check(form: FormGroup) {
    // debugger
    for (let index = 0; index < this.userData.length; index++) {
      if (form.value.email === this.userData[index].email) {
        console.log(this.userData[index].email);
        this.checker = false;
        break;
      }
      else {
        this.checker = true;
      }
    }

    return this.checker;
  }
  checkOwner(form: FormGroup) {
    // debugger
    for (let index = 0; index < this.OwnerData.length; index++) {
      if (form.value.email === this.OwnerData[index].email) {
        console.log(this.OwnerData[index].email);
        this.checkerowner = false;
        break;
      }
      else {
        this.checkerowner = true;
      }
    }

    return this.checkerowner;
  }


  obj;
  onSubmit(form) {
    console.log(this.owenerCheck.nativeElement.checked)
    if (this.owenerCheck.nativeElement.checked == false) {
      if (this.check(form)) {
        this.obj = {
          "name": form.value.name,
          "email": form.value.email,
          "password": form.value.password,
          "image": "",
          "visa": 0
        }
        let headers = { "Conetent-Type": "application/json" }
        // this.service.addUsers(this.obj)
        this.httpService.paddUser(this.obj, headers).subscribe(data => {
          this.router.navigate(["/"])
          localStorage.clear();
          this.obj.password = "********"
          this.httpService.setData("user", this.obj)
          this.httpService.setData("loggedin", true);
          this.loggedinheader = true;
          this.httpService.displayProfileIcon(this.loggedinheader)
          // ..............................//
          this.httpService.gettingUsers().subscribe(data => {
            this.getuser = data;
            console.log(this.getuser)
            this.logged = this.httpService.getData("loggedin")
            this.userfromlocal = this.httpService.getData("user")
            if (this.logged == true) {
              for (let i of this.getuser) {

                if (i.email == this.userfromlocal.email) {
                  i.password = "********"
                  this.httpService.setData("user", i)

                }
              }
            }
          })
        })
      }
      else {
        alert('found');
      }
    } else {
      if (this.checkOwner(form)) {
        this.obj = {
          "name": form.value.name,
          "email": form.value.email,
          "password": form.value.password
        }
        let headers = { "Conetent-Type": "application/json" }
        // this.service.addUsers(this.obj)
        this.httpService.postownerdata(this.obj, headers).subscribe(data => {
          console.log("daaaaaaaaaaaaaaaaaaaaft Owner")
          this.router.navigate(["/"])
          localStorage.clear();
          this.obj.password = "********"
          this.httpService.setData("owneruser", this.obj)
          this.httpService.setData("ownerloggedin", true);
          this.loggedinheader = true;
          this.ownerloggedinheader = true;
          this.httpService.displayProfileIcon(this.loggedinheader)
          this.httpService.displayProfileIconToOwner(this.ownerloggedinheader)
          // ..............................//
          this.httpService.getownerdata().subscribe(data => {
            this.getuserowner = data;
            console.log(this.getuserowner)
            this.loggedowner = this.httpService.getData("ownerloggedin")
            this.userfromlocalowner = this.httpService.getData("owneruser")
            if (this.loggedowner == true) {
              for (let i of this.getuserowner) {

                if (i.email == this.userfromlocalowner.email) {
                  i.password = "********"
                  this.httpService.setData("owneruser", i);
                  this.owner2 = this.httpService.getData("owneruser");
                  console.log("heeeeeeeeeeennnnaaaaa")
                  console.log(this.owner2)
                  break;

                }
              }
              console.log("abbbbbbbbl el function")
              this.addPlaceToThisOwner();
            }
          })

          // setTimeout(() => {
          //   console.log("abbbbbbbbl el function")
          //   this.addPlaceToThisOwner();
          // }, 1000)

        })

      }
      else {
        alert('found');
      }
    }
  }

  // ..............place details....................///

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
        "phone": this.kidsOwner,
        "facebook": "",
        "instagram": ""
      },
      "ownerId": this.owner2.id
    }
    this.httpService.postPlaces(this.placeObj, headers).subscribe(data => {
      console.log("heeeeeeeeeeeeeeeeeeeeeeeeeeeeeeet")
      console.log(data)
      console.log(this.owner2.id)
    })

  }
  // test


}
