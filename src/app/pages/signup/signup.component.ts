import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AuthService } from 'src/app/service/auth.service';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  picture: string = "https://learnyst.s3.amazonaws.com/assets/schools/2410/resources/images/logo_lco_i3oab.png";
  uploadPercent: any = null;

  name!: string;
  email!: string;
  password!: string;
  instagramId!: string;
  country!: string;
  bio!: string;
  usersCollection: any;
  constructor(
    private storage: AngularFireStorage,
    private toastr: ToastrService,
    private auth: AuthService,
    private router: Router,
    private afs: AngularFirestore
  ) {
    this.usersCollection = afs.collection<any>('usersTable');
  }

  ngOnInit(): void {
  }

  onSubmit() {

    this.auth.signupWithEmailAndPassword(this.email, this.password).then((res) => {
      console.log("res=>",res)
      var user =
      {
        id: res.user?.uid,
        name: this.name,
        email: this.email,
        password: this.password,
        instagramId: this.instagramId,
        country: this.country,
        bio: this.bio,
        picture: this.picture

      }
      this.usersCollection.add(user).then(() => {
        this.router.navigateByUrl("/");
        this.toastr.success("SignUp Success");
      }).catch((err: any) => {
        console.log("error from signup=>", err)
        this.toastr.error("Signup failed");
      })

    })

  }

  uploadFile(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `UserImagesImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.percentageChanges().subscribe((percentage) => {
      this.uploadPercent = percentage
    });

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const downloadurl = fileRef.getDownloadURL();
          downloadurl.subscribe((url: any) => {
            if (url) {
              this.picture = url;
            }

          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
