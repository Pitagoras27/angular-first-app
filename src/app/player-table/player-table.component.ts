import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Player } from '../interfaces/player';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-player-table',
  templateUrl: './player-table.component.html',
  styleUrls: ['./player-table.component.scss']
})
export class PlayerTableComponent implements OnInit {
  public players$: Observable<Player[]>;
  // public playerSelected: Player;

  constructor(private playerService: PlayerService) {
    this.players$ = this.playerService.getPlayers();
  }

  ngOnInit(): void {
    // this.players$ = this.playerService.getPlayers();
  }

  newPlayer() {}

}
