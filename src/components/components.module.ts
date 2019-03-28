import { NgModule } from '@angular/core';
import { ScoreTeamComponent } from './score-team/score-team';
import { CommonModule } from '@angular/common';
@NgModule({
	declarations: [ScoreTeamComponent],
	imports: [CommonModule],
	exports: [ScoreTeamComponent]
})
export class ComponentsModule {}
