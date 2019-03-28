import { IPlayer } from './../../models/player';
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

/*
  Generated class for the PlayerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const PLAYERS_KEY = "zorgScore_players";

@Injectable()
export class PlayerProvider {

  private players: IPlayer[];

  constructor(private storage: Storage) {
  }

  getPlayers(): Promise<IPlayer[]> {
    return new Promise(resolve => {
      this.storage.get(PLAYERS_KEY).then((data) => {
        this.players = JSON.parse(data) || [];
        return resolve(this.players);
      });
    });
  }

  savePlayer(player: IPlayer): Promise<IPlayer> {
    return new Promise(resolve => {
      if (!player.id) {
        player.id = this.players.length + 1;
        this.players.push(player);
      }
      else{
        this.players.forEach(element => {
          if(element.id === player.id)
            element = player;
        });
      }
      
      this.savePlayers().then(() => {
        return resolve(player);
      });
    });
  }

  savePlayers(): Promise<any> {
    return this.storage.set(PLAYERS_KEY, JSON.stringify(this.players));
  }

  deletePlayer(player: IPlayer): Promise<IPlayer[]> {
    return new Promise(resolve => {
      this.players.splice(this.players.indexOf(player), 1);
      this.savePlayers().then(() => {
        return resolve(this.players);
      })
    })
  }
}
