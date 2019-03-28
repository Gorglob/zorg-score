import { IEnchereType } from './enchereType';
import { IPlayer } from './../player';
import { ICouleur } from './couleur';

export interface IEnchere {
    enchereId?: number;
    // couleur?: ICouleur;
    couleur?: string;
    nbPoints? : IEnchereType;
    passe?: boolean;
    contre?: boolean;
    surcontre?: boolean;
    capot?: boolean;
    player?: IPlayer;
    team1?:boolean;    
}