import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Places } from '../interface/places.interface';
import {SelectComponent} from 'ng2-select';

const placesURL = 'http://localhost:8080/getPlacesList';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'travel-angular';
  places: Places[];
  placeNames: string[];
  // searchText = '';

  private value = {};

  public selected(value:any):void {
    console.log('Selected value is: ', value);
  }

  public removed(value:any):void {
    console.log('Removed value is: ', value);
  }

  public typed(value:any):void {
    console.log('New search input: ', value);
  }

  public refreshValue(value:any):void {
    this.value = value;
  }

  constructor(private http: HttpClient) {}


  ngOnInit(): void {
    // @ts-ignore
    this.http.get<Places[]>(placesURL)._subscribe((data) => {
        console.log(data);
        this.places = data.body;
        this.placeNames = this.places.map(data => data.name);
        console.log(this.placeNames);

    });
  }
}


