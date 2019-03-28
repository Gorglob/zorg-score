import { HelperProvider } from './../../providers/helper/helper';
import { sortBy } from 'lodash';
import { IEnchere } from './../../models/contree/enchere';
import { IPlayer } from './../../models/player';
import { IContrat } from './../../models/contree/contrat';
import { betConfig } from './../../models/contree/betConfig';
import { IParty } from './../../models/contree/party';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PartyProvider } from '../../providers/party/party';
import { IEnchereType } from '../../models/contree/enchereType';

/**
 * Generated class for the PartyBetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-party-bet',
  templateUrl: 'party-bet.html',
})
export class PartyBetPage {

  title: string;
  currentParty: IParty;
  betScores: IEnchereType[];
  betCouleurs: string[];
  currentContrat: IContrat;
  currentBetTeam1: IEnchere;
  currentBetTeam2: IEnchere;
  lastTeamBettingTeam: number;
  lastCouleur: string;
  lastScore: IEnchereType;
  lastPlayer: IPlayer;
  maxCurrentScore: number;
  currentTeamActive: number;
  partyStarting: boolean;
  currentContre: boolean;
  currentSurContre: boolean;
  currentPlayers: IPlayer[];
  currentDealer: IPlayer;
  partyFinish: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private partyProvider: PartyProvider,
    public helperProvider : HelperProvider
  ) {
    this.title = "Partie en cours";
    this.betScores = betConfig.BET_SCORES;
    this.betCouleurs = betConfig.BET_COULEURS;
    this.currentBetTeam1 = {};
    this.currentBetTeam2 = {};
    this.maxCurrentScore = 0;
  }

  ionViewDidLoad() {
    this.partyProvider.getParty(this.navParams.data.idParty).then((response) => {
      console.info(response);
      this.currentParty = response;
      if (this.currentParty.contratList.length === 0) {
        this.setNewContrat(this.currentParty.currentTeam1.player1.id);        
      }
      else {
        this.currentContrat = this.currentParty.contratList[this.currentParty.contratList.length - 1];
        if(!this.currentContrat.dealerId){
          this.currentContrat.dealerId = this.currentParty.currentTeam1.player1.id;
        }
        this.currentContrat.enchereList = [];        
      }

      if(this.currentParty.scoreTeam1 >= this.currentParty.config.maxScore || this.currentParty.scoreTeam2 >= this.currentParty.config.maxScore){
        this.partyFinish = true;
      }

      this.getCurrentPlayers();
    });
  }

  setNewContrat(idDealer: number){
    this.resetCurrentValues();
    this.maxCurrentScore = undefined;
    this.currentTeamActive = undefined;
    
    this.currentParty.contratList.push({
      contratId: this.currentParty.contratList.length + 1,
      team1: this.currentParty.currentTeam1,
      team2: this.currentParty.currentTeam2,
      dealerId: idDealer,
      enchereList: []
    });

    this.currentContrat = this.currentParty.contratList[this.currentParty.contratList.length - 1];
  }

  getCurrentPlayers(){
    this.currentPlayers = [];
    this.currentPlayers.push(this.currentParty.currentTeam1.player1);
    this.currentPlayers.push(this.currentParty.currentTeam2.player1);
    this.currentPlayers.push(this.currentParty.currentTeam1.player2);    
    this.currentPlayers.push(this.currentParty.currentTeam2.player2);
    console.info("this.currentPlayers", this.currentPlayers, 'currentContre', this.currentContrat);
  }

  addBetByTeam(team1: boolean, player: IPlayer, couleur) {

  }

  previous() {
    //On supprime la dernière enchère
    this.currentContrat.enchereList.pop();

    //On reaffecte a chaque team leur dernière enchère
    let team1bets: IEnchere[] = this.currentContrat.enchereList.filter((bet) => {
      return bet.team1;
    });

    if (team1bets.length) {
      let sortedTab = sortBy(team1bets, function (bet: IEnchere) { return bet.enchereId });
      this.currentBetTeam1 = { ...sortedTab[sortedTab.length - 1] };
    }
    else {
      this.currentBetTeam1 = {};
    }

    let team2bets: IEnchere[] = this.currentContrat.enchereList.filter((bet) => {
      return !bet.team1;
    })

    if (team2bets.length) {
      let sortedTab = sortBy(team2bets, function (bet: IEnchere) { return bet.enchereId });
      this.currentBetTeam2 = { ...sortedTab[sortedTab.length - 1] };
    }
    else {
      this.currentBetTeam2 = {};
    }

    if (this.currentContrat.enchereList.length) {
      this.maxCurrentScore = this.currentContrat.enchereList[this.currentContrat.enchereList.length - 1].nbPoints.value;
      this.currentTeamActive = this.currentContrat.enchereList[this.currentContrat.enchereList.length - 1].team1 ? 1 : 2;
    }
    else {
      this.maxCurrentScore = undefined;
      this.currentTeamActive = undefined;
    }

    this.resetCurrentValues();
    this.maxCurrentScore = undefined;
  }

  resetCurrentValues(){
    this.lastCouleur = undefined;
    this.lastScore = undefined;
    this.lastPlayer = undefined;
    this.lastTeamBettingTeam = undefined;
    this.currentContre = false;
    this.currentSurContre = false;    
  }

  next() {
  }

  validate() {
    if (this.lastCouleur && this.lastScore && this.lastPlayer) {
      this.maxCurrentScore = this.lastScore.value;

      if (this.lastTeamBettingTeam === 1) {
        this.currentBetTeam1.couleur = this.lastCouleur;
        this.currentBetTeam1.nbPoints = this.lastScore;
        this.currentBetTeam1.team1 = true;
        this.currentBetTeam1.enchereId = this.currentContrat.enchereList.length + 1;
        this.currentTeamActive = 1;

        this.currentContrat.enchereList.push({ ...this.currentBetTeam1 });
      }
      else {
        this.currentBetTeam2.couleur = this.lastCouleur;
        this.currentBetTeam2.nbPoints = this.lastScore;
        this.currentBetTeam2.team1 = false;
        this.currentBetTeam2.enchereId = this.currentContrat.enchereList.length + 1;
        this.currentTeamActive = 2;
        this.currentContrat.enchereList.push({ ...this.currentBetTeam2 });
      }

      this.resetCurrentValues();
      console.info("this.currentContrat.enchereList", this.currentContrat.enchereList);
    }
  }

  clickPlayer(player: IPlayer, team1: boolean) {
    this.lastTeamBettingTeam = team1 ? 1 : 2;
    this.lastPlayer = player;

    if (team1) {
      this.currentBetTeam1.player = { ...player };
    }
    else {
      this.currentBetTeam2.player = { ...player };
    }

    this.validate();
  }

  clickCouleur(couleur: string) {
    this.lastCouleur = couleur;
    this.validate();

  }

  clickBet(betScore: IEnchereType) {
    console.info("betScore", betScore);
    this.lastScore = betScore;
    this.validate();
  }

  start() {
    this.partyStarting = true;
    let lastBet = this.currentContrat.enchereList[this.currentContrat.enchereList.length - 1];
    this.currentContrat.team1Attacking = lastBet.team1;
    this.currentContrat.nbPoints = lastBet.nbPoints.value;
    this.currentContrat.couleur = lastBet.couleur;
    this.currentContrat.contre = lastBet.contre;
    this.currentContrat.surcontre = lastBet.surcontre;
  }

  lost() {
    this.currentContrat.success = false;
    
    if(this.currentContrat.contre && !this.currentContrat.surcontre){
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam2" : "scoreTeam1"] += this.currentContrat.capot ? 500 : 320;
    }
    else if(this.currentContrat.contre && this.currentContrat.surcontre){
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam2" : "scoreTeam1"] += this.currentContrat.capot ? 1000 : 640;
    } 
    else {
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam2" : "scoreTeam1"] += this.currentContrat.capot ? 250 : 160;
    }

    this.saveParty();
  }

  win() {
    this.currentContrat.success = true;

    if(this.currentContrat.contre && !this.currentContrat.surcontre){
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam1" : "scoreTeam2"] += this.currentContrat.capot ? 500 : 320;
    }
    else if(this.currentContrat.contre && this.currentContrat.surcontre){
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam1" : "scoreTeam2"] += this.currentContrat.capot ? 1000 : 640;
    } 
    else {
      this.currentParty[this.currentContrat.team1Attacking ? "scoreTeam1" : "scoreTeam2"] += this.currentContrat.capot ? 250 : this.currentContrat.nbPoints;
    }

    this.saveParty();
  }

  saveParty() {
    //Sauvegarde de la party
    this.partyProvider.saveParty(this.currentParty).then((response) => {
      // this.navCtrl.push(PartyBetPage, { idParty: this.currentParty.id });      
      if(this.currentParty.scoreTeam1 >= this.currentParty.config.maxScore || this.currentParty.scoreTeam2 >= this.currentParty.config.maxScore){
        this.partyFinish = true;
      }
      else{
        this.setNewContrat(this.getNextDealer(this.currentContrat.dealerId));
        this.partyStarting = false;
        this.currentBetTeam1 = {};
        this.currentBetTeam2 = {};
      }
      
    });
  }

  contre(){
    if(this.currentContrat.enchereList.length)
      this.currentContrat.enchereList[this.currentContrat.enchereList.length - 1].contre = this.currentContre;
  }

  surContre(){
    if(this.currentContrat.enchereList.length)
      this.currentContrat.enchereList[this.currentContrat.enchereList.length - 1].surcontre = this.currentSurContre;
  }

  getNextDealer(currentDealer :number): number{
        
    if(this.currentParty.currentTeam1.player1.id === currentDealer){
      //Si joueur 1 alors le prochain est joueur 4
      return this.currentParty.currentTeam2.player2.id;
    }else if(this.currentParty.currentTeam1.player2.id === currentDealer){
      //Si joueur 3 alors le prochain est joueur 2
      return this.currentParty.currentTeam2.player1.id;
    }else if(this.currentParty.currentTeam2.player1.id === currentDealer){
      //Si joueur 2 alors le prochain est joueur 1
      return this.currentParty.currentTeam1.player1.id;
    }
    else{
      //Si joueur 4 alors le prochain est joueur 3
      return this.currentParty.currentTeam1.player2.id;
    }    
  }

  getAvatar(index : number){
    return this.helperProvider.getAvatar(index);
  }
}
