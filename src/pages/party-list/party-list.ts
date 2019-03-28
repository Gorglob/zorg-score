import { IParty } from './../../models/contree/party';
import { PartyProvider } from './../../providers/party/party';
import { PartyPage } from '../party/party';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'party-list',
  templateUrl: 'party-list.html'
})
export class PartyListPage {

  parties: IParty[];

  constructor(
    public navCtrl: NavController,
    private partyProvider: PartyProvider
    ) {

  }

  ionViewWillEnter() {
    console.info("ionViewWillEnter ");
    this.partyProvider.getParties().then((response) => {
      this.parties = response;
      console.log(this.parties)
    });
  }

  addParty() {
    this.navCtrl.push(PartyPage);
  }

  editParty(party: IParty){
    this.navCtrl.push(PartyPage, { idParty : party.id});
  }
}
