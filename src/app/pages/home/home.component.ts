import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private postsCollection: AngularFirestoreCollection<any>;
  private usersCollection: AngularFirestoreCollection<any>;

  posts:any=[];
  users:any=[];
  isLoading=false;
  constructor(private readonly afs: AngularFirestore) {
    this.isLoading=true;
    this.postsCollection = afs.collection<any>('posts');
     this.postsCollection.valueChanges({ idField: 'id' }).subscribe((data)=>{
      this.posts=data;
      console.log("this.posts=>",this.posts);
      this.isLoading=false;
    })


    this.usersCollection = afs.collection<any>('usersTable');
     this.usersCollection.valueChanges().subscribe((data)=>{

      this.users=data;
      this.isLoading=false;
    })


  }

  ngOnInit(): void {
  }

}
