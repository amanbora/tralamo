import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Places } from '../interface/places.interface';

import { Constants} from '../constants';


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
  showTemp = false;
  sendActivated = false;

  public names:Array<string>=[];
  public attractions:Array<string>=[];
  public templates = Constants.EMAIL_TEMPLATES;

  private selectPlace = '';
  private selectAttraction = '';
  private selectEmails:Array<string>=[];
  private selectTemplate = '';


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

  public onSelectTemplate(value):void {
    this.selectTemplate = value;
    this.sendActivated = true;
    console.log(this.selectTemplate);
  }





  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    // @ts-ignore
    this.http.get<Places[]>(Constants.PLACES_URL)._subscribe((data) => {
        console.log(data);
        this.places = data.body;
        this.names = this.places.map(data => data.name);
        console.log(this.names);

    });

    // @ts-ignore
    this.http.get(Constants.GET_EMAIL_URL)._subscribe((data) => {
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
    this.showTemp = true;
  }

  sendEmail(){
    const data = {'template':this.selectTemplate};
    const headers = new HttpHeaders({
      'Content-Type' : 'application/json'
    })
    this.http.post<any>(Constants.SEND_EMAIL_URL,data,{headers:headers}).subscribe((response)=>{
      console.log('Sending Mail');
      if(response.sent)console.log('Mail Successfully Sent');
      else console.log('Mail Unsuccessful');
    });
  }
}


