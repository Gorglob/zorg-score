import { PlayerProvider } from './../../providers/player/player';
import { IPlayer } from './../../models/player';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  private title: string;
  private currentPlayer: IPlayer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private playerProvider: PlayerProvider, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.title = this.navParams.data.player ? "Modification du joueur" : "Création d'un joueur";
    this.currentPlayer = this.navParams.data.player || {};
  }

  save() {
    if(!this.currentPlayer.nickName){
      this.currentPlayer.nickName = `${this.currentPlayer.firstName} ${this.currentPlayer.lastName}`;
    }
    this.playerProvider.savePlayer(this.currentPlayer).then((player) => {
      this.currentPlayer = player;
      this.navCtrl.pop();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }
}
