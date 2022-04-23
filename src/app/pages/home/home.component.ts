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
  constructor(private readonly afs: AngularFirestore) {

    this.postsCollection = afs.collection<any>('posts');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
     this.postsCollection.valueChanges().subscribe((data)=>{
      console.log("data=>",data)
      this.posts=data;
    })


    this.usersCollection = afs.collection<any>('usersTable');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
     this.usersCollection.valueChanges().subscribe((data)=>{

      this.users=data;
    })


  }

  ngOnInit(): void {
  }

}
