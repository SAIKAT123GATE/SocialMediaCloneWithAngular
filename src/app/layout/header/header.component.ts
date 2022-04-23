import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email:any=null;
  constructor(private auth:AuthService,private router:Router,private toastr:ToastrService) {
    this.auth.getUser().subscribe(
      (user) => {
        console.log("user", user?.uid)
        this.email = user?.email;
      })
  }

  ngOnInit(): void {
  }

  async logOut() {
    try {
      await this.auth.logOut();
      this.email = null;
      this.router.navigateByUrl("/login")
    }
    catch{
      console.log("something went wrong")
      this.toastr.error("Something Went Wrong")
    }

  }

}
