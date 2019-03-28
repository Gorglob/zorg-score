import { ITeam } from './team';
import { IEnchere } from './enchere';

export interface IContrat {
    contratId: number;
    team1Attacking?: boolean;
    success?: boolean;
    nbPoints?: number;
    couleur?: string;
    enchereList?: IEnchere[];    
    dealerId?: number;
    team1: ITeam;
    team2: ITeam;
    passe?: boolean;
    contre?: boolean;
    surcontre?: boolean;
    capot?: boolean;
}