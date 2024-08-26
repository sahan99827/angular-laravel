import { Injectable } from '@angular/core';
import {Item} from "../entities/Item";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  constructor(private  http:HttpClient) { }

  async getAll(): Promise<Item[] | undefined> {
    const url =ApiConfig.createURL("items");
    let items = this.http.get<Item[]>(url).toPromise();
    return items;
  }
}
