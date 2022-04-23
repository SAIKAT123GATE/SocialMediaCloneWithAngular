import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<any>;
  posts: Observable<any[]>;
  constructor(private afs: AngularFirestore) {
    this.postsCollection = afs.collection<any>('posts');
    this.posts = this.postsCollection.valueChanges();
  }
}
