import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { TeamService, TeamsTableHeaders } from '../services/team.service';
import { Team } from '../interfaces/team';
import { Countries } from '../interfaces/player';

@Component({
  selector: 'app-team-table', // selector visualizado en el template HTML
  templateUrl: './team-table.component.html',
  styleUrls: ['./team-table.component.scss']
})
export class TeamTableComponent implements OnInit {
  public teams$: Observable<Team[]> = this.teamService.getTeams();
  // public teams$ = this.teamService.getTeams();
  public tableHeaders = TeamsTableHeaders;

  constructor(private teamService: TeamService ) { }

  // Metodo del componente, indicado para realizar peticiones.
  ngOnInit(): void {
    // this.teamService.getTeams();
    // como getTeams devuelve un observable. pipe es un método disponible
    this.teamService
      .getTeams()
      .pipe(take(1))
      .subscribe(teams => {
        if (teams.length === 0) {
          const team: Team = {
            name: 'MyAmazingTeam',
            country: Countries.Argentina,
            players: null
          };
          this.teamService.addTeam(team);
        }
      });
  }

}
