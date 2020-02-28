import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service'
import { Router } from '@angular/router';
import * as $ from 'jquery';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  cats;
  regesterationCats = [];
  wanteddata;
  places;
  headerLoggedin;
  loggenfromlocalstorage;
  loggenfromlocalstorageOwner;
  ownerloggedinheader;
  constructor(private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {
    this.httpService.gettingData().subscribe(
      data => {
        this.cats = data;

        for (let regstCat of this.cats) {
          // console.log("inside for")
          if (regstCat.reservation == "true") {
            this.regesterationCats.push(regstCat);
            // console.log("inside if")
          }
        }

      }
    )


    this.httpService.gettingPlaces().subscribe(data => {
      this.places = data;
    })


    this.loggenfromlocalstorage = this.httpService.getData("loggedin");
    this.loggenfromlocalstorageOwner = this.httpService.getData("ownerloggedin");

  }

  ngOnInit() {
    // da 3shan yasm3 fi s3thaaaaaaaa
    this.httpService.headerProfile.subscribe(data => { ///object behavior
      this.headerLoggedin = data;
    })

    this.httpService.headerProfileowner.subscribe(data => { ///object behavior
      this.ownerloggedinheader = data;
    })
    // search input toggle:

    $('#searchBtn').click(function () {
      $('.form-control').toggle()
    })


  }

  loggingOut() {
    this.headerLoggedin = false;
    this.ownerloggedinheader = false;
    localStorage.clear();
    this.httpService.setData("loggedin", false);
    this.httpService.setData("ownerloggedin", false);
    this.loggenfromlocalstorage = this.httpService.getData("loggedin");
    this.loggenfromlocalstorageOwner = this.httpService.getData("ownerloggedin")
    this.router.navigate(["/"]);

  }
  lowerPlaceSearch;
  lowerPlaceData;

  handlingSearch(inputVal) {
    inputVal.value = "";
    this.wanteddata = [];
  }
  lookingFor(event) {
    this.wanteddata = [];
    for (let i = 0; i < this.places.length; i++) {
      this.lowerPlaceSearch = event.target.value.toLowerCase();
      this.lowerPlaceData = this.places[i].name.toLowerCase();

      if (this.lowerPlaceData.includes(this.lowerPlaceSearch) && event.target.value.length !== 0)
      // || ( this.places[i].location.includes(event.target.value) && event.target.value.length!==0 )
      {

        this.wanteddata.push(this.places[i])
      }
    }
    // console.log(this.wanteddata)
  }
}


