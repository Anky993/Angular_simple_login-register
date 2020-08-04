import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = 'http://localhost:9000/login';
    
  constructor(public http : HttpClient) { }
  
  
  getdata(){
    return this.http.get<any>('http://localhost:9000/get');
  }

  deleteall(){
    console.log("delete data");
    return this.http.get<any>('http://localhost:9000/deleteall');
  }

  // search(searchData){
  //   console.log("seachring");
  //   console.log(searchData);
  //   return this.http.post<any>('http://localhost:9000/search',searchData);
  // }

  deletedata(deletedata){
    console.log({deletedata});
    return this.http.post<any>('http://localhost:9000/delete',{deletedata});
  }

  updateID(updatedata){
    console.log("updating");
    console.log(updatedata);
    return this.http.post<any>('http://localhost:9000/update',updatedata);
  }

  onSubmit(usr) {
    return this.http.post<any>(this.url, usr);
  }

  register(data){
    console.log(data);
    return this.http.post<any>('http://localhost:9000/register', data);
  }
}
