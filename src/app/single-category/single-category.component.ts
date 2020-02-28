

import { Component, OnInit, ViewChild, ElementRef, ViewChildren, QueryList, Inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PlacesService } from '../places.service';
import { HttpServiceService } from '../http-service.service';



@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {
  cats;
  places;
  selctedPlaces = [];
  // ......//
  singleCatId;
  singleCatData;
  singleSelecetedPlaces;
  // ...............//
  repetedLocatins = [];
  uniqe;
  rate = [1, 2, 3, 4, 5];
  id;
  arrofRates = [];
  arrofChecked = [];

  arrOfLocations = [];
  arrLocationsChecked = [];
  setOfLocation;

  filteredData = [];
  // check = false;
  // .........................//
  favs: any = [];
  checkFav = [];
  spesifcFavId = [];
  user;
  placeLoggedin;
  /////////switch page views//////////
  list = true;
  gallery;
  pageOfItems;

 

  
  
  
  
  
  constructor(private route: ActivatedRoute, private placeService: PlacesService, private httpService: HttpServiceService, private router: Router) {
    
  


    this.route.params.subscribe((param: Params) => {
      this.singleCatId = param["id"];
      // console.log("heeeeee" + typeof (+this.singleCatId))


      this.httpService.gettingData().subscribe(
        data => {
          this.cats = data;
          this.singleCatData = this.loopingforSpecifcCategory(this.singleCatId);

        }
      )

      this.httpService.gettingPlaces().subscribe(

        data => {
          this.repetedLocatins = [];
          this.places = data;
          this.singleSelecetedPlaces = this.getPlacesOfSingleCat(this.singleCatId);
          this.filteredData = [...this.singleSelecetedPlaces]

          // .......favs.........//
          this.user = this.httpService.getData("user");
          this.placeLoggedin = this.httpService.getData("loggedin");

          this.httpService.getFav().subscribe(data => {
            this.favs = data;
            for (let i = 0; i < 100; i++) {
              this.checkFav[i] = false
            }
            for (let place of this.singleSelecetedPlaces) {
              this.gettingSpesificOfFavs(place.id);
            }


          })

          // ..................//


          for (let i of this.singleSelecetedPlaces) {
            this.repetedLocatins.push(i.location);
          }
          this.uniqe = new Set(this.repetedLocatins);
          for (let i of this.uniqe) {
            setTimeout(() => {
              this.id = document.getElementById(i);
              // console.log("ssssssssssssssssssssssssssss")
              this.arrOfLocations.push(this.id)
            }, 2000)
          }
          // console.log(this.arrOfLocations
        }
      )

    })

  }
  
  ngOnInit() {
    // an example array of 150 items to be paged
    this.filteredData = Array(150).fill(0).map((x, i) => ({ id: (i + 1), name: `Item ${i + 1}`}));
}
 
onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
}

  // .....................................//

  gettingSpesificOfFavs(singlePlaceId) {

    //  awl ma render el page bayshof hawa mawgod wala la?
    for (let fav of this.favs) {
      if (fav.placeId == singlePlaceId && fav.userId == this.user.id) {
        this.checkFav[singlePlaceId] = true;
        this.spesifcFavId[singlePlaceId] = fav.id;
        this.httpService.setData("favid", this.spesifcFavId);
        break;
      }
    }

  }


  checkingFavs(place) {
    //lw kant mn el favs already 
    if (this.checkFav[place.id] == true) {
      this.RemoveFromFavs(place)

    }
    // lw makntsh mn el fav hayro7 yo7tha?
    else {
      this.addToFavs(place)
    }
  }



  RemoveFromFavs(place) {
    this.placeLoggedin = this.httpService.getData("loggedin");
    if (this.placeLoggedin == true) {
      this.checkFav[place.id] = false;
      // console.log("22222222222222222")
      this.spesifcFavId = this.httpService.getData("favid")
      console.log("heeeeeeeeeeere")
      console.log(this.spesifcFavId)
      console.log(this.spesifcFavId[place.id])
      this.httpService.deleteFav(this.spesifcFavId[place.id]).subscribe(data => {
        console.log("delteing is done");

      })

    }

    else {
      alert("you have to register")
      this.router.navigate(["/register"])
    }

  }


  addToFavs(place) {
    this.placeLoggedin = this.httpService.getData("loggedin");

    if (this.placeLoggedin == true) {
      let headers = { "Conetent-Type": "application/json" }
      let body = {
        "placeId": place.id,
        "userId": this.user.id
      }
      this.httpService.postFav(body, headers).subscribe(
        data => {
          // console.log(data)
          this.checkFav[place.id] = true;
          // this.gettingSpesificOfFavs()
          this.httpService.getFav().subscribe(data => {
            this.favs = data;
            // console.log("gabnaaaaaaaaa el favs")
            this.gettingSpesificOfFavs(place.id)
          })


          // console.log("1111111111111111111111111")

        }
      )
    }
    else {
      alert("you have to register")
      this.router.navigate(["/register"])
    }
  }
  // ..............................//?



  handling(reservation, status, kidfriendly, one, two, three, four, five) {
    this.arrofRates = [one, two, three, four, five];


    this.arrLocationsChecked = [];
    this.arrofChecked = [];

    // this.check = true;
    this.filteredData = [];
    // console.log('changed')
    for (let place of this.singleSelecetedPlaces) {

      if (this.ratingChecked(place) &&
        this.locationChecked(place) &&
        this.chechkingResevartion(place, reservation) &&
        this.chechkingstatus(place, status) &&
        this.chechkkidfriendly(place, kidfriendly)) {
        console.log("yes")
        console.log(place)
        this.filteredData.push(place)
      }
    }
  }


  locationChecked(place) {
    for (let i of this.arrOfLocations) {

      if (i.checked) {
        this.arrLocationsChecked.push(i.value)
      }
    }
    if (this.arrLocationsChecked.length == 0) {
      return true
    }
    for (let i of this.arrLocationsChecked) {
      if (place.location == i) {
        return true;
      }
    }
  }

  ratingChecked(place) {
    for (let i of this.arrofRates) {

      if (i.checked) {
        this.arrofChecked.push(i.value)
      }

    }
    if (this.arrofChecked.length == 0) {
      return true
    }
    for (let i of this.arrofChecked) {
      if (place.avgrate == i) {
        return true;
      }
    }
  }

  checkRating(place, key) {
    if ((place["avgrate"] == key.value && key.checked) || key.checked == false) {

      return true
    }

    else {
      return false
    }
  }

  chechkkidfriendly(place, kidfriendly) {
    if ((place["kid-friendly"] == "true" && kidfriendly.checked) || kidfriendly.checked == false) {

      return true
    }

    else {
      return false
    }

  }
  chechkingstatus(place, status) {
    if ((place.status == "open now" && status.checked) || status.checked == false) {

      return true
    }
    else {
      return false
    }

  }

  chechkingResevartion(place, reservation) {
    if ((place.reservation == "true" && reservation.checked) || reservation.checked == false) {

      return true
    }
    else {
      return false
    }

  }

  loopingforSpecifcCategory(id) {
    for (let i of this.cats) {
      if (i.id == id) {
        return i;
      }
    }
  }


  getPlacesOfSingleCat(id) {

    this.selctedPlaces = [];
    for (let place of this.places) {
      for (let i of place.catId) {
        if (i == id) {
          this.selctedPlaces.push(place)
        }
      }
    }
    return this.selctedPlaces
  }
  ///////////switch views////////
  galleryview() {
    this.gallery = true;
    this.list = false;
  }
  listview() {
    this.list = true;
    this.gallery = false;
  }



}



