import { IConfig } from './../../models/contree/config';
import { IParty } from './../../models/contree/party';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the PartyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const PARTIES_KEY = "zorgScore_parties";

@Injectable()
export class PartyProvider {

  private parties: IParty[];

  constructor(private storage: Storage) {
  }

  getParties(): Promise<IParty[]> {
    return new Promise(resolve => {
      this.storage.get(PARTIES_KEY).then((data) => {
        this.parties = JSON.parse(data) || [];
        return resolve(this.parties);
      });
    });
  }

  initParty(config: IConfig): Promise<IParty> {

    //   export interface ITeam {
    //     player1: IPlayer;
    //     player2: IPlayer;    
    // }

    //   export interface IContrat {
    //     contratId: number;
    //     team1Attacking: boolean;
    //     success: boolean;
    //     nbPoints: number;
    //     enchereList: IEnchere[];
    //     dealerId: number;
    //     team1: ITeam;
    //     team2: ITeam;
    // }

    // export interface IEnchere {
    //   enchereId: number;
    //   couleur?: ICouleur;
    //   nbPoints? : number;
    //   passe?: boolean;
    //   contre?: boolean;
    //   surcontre?: boolean;
    //   capot?: boolean;
    //   player?: IPlayer;
    // }

    return new Promise(resolve => {
      if(!this.parties)
        this.parties = [];
        
      let party: IParty = {
        id: this.parties.length + 1,
        partyDate: new Date(),
        config: config,
        contratList: [],
        scoreTeam1: 0,
        scoreTeam2: 0,
        currentTeam1: {
          player1 : {
            id:-1,
            nickName: "Joueur 1"
          },
          player2 : {
            id:-3,
            nickName: "Joueur 3"
          }
        },
        currentTeam2: {
          player1 : {
            id:-2,
            nickName: "Joueur 2"
          },
          player2 : {
            id:-4,
            nickName: "Joueur 4"
          }
        }
      }

      this.parties.push(party);
      console.info("PUSH DANS PARTIES");
      this.saveParties().then(() => {
        return resolve(party);
      });
    });
  }

  saveParty(party: IParty): Promise<IParty> {
    return new Promise(resolve => {
      let partyFound:IParty = this.parties.find((party) => {
        return party.id === party.id;
      })

      this.parties[this.parties.indexOf(partyFound)] = partyFound;
      this.saveParties().then(() => {
        return resolve(party);
      });
    });
  }

  saveParties(): Promise<any> {
    return this.storage.set(PARTIES_KEY, JSON.stringify(this.parties));
  }

  deleteParty(party: IParty): Promise<IParty[]> {
    return new Promise(resolve => {
      this.parties.splice(this.parties.indexOf(party), 1);
      this.saveParties().then(() => {
        return resolve(this.parties);
      });
    })
  }

  getParty(partyId: number): Promise<IParty>{
    return new Promise(resolve => {
      let partyFound:IParty = this.parties.find((party) => {
        return party.id === partyId;
      })
      return resolve(partyFound);      
    })
  }

}
