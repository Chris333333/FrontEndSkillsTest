import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Convert } from './Interfaces/Convert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //On Init funtion that gets all the information about average currency exchange rates for GBP, EUR, USD for date 12/10/2023
  ngOnInit(): void {
    this.http.get('http://api.nbp.pl/api/exchangerates/rates/a/usd/2023-10-12/?format=json').subscribe({
      next: response => {
        this.usdConvert = JSON.parse(JSON.stringify(response));
      },
      error: error => console.log(error),
      complete: () => console.log('complete receiving usd convertion')
    });

    this.http.get('http://api.nbp.pl/api/exchangerates/rates/a/gbp/2023-10-12/?format=json').subscribe({
      next: response => {
        this.gbpConvert = JSON.parse(JSON.stringify(response));
      },
      error: error => console.log(error),
      complete: () => console.log('complete receiving usd convertion')
    });

    this.http.get('http://api.nbp.pl/api/exchangerates/rates/a/eur/2023-10-12/?format=json').subscribe({
      next: response => {
        this.eurConvert = JSON.parse(JSON.stringify(response));
      },
      error: error => console.log(error),
      complete: () => console.log('complete receiving usd convertion')
    });
  }

  //Constructor just to recive dependency HttpClient for getting values from API
  constructor(private http: HttpClient) { }

  title = 'FrontEndSkillsTest';

  //Here I just some basic interfaces for objects recived from API (based on JSON response)
  usdConvert: Convert | undefined;
  gbpConvert: Convert | undefined;
  eurConvert: Convert | undefined;

  //Global values for mathematical opprations
  valueSecond = '';
  valueFinal = '';
  valueSet = '0';
  activOperation = '';

  //Below there are most functions that I wrote for functionality of calculator

  //Most of numbers are strings and this fuction adds next numbers to the string depended on stiuation
  Numbers(number: string): void {

    if (this.valueSet == '0'
      || this.valueSet == '*'
      || this.valueSet == '/'
      || this.valueSet == '+'
      || this.valueSet == '-') {
      this.valueSet = number;
    }
    else if (this.valueSecond != '')
    {
      this.valueSet = number;
      this.valueSecond = '';
      this.activOperation = '';
      this.valueFinal = '';
    }
    else
      this.valueSet += number;
  }

  // Next 3 function convert value on input to diffrent currentcy (I made precision to 4 decimal places)
  GBPConvert() {
    if (this.valueFinal == '')
      this.valueFinal = this.valueSet;

    if (this.gbpConvert != undefined)
      this.valueSet = ((Math.round((parseFloat(this.valueFinal) * this.gbpConvert?.rates[0].mid) * 10000)) / 10000).toString() + " GBP";
  }

  EURConvert() {
    if (this.valueFinal == '')
      this.valueFinal = this.valueSet;

    if (this.eurConvert != undefined)
      this.valueSet = ((Math.round((parseFloat(this.valueFinal) * this.eurConvert?.rates[0].mid) * 10000)) / 10000).toString() + " EUR";
  }

  USDConvert() {
    if (this.valueFinal == '')
      this.valueFinal = this.valueSet;

    if (this.usdConvert != undefined)
      this.valueSet = ((Math.round((parseFloat(this.valueFinal) * this.usdConvert?.rates[0].mid) * 10000)) / 10000).toString() + " USD";
  }

  //Next below are just funtion for specific numbers on calculator

  Number1() {
    this.Numbers('1');
  }

  Number2() {
    this.Numbers('2');
  }

  Number3() {
    this.Numbers('3');
  }

  Number4() {
    this.Numbers('4');
  }

  Number5() {
    this.Numbers('5');
  }

  Number6() {
    this.Numbers('6');
  }

  Number7() {
    this.Numbers('7');
  }

  Number8() {
    this.Numbers('8');
  }

  Number9() {
    this.Numbers('9');
  }

  Number0() {
    this.Numbers('0');
  }

  //Function below clears most of global values and sets visible value to 0

  Clear() {
    this.valueSet = '0';
    this.valueFinal = '';
    this.valueSecond = '';
    this.activOperation = '';
  }

  //Each of mathematical fuctions below are set up in to the 4 situation (there can be more. With more test there could be found more errors in mathematical functions)
  //1. Where function is called when only one value was inserted. Then Value is stored and on input field is set to specific operation symbol.
  //2. Where function is called when there is no second value for operation. Then value on input field becomes the second value and mathematical operation is run.
  //3. Where function is called and other mathematical operation was already set as activOperation. Then value on input field becomes first value and operation is set to 1 case
  //4. Any other times active operation is set to conresponding operation and mathematical operation is run.
  //Divide fuction

  Divide() {

    if (this.valueFinal == '') {
      this.valueFinal = this.valueSet;
      this.valueSet = '/';
      this.activOperation = '/';
    }
    else if (this.valueSecond == '')
    {
      this.valueSecond = this.valueSet
      this.valueFinal = (parseFloat(this.valueFinal) / parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
    else if (this.activOperation != "/")
    {
      this.valueFinal = this.valueSet;
      this.valueSet = '/';
      this.valueSecond = '';
      this.activOperation = '/'
    }
    else {
      this.activOperation = '/'
      this.valueFinal = (parseFloat(this.valueFinal) / parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
      
    
  }

  Multiplay() {
    if (this.valueFinal == '') {
      this.valueFinal = this.valueSet;
      this.valueSet = '*';
      this.activOperation = '*';
    }
    else if (this.valueSecond == '') {
      this.valueSecond = this.valueSet
      this.valueFinal = (parseFloat(this.valueFinal) * parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
    else if (this.activOperation != "*") {
      this.valueFinal = this.valueSet;
      this.valueSet = '*';
      this.valueSecond = '';
      this.activOperation = '*'
    }
    else {
      this.activOperation = '*'
      this.valueFinal = (parseFloat(this.valueFinal) * parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
  }

  Substract() {
    if (this.valueFinal == '') {
      this.valueFinal = this.valueSet;
      this.valueSet = '-';
      this.activOperation = '-';
    }
    else if (this.valueSecond == '') {
      this.valueSecond = this.valueSet
      this.valueFinal = (parseFloat(this.valueFinal) - parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
    else if (this.activOperation != "-") {
      this.valueFinal = this.valueSet;
      this.valueSet = '-';
      this.valueSecond = '';
      this.activOperation = '-'
    }
    else {
      this.activOperation = '-'
      this.valueFinal = (parseFloat(this.valueFinal) - parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
  }

  Add() {
    if (this.valueFinal == '') {
      this.valueFinal = this.valueSet;
      this.valueSet = '+';
      this.activOperation = '+';
    }
    else if (this.valueSecond == '') {
      this.valueSecond = this.valueSet
      this.valueFinal = (parseFloat(this.valueFinal) + parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
    else if (this.activOperation != "+") {
      this.valueFinal = this.valueSet;
      this.valueSet = '+';
      this.valueSecond = '';
      this.activOperation = '+'
    }
    else {
      this.activOperation = '+'
      this.valueFinal = (parseFloat(this.valueFinal) + parseFloat(this.valueSecond)).toString();
      this.valueSet = this.valueFinal;
    }
  }

  //Just adding point to number

  Point() {
    this.Numbers('.');
  }

  //Equal function that is exectuted depending on active operation

  Equal() {
    

    switch (this.activOperation) {
      case '/': {
        if (this.valueSecond == '')
          this.valueSecond = this.valueSet;
        this.valueFinal = (parseFloat(this.valueFinal) / parseFloat(this.valueSecond)).toString();
        this.valueSet = this.valueFinal;
        break;
      }
      case '*': {
        if (this.valueSecond == '')
          this.valueSecond = this.valueSet;
        this.valueFinal = (parseFloat(this.valueFinal) * parseFloat(this.valueSecond)).toString();
        this.valueSet = this.valueFinal;
        break;
      }
      case '-': {
        if (this.valueSecond == '')
          this.valueSecond = this.valueSet;
        this.valueFinal = (parseFloat(this.valueFinal) - parseFloat(this.valueSecond)).toString();
        this.valueSet = this.valueFinal;
        break;
      }
      case '+': {
        if (this.valueSecond == '')
          this.valueSecond = this.valueSet;
        this.valueFinal = (parseFloat(this.valueFinal) + parseFloat(this.valueSecond)).toString();
        this.valueSet = this.valueFinal;
        break;
      }
      
    }
  }

}
