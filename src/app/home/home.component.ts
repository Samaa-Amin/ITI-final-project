import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { HttpServiceService } from '../http-service.service';



interface Image {
  img: string;

}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {



  customOptions: OwlOptions = {

    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }
  slidesStor: Image[] = [
    { img: "./../../assets/Home/uriel-soberanes-MxVkWPiJALs-unsplash.png" },
    { img: "./../../assets/Home/uriel-soberanes-MxVkWPiJALs-unsplash.png" },





  ]

  log;
  usersdata;
  getuser;
  logged;
  userfromlocal
  constructor(private service: HttpServiceService) {


    // ...............................//

    // setTimeout(() => {

    //   this.service.gettingUsers().subscribe(data => {
    //     this.getuser = data;
    //     console.log(this.getuser)
    //     this.logged = this.service.getData("loggedin")
    //     this.userfromlocal = this.service.getData("user")
    //     if (this.logged == true) {
    //       for (let i of this.getuser) {

    //         if (i.email == this.userfromlocal.email) {
    //           this.service.setData("user", i)

    //         }
    //       }
    //     }
    //   })
    // }, 3000)

  }


  ngOnInit() {

  }

}
