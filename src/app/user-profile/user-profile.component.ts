import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from './../http-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as $ from "jquery"
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  myForm: FormGroup;
  toggle = false;
  newObj;

  user;
  usersData;
  userData;
  checker;


  allFavourites;
  userFavouritesIds = [];
  userFavouritesPlaces = [];
  fileData: File = null;
  imagee: any;
  imageSrc: any = "https://i.postimg.cc/76tHbf1v/person-icon.png";

  readURL(event: any) {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }
  preview() {
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = _event => {
      this.imageSrc = reader.result;
      console.log(this.user);

      this.user.image = reader.result;

      this.service.setData("user", this.user);

      let headers = { "Content-Type": "application/json" };

      this.service.updateUserData(this.user.id, this.user, headers).subscribe(data => {
        console.log(data);
      });
    };

  }
  constructor(private service: HttpServiceService) {
    this.service.getFav().subscribe(data => {
      this.allFavourites = data;
      for (let fav of this.allFavourites) {
        if (fav.userId == this.user.id) {
          this.userFavouritesIds.push(fav.placeId);
        }
      }
      for (let i of this.userFavouritesIds) {
        this.service.getSinglePlace(i).subscribe(data => {
          this.userFavouritesPlaces.push(data);
        })
      }
      console.log(this.userFavouritesIds);
    });
  }
  removeFav(event) {
    let id = parseInt(event.srcElement.parentNode.id);
    for (let fav of this.allFavourites) {
      if (fav.userId == this.user.id && fav.placeId == id) {
        this.service.deleteFav(fav.id).subscribe(data => {
          console.log(data);
        });
        event.srcElement.parentNode.remove();
      }
    }
  }
  ngOnInit() {
    
    this.user = this.service.getData("user");
    this.service.getSingleUser(this.user.id).subscribe(data => {
      this.userData = data;
    })

    this.service.gettingUsers().subscribe(data => {
      this.usersData = data;
    })
    this.myForm = new FormGroup({
      name: new FormControl(this.user.name, Validators.required),
      email: new FormControl(this.user.email, [Validators.required, Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]),
    });

// ===============pagination========//

  }

  checkMail(mail) {
    for (let index = 0; index < this.usersData.length; index++) {
      if (mail == this.usersData[index].email) {
        this.checker = false;
        break;
      }
      else {
        this.checker = true;
      }
    }

    return this.checker;
  }

  showEditForm() {
    this.toggle = !this.toggle
  }


  checkPass(pass, name, mail) {
    if (this.checkMail(mail.value) == false && this.user.email != mail.value) {
      alert('mail found');
      return;
    }

    if (pass.value == this.userData.password && this.user.email == mail.value) {

      this.newObj = {
        "name": name.value,
        "email": mail.value,
        "password": this.userData.password,
        "image": this.user.image,
        "visa": this.user.visa,
        "id": this.user.id
      }


      let headers = { "Content-Type": "application/json" };
      this.service.updateUserData(this.user.id, this.newObj, headers).subscribe(data => {
        console.log(data);
      });
      this.service.setData("user", this.newObj);
    }
    else {
      alert('wrong password');

    }
  }

}