import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  data;
  search_data;
  editRow= false;
  updateButton= false;
  searchButton= false;
  searchButton1= false;
  enableEdit = false;
  enableEditIndex = null;

  name = 'Angular';
  constructor(private fb:FormBuilder, private loginService:LoginService, private router: Router) { }

  updateForm = this.fb.group({
    FirstName : ['',Validators.required],
    LastName : [''],
    ID : [''],
    Email : ['',[Validators.required,Validators.email]]
  });

  ngOnInit() {
    if(!window.localStorage.getItem('token')) {
      this.router.navigate(['/login']);
      return;
    }
    this.getdata()
  }

  update(){
    this.searchButton = true;
  }
  updatedata(studentID){
    this.editRow=false;
    this.updateForm.value.ID = studentID;
    console.log(this.updateForm.value)
    this.loginService.updateID(this.updateForm.value).subscribe(
      data=>{
        this.updateForm.reset();
        this.getdata();
      }
    )
  }

  updateID(){
    this.loginService.updateID(this.updateForm.value).subscribe(
      data=>{
        this.getdata();
      }
    )
  }

  deletedata(ID) {
    this.loginService.deletedata(ID).subscribe(
      data =>{
        this.getdata();
      }
    )
  }

  deleteAll(){
    this.loginService.deleteall().subscribe(
      data=>{
        console.log("success",data);
        this.getdata();
      }
    )
    }

  getdata() {
    this.loginService.getdata().subscribe(
      data =>{
        this.data= data;
        console.log(this.data);
      }
    )
  }

}
