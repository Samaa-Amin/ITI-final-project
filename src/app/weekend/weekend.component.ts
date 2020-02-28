import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { HttpServiceService } from '../http-service.service';
import { UsersService } from '../users.service';


import * as $ from 'jquery';


@Component({
  selector: 'app-weekend',
  templateUrl: './weekend.component.html',
  styleUrls: ['./weekend.component.scss']
})
export class WeekendComponent implements OnInit {
  holidayForm: FormGroup;
  userObj;
  user=[];
  weekEnd={}
  constructor(private formBuilder: FormBuilder , private http:HttpServiceService , private service:UsersService ){ }

  ngOnInit() {
    this.holidayForm = this.formBuilder.group({
      time: ['', Validators.required],
      endTime: ['', Validators.required],

      date: ['', Validators.required],
      email: ['', [ Validators.pattern(/^[a-z]\w{1,}@[a-z]{1,}.com$/)]],

    })
    
    
    this.userObj=this.http.getData("user")
    console.log(this.userObj);
    
   this.user.push(this.userObj)
   console.log(this.user);
   
   $('#notSend').click(function(){
     $('.email').css("display","block")
   })
   $('#send').click(function(){
    $('.email').css("display","none")
  })

  $('.userName').click(function(){
    alert('clicked');
  })


  }
  onSubmit(form){
    if(form.value.email== ""){
    this.weekEnd={
      "userId": this.userObj.id,
      "date": form.value.date,
      "time": form.value.time,
      "endTime": form.value.endTime,
      "email":this.userObj.email
    }

    this.service.addWeekend(this.weekEnd)
  }
  else{
    this.weekEnd={
      "userId": this.userObj.id,
      "date": form.value.date,
      "time": form.value.time,
      "endTime": form.value.endTime,
      "email":form.value.email
    }

    this.service.addWeekend(this.weekEnd)
  }
    console.log(this.weekEnd);
    
  }
}
