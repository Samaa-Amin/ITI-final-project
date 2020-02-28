import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms'
import { HttpServiceService } from './../http-service.service'

@Component({
  selector: 'app-rates',
  templateUrl: './rates.component.html',
  styleUrls: ['./rates.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatesComponent),
      multi: true
    }
  ]
})
export class RatesComponent implements OnInit, ControlValueAccessor {
  allRates;
  place;
  @Input() id;
  placeRates = 0;
  avgRateArr = [];
  public disabled: boolean;
  public value: number;
  public rating = [
    {
      "stars": 1,
    },
    {
      "stars": 2,
    },
    {
      "stars": 3,
    },
    {
      "stars": 4,
    },
    {
      "stars": 5,
    }
  ]

  onChange: any = () => { };
  onTouch: any = () => { };

  writeValue(value: number): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }


  calcAvgRate(filtered2) {
    this.placeRates = 0;
    let count = 0;
    for (let fil of filtered2) {
      this.placeRates += fil.value;
      console.log(fil.value, this.placeRates);
      count++;
    }
    this.placeRates = Math.round(this.placeRates / count);
    return this.placeRates;
  }

  setRating(star: any) {
    if (!this.disabled) {
      this.value = star.stars;
      this.onChange(star.stars);
      this.onTouch();
    }

    let user = this.service.getData("user")

    let arr = [];
    for (let i = 0; i < this.value; i++) {
      arr.push(i)
    }
    let body =
    {
      "value": this.value,
      "placeId": this.id,
      "userId": user.id,
      "arrOfVals": arr
    }

    this.service.getRates().subscribe(data => {
      this.allRates = data;

      let filtered = this.allRates.filter(item => item.placeId == this.id && item.userId == user.id);


      if (filtered.length > 0) {
        this.service.updateRate(filtered[0].id, body).subscribe(data => {
          console.log("uppppppdated" + data);
        });
      }
      else {
        this.service.postRate(body).subscribe(data => {
          console.log("posssssted" + data);
        })
      }

      let filtered2 = this.allRates.filter(item => item.placeId == this.id);
      let avgRate = this.calcAvgRate(filtered2);

      for (let i = 0; i < avgRate; i++) {
        this.avgRateArr.push(i);
      }

      this.service.getSinglePlace(this.id).subscribe(data => {
        this.place = data;
      })
      this.place.avgrate = avgRate;
      this.place.rates = this.avgRateArr;
      console.log(this.place);

      this.service.updatePlaceAvgRate(this.id, this.place).subscribe(data => {
        console.log(data);

      })
      this.avgRateArr = [];




    })

  }

  constructor(private service: HttpServiceService) {

  }



  ngOnInit(): void {
    this.service.getRates().subscribe(data => {
      this.allRates = data;
      console.log(this.allRates);
    });

    this.service.getSinglePlace(this.id).subscribe(data => {
      this.place = data;
    })
  }

}
