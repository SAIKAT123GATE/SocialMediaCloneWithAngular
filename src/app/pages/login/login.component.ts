import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm(f: NgForm) {
    console.log("data=>",f.value)
    this.auth.loginWithEmail(f.value.email, f.value.password).then(
      (user) => {
        console.log("user from firebase=>", user);
        this.router.navigateByUrl("/")
      }).catch((err) => {

        if (err.code == "auth/user-not-found") {
          console.log("Error", err.code)
          this.router.navigate(["/signup"])
        }
      }
      )


  }

}
