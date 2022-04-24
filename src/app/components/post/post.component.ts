import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { take } from 'rxjs/operators';
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private postsCollection: AngularFirestoreCollection<any>;
  @Input() post!: any;
  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;
  faShareSquare = faShareSquare;
  uid: any = null;
  upvote = 0;
  downvote = 0;
  constructor(private afs: AngularFirestore, private auth: AuthService,) {
    this.postsCollection = afs.collection<any>('posts');
    this.auth.getUser().subscribe(
      (user) => {

        this.uid = user?.uid;
      })

  }

  ngOnInit(): void {

    if (this.post.vote) {

      Object.values(this.post.vote).map((eachValue: any) => {
        if (eachValue.upvote) {
          this.upvote += 1;
        }
        if (eachValue.downvote) {
          this.downvote += 1;
        }

      })
    }
  }

  upvotePost(id: any) {

    var exists = this.post.vote.map((eachValue: any) => {
      console.log("checking",eachValue.uid == this.uid)
      if (eachValue.uid == this.uid) {

        eachValue.upvote = 1;
        if (eachValue.downvote) {
          delete eachValue.downvote;
        }
        return eachValue;
      }


    })
    exists=exists.filter((eachValue:any)=>eachValue!=undefined)
    console.log("exists=>",exists);
    if ( exists.length) {
      console.log("triggering if")
      this.postsCollection.doc(`/${id}`).update({ vote: this.post.vote });
    }
    else {
      console.log("triggering here")
      var tempData = {
        uid: this.uid,
        upvote: 1
      }
      this.post.vote = [...this.post.vote, tempData]
      this.postsCollection.doc(`/${id}`).update({ vote: this.post.vote });
    }




  }
  downvotePost(id: any) {

    var exists = this.post.vote.map((eachValue: any, index: any) => {
      if (eachValue.uid == this.uid) {
        eachValue.downvote = 1;
        if (eachValue.upvote) {
          delete eachValue.upvote;
        }

        return eachValue;
      }

    })
    if (exists.length > 0) {
      this.postsCollection.doc(`/${id}`).update({ vote: this.post.vote });
    }
    else {

      var tempData = {
        uid: this.uid,
        downvote: 1
      }
      this.post.vote = [...this.post.vote, tempData]
      this.postsCollection.doc(`/${id}`).update({ vote: this.post.vote });
    }


  }

  getInstaUrl() {
    console.log("insta url")
  }

}
