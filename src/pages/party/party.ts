import { HelperProvider } from './../../providers/helper/helper';
import { PartyBetPage } from './../party-bet/party-bet';
import { PlayerPage } from './../player/player';
import { PlayerProvider } from './../../providers/player/player';
import { IPlayer } from './../../models/player';
import { PartyProvider } from './../../providers/party/party';
import { IParty } from './../../models/contree/party';
import { IConfig } from './../../models/contree/config';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the PartyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-party',
  templateUrl: 'party.html',
})
export class PartyPage {

  private title: string;
  private config: IConfig;
  private currentParty: IParty;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private partyProvider: PartyProvider,
    private playerProvider: PlayerProvider,
    public alertCtrl: AlertController,
    public modalController: ModalController,
    public helperProvider : HelperProvider
  ) {
    this.config = {
      typeScoreAnnounced: true,
      maxScore: 1000
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PartyPage');
    this.title = this.navParams.data.idParty ? "Modification d'une partie" : "Création d'une partie";

    if (!this.navParams.data.idParty) {
      console.info("PAS D'IDPARTY DONC INIT");
      this.partyProvider.initParty(this.config).then((party) => {
        this.currentParty = party;
      });
    }
    else {
      this.partyProvider.getParty(this.navParams.data.idParty).then((response) => {
        this.currentParty = response;
      })
    }
  }

  getPlayerName(player: IPlayer) {
    return player.nickName || `${player.firstName} ${player.lastName}`;
  }

  editPlayer(index: number) {
    this.playerProvider.getPlayers().then((players) => {
      if (players.length) {
        players = players.filter((player) => {
          if (this.currentParty.currentTeam1.player1.id !== player.id
            && this.currentParty.currentTeam1.player2.id !== player.id
            && this.currentParty.currentTeam2.player1.id !== player.id
            && this.currentParty.currentTeam2.player2.id !== player.id) {
            return player;
          }
        });
        if (players.length) {
          let alert = this.alertCtrl.create();
          alert.setTitle('Choix d\'un joueur');

          players.forEach(player => {
            alert.addInput({
              type: 'radio',
              label: this.getPlayerName(player),
              value: player.id.toString(),
              checked: false
            });
          });

          alert.addButton('Annuler');
          alert.addButton({
            text: 'Valider',
            handler: data => {
              console.info("SelectedPlayer", data);
              let playerSearch = players.find((p) => {
                return p.id.toString() === data;
              });

              if (playerSearch) {
                switch (index) {
                  case 1:
                    this.currentParty.currentTeam1.player1 = playerSearch;
                    break;
                  case 2:
                    this.currentParty.currentTeam2.player1 = playerSearch;
                    break;
                  case 3:
                    this.currentParty.currentTeam1.player2 = playerSearch;
                    break;
                  case 4:
                    this.currentParty.currentTeam2.player2 = playerSearch;
                    break;
                }
              }
            }
          });

          alert.present();
        }
      }
    });
  }

  createPlayer() {
    const popover = this.modalController.create(PlayerPage);
    popover.present();
  }

  startParty() {
    //Sauvegarde de la party
    this.partyProvider.saveParty(this.currentParty).then((response) => {
      this.navCtrl.push(PartyBetPage, { idParty: this.currentParty.id });
    });
  }

  getAvatar(index : number){
    return this.helperProvider.getAvatar(index);
  }
}
