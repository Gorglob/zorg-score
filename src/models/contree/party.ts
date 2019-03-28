import { ITeam } from './team';
import { IConfig } from './config';
import { IContrat } from './contrat';

export interface IParty {
    id: number;
    partyDate: Date;    
    contratList: IContrat[];    
    scoreTeam1: number;//Score final Equipe1 (player1 et player3)
    scoreTeam2: number;//Score final Equipe2 (player2 et player4 )
    config: IConfig;
    currentTeam1: ITeam;
    currentTeam2: ITeam;
}