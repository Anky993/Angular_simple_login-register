import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { LoginService } from "../login.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public welcome;
  students;
  public err;
  public welmsg = false;
  public errmsg = false;

  constructor( public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router) { }

  loginForm = this.fb.group({
    Email : ['',[Validators.required,Validators.email]],
    Password : ['',Validators.required]
  })
  ngOnInit() {
    
  }

  getdata() {
    this.loginService.getdata().subscribe(
      data =>{
        this.students= data;
        console.log(this.students);
      }
    )
  }
  onSubmit() {
    
    this.loginService.onSubmit(this.loginForm.value).subscribe(
      data =>{
          if(data == null){
            this.errmsg= true;  
            this.err = "Invaild Email or password";
            setTimeout(() => {
              this.err = "";
             }, 3000);
            }
            else if(this.loginForm.value.Email===data.Email && 
            this.loginForm.value.Password==data.Password){
            this.loginForm.reset();            
            window.localStorage.setItem('token', data.Email);
            this.router.navigate(['/welcome']);
            }
            else{
              this.welcome = "Techincal issue please Try again Later"
          }
            console.log("success", data)
          },
      error =>{
        console.log("error hai");
        this.errmsg= true;  
        this.err = "Technical Issue! please Try again";
        setTimeout(() => {
          this.err = "";
         }, 3000);
      }
    );
  }
}
