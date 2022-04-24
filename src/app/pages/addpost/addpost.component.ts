import { Component, OnInit } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { map, finalize } from "rxjs/operators";
import { Observable } from "rxjs";
// import {  uuid } from "uuidv4";

//angular form
import { NgForm } from "@angular/forms";
//firebase
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { AngularFirestore } from "@angular/fire/compat/firestore";

//services
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-addpost',
  templateUrl: './addpost.component.html',
  styleUrls: ['./addpost.component.css']
})
export class AddpostComponent implements OnInit {

  locationName!: string;
  description!: string;
  image: any = null;
  picture: any = null;

  userName: any = null;
  user:any=null;
  uploadPercent: any = null;
  postCollection: any;
  userCollection: any;
  constructor(private storage: AngularFireStorage,
    private toastr: ToastrService,
    auth: AuthService,
    private router: Router,
    private afs: AngularFirestore) {
    this.postCollection = afs.collection<any>('posts');
    this.userCollection = afs.collection<any>('usersTable');
    auth.getUser().subscribe(
      (user) => {
        this.userCollection.valueChanges().subscribe((data: any) => {

          data.map((eachData: any) => {
            if (eachData.id === user?.uid) {
              this.user=eachData;
              this.userName = eachData.name;
              console.log("userName=>", this.user)
            }
          })

        })
      })
  }

  ngOnInit(): void {
  }


  addPost() {

    var tempObj = {

      location: this.locationName,
      Description: this.description,
      ImageUrl: this.picture,
      By: this.userName,
      vote:[],
      instaId: this.user.instagramId,
      date: Date.now(),
    }

    this.postCollection.add(tempObj).then(() => {
      this.toastr.success("Post added successfully");
      this.router.navigateByUrl("/");
    })


  }


  uploadFile(event: any) {
    var n = Date.now();
    const file = event.target.files[0];
    const filePath = `PostsImages/${n}`;
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
