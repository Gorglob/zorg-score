import { IParty } from './../../models/contree/party';
import { Component, Input } from '@angular/core';

/**
 * Generated class for the ScoreTeamComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'score-team',
  templateUrl: 'score-team.html'
})
export class ScoreTeamComponent {

  text: string;
  @Input() party : IParty;

  constructor() {
    
  }
}
