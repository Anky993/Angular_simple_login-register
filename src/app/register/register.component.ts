import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { LoginService } from "../login.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public welcome;
  public err;
  public welmsg = false;
  public errmsg = false;

  constructor(public fb: FormBuilder, private loginService: LoginService, private router: Router) { }
  registrationForm = this.fb.group({
    FirstName : ['',Validators.required],
    LastName : [''],
    Email : ['',[Validators.required,Validators.email]],
    Password :['',Validators.required],
    ConfirmPassword : ['',Validators.required]
  });
  ngOnInit() {
  }
  onSubmit(){
  this.loginService.register(this.registrationForm.value).subscribe(
    data => {
      if(data.msg === 0){
        console.log("use")
        this.errmsg= true;  
            this.err = "Email is already in use, try again with another Email";
            setTimeout(() => {
              this.err = "";
             }, 3000);
      }
      else if(this.registrationForm.value.Email===data.Email){
        this.registrationForm.reset();            
            window.localStorage.setItem('token', data.Email);
            this.router.navigate(['/welcome']);
      }
      console.log("success",data)
      
    },
    err =>{
      console.error(err);
    }
  )
  }
}
