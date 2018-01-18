import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import {AngularFireDatabase, FirebaseObjectObservable} from "angularfire2/database-deprecated";
import {Profile} from "../../models/profile";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  profileData: FirebaseObjectObservable<{Profile}>;

  constructor(
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFireDatabase,
    private toast: ToastController,
    public navCtrl: NavController
  ) {}

  ionViewWillLoad(){
    this.afAuth.authState.take(1).subscribe(data => {
      if(data && data.email && data.uid) {
        this.toast.create({
          message: `Bem Vindo ao APP_NAME, ${data.email}`,
          duration: 3000
        }).present();

        this.profileData = this.afDatabase.object(`profile/${data.uid}`);
      }else{
        this.toast.create({
          message: `Não conseguimos lhe autenticar`,
          duration: 3000
        }).present();
      }
    });
  }

}
