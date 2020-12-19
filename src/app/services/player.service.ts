import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Player } from '../interfaces/player';


@Injectable({
  providedIn: 'root' // Con el atributo providedIn no es necesario importarlo dentro del modulo pricipal, ya que así este servicio se encuentra disponible de forma global
})

export class PlayerService {
  private playersDB: AngularFireList<Player>;

  constructor(private db: AngularFireDatabase) {
    this.playersDB = this.db.list('/players', ref => ref.orderByChild('name'));
  }

  // getPlayers(): Observable<Player[]> {
  getPlayers(): Observable<any> {
    return this.playersDB.snapshotChanges().pipe(
      map(changes => {
        return changes.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
      })
    );
  }

  addPlayer(player: Player) {
    return this.playersDB.push(player);
  }

  deletePlayer(id: string) {
    this.db.list('/players').remove(id);
  }

  editPlayer(newPlayerData: any) {
    const $key = newPlayerData.$key;
    delete newPlayerData.$key;
    this.db.list('/players').update($key, newPlayerData);
  }
}
