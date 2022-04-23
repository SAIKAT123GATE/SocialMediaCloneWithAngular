import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:AngularFireAuth) { }

  loginWithEmail(email:string,password:string){
    return this.auth.signInWithEmailAndPassword(email,password);
  }

  getUser(){
    return this.auth.authState
  }

  logOut(){
    return this.auth.signOut();
  }

  signupWithEmailAndPassword(email:string,password:string){
    console.log("email=>",email,"pass",password)
    return this.auth.createUserWithEmailAndPassword(email,password);
  }
}
