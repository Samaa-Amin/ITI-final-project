import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private headerProfileBehaviour = new BehaviorSubject(null)
  headerProfile = this.headerProfileBehaviour.asObservable();

  private headerProfileBehaviourowner = new BehaviorSubject(null)
  headerProfileowner = this.headerProfileBehaviourowner.asObservable();


  displayProfileIcon(loggedinparam) {
    this.headerProfileBehaviour.next(loggedinparam);
  }

  displayProfileIconToOwner(loggedinparamowner) {
    this.headerProfileBehaviourowner.next(loggedinparamowner);
    console.log("hello from service")
    console.log(loggedinparamowner)
  }


  constructor(private http: HttpClient) { }
  ////getting owner data

  getownerdata() {
    return this.http.get("http://localhost:3000/owners");
  }

  postownerdata(body, header) {
    return this.http.post("http://localhost:3000/owners", body, header);
  }


  paddUser(body, header) {
    return this.http.post("http://localhost:3000/users", body, header)
  }


  postComments(body, header) {
    return this.http.post("http://localhost:3000/comments", body, header)
  }

  gettingData() {
    return this.http.get("http://localhost:3000/categories");
  }
  // ....places.....///
  gettingPlaces() {
    return this.http.get("http://localhost:3000/places");
  }
  postPlaces(body, header) {
    return this.http.post("http://localhost:3000/places", body, header)
  }
  PutPlaces(id, body, header) {
    return this.http.put("http://localhost:3000/places/" + id, body, header)
  }

  gettingUsers() {
    return this.http.get("http://localhost:3000/users");
  }

  // ..............options............/////
  PutOptions(id, body, header) {
    return this.http.put("http://localhost:3000/options/" + id, body, header)
  }


  gettingPtions() {
    return this.http.get("http://localhost:3000/options");
  }
  postOptions(body, header) {
    return this.http.post("http://localhost:3000/options", body, header)
  }
  deleteOption(id) {
    return this.http.delete("http://localhost:3000/options/" + id)
  }



  getSingleCategory(id) {
    return this.http.get("http://localhost:3000/categories/" + id);
  }


  getSingleComments(id) {
    return this.http.get("http://localhost:3000/comments/" + id)
  }

  getComments() {
    return this.http.get("http://localhost:3000/comments")
  }
  // delete btn
  deleteComments(id) {
    return this.http.delete("http://localhost:3000/comments/" + id)
  }
  // delete btn

  // delete btn
  editComment(id, body, header) {
    return this.http.put("http://localhost:3000/comments/" + id, body, header)
  }
  // delete btn

  getRates() {
    return this.http.get("http://localhost:3000/rates");
  }
  // id bata3 object el fav nfso??

  getFav() {
    return this.http.get("http://localhost:3000/favourites");
  }

  updateRate(id, body) {
    return this.http.put("http://localhost:3000/rates/" + id, body);
  }

  deleteFav(id) {
    return this.http.delete("http://localhost:3000/favourites/" + id)
  }

  postFav(body, headers) {
    return this.http.post("http://localhost:3000/favourites", body, headers);
  }

  postHistory(body, headers) {
    return this.http.post("http://localhost:3000/history", body, headers);
  }

  getHistroy() {
    return this.http.get("http://localhost:3000/history");
  }


  postComment(body, headers) {
    return this.http.post("http://localhost:3000/comments", body, headers);
  }

  postRate(body) {
    return this.http.post("http://localhost:3000/rates", body);
  }

  updateUserData(id, body, headers) {
    return this.http.put("http://localhost:3000/users/" + id, body, headers);
  }

  getSinglePlace(id) {
    return this.http.get("http://localhost:3000/places/" + id);
  }

  getSingleUser(id) {
    return this.http.get("http://localhost:3000/users/" + id);
  }

  updatePlaceAvgRate(id, body) {
    return this.http.put("http://localhost:3000/places/" + id, body);
  }


  // ...........general geters and getters functions from session storge...............//
  setData(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  getData(key) {
    if (!JSON.parse(localStorage.getItem(key))) {
      return []
    }
    else {

      return JSON.parse(localStorage.getItem(key))
    }
  }

}