import { HelperProvider } from './../../providers/helper/helper';
import { IPlayer } from './../../models/player';
import { PlayerProvider } from './../../providers/player/player';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { PlayerPage } from './../player/player';

/**
 * Generated class for the PlayerListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player-list',
  templateUrl: 'player-list.html',
})
export class PlayerListPage {

  players: IPlayer[] = [];
  searchPlayerText: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private playerProvider: PlayerProvider, 
    public alertCtrl: AlertController,
    public helperProvider : HelperProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerListPage');

  }

  ionViewWillEnter() {
    console.info("ionViewWillEnter ");
    this.getPlayers();
  }

  getPlayers() {
    this.playerProvider.getPlayers().then((data) => {
      this.players = data;
      console.info("players", this.players);
    });
  }

  addPlayer() {
    this.navCtrl.push(PlayerPage);
  }

  delete(player: IPlayer) {
    console.info("delete", player);
    let alert = this.alertCtrl.create({
      title: 'Supprimer un joueur',
      message: `Voulez vous vraiment supprimer : ${player.nickName} ?`,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Oui, supprimer',
          handler: () => {
            this.playerProvider.deletePlayer(player).then((data) => {
              this.players = data;
            });
          }
        }
      ]
    });
    alert.present();
  }

  filterPlayers(ev: any) {
    if (this.searchPlayerText && this.searchPlayerText.length > 0) {
      this.players = this.players.filter((player) => {
        return player.nickName.toLowerCase().includes(this.searchPlayerText.toLowerCase()) || player.firstName.toLowerCase().includes(this.searchPlayerText.toLowerCase()) || player.lastName.toLowerCase().includes(this.searchPlayerText.toLowerCase());
      });
    }
    else {
      this.getPlayers();
    }
  }

  editPlayer(player: IPlayer) {
    this.navCtrl.push(PlayerPage, { player });
  }

  getAvatar(index : number){
    return this.helperProvider.getAvatar(index);
  }
}
