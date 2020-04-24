import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';
import { Places } from '../interface/places.interface';

const placesURL = 'http://localhost:8080/getPlacesList';
const emailURL = 'http://localhost:8080/getEmailList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  title = 'travel-angular';
  places: Places[];
  emailList: any;
  showAttractionList = false;
  showEmailList = false;
  public names:Array<string>=[];
  public attractions:Array<string>=[];

  private selectPlace = '';
  private selectAttraction = '';
  private selectEmails:Array<string>=[];


  public selectedPlace(value:any):void {
    this.selectPlace = value;
    console.log('Selected value is: ', value);
    this.showAttractions(value);
  }

  public selectedAttraction(value:any):void {
    this.selectAttraction = value;
    console.log('Selected Attraction value is: ', value);

    this.selectRecepients();
    this.showEmailTemplates(value);
  }

  public selectedEmails(value:any):void {
    this.selectEmails.push(value);
    console.log(this.selectEmails);
    this.showEmailTemplates(value);
  }




  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    // @ts-ignore
    this.http.get<Places[]>(placesURL)._subscribe((data) => {
        console.log(data);
        this.places = data.body;
        this.names = this.places.map(data => data.name);
        console.log(this.names);

    });

    this.http.get(emailURL)._subscribe((data) => {
      this.emailList = data.body["recipientList"];
      console.log(this.emailList);
    })
  }

  showAttractions(value): void{

    let newAr = this.places.filter((name)=>{
      return name.name == value
    });
    this.attractions= newAr[0].attraction;

    console.log(this.attractions);
    this.showAttractionList = true;
  }


  selectRecepients(){
    this.showEmailList = true;
  }

  showEmailTemplates(value): void{

  }
}


