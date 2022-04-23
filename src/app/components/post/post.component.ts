import { Component, Input, OnInit } from '@angular/core';
import {
  faThumbsUp,
  faThumbsDown,
  faShareSquare,
} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!:any;
  faThumbsUp=faThumbsUp;
  faThumbsDown=faThumbsDown;
  faShareSquare=faShareSquare;
  imageUrl="https://images.pexels.com/photos/9396346/pexels-photo-9396346.jpeg?cs=srgb&dl=pexels-alyssa-rose-9396346.jpg&fm=jpg"
  constructor() { }

  ngOnInit(): void {
  }

  upvotePost(){
    console.log("upvote")
  }
  downvotePost(){
    console.log("Downvotepost")
  }

  getInstaUrl(){
    console.log("insta url")
  }

}
