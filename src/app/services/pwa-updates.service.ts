import { Injectable } from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {interval} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class PwaUpdatesService {

  constructor(
    public updates: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    if (updates.isEnabled) {
      interval(1000 * 60 * 60).subscribe(() => updates.checkForUpdate()
        .then(() => console.log('checking for updates')));
    }
  }

  public checkForUpdates(): void {
    this.updates.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    const dialog = this.snackBar.open('Une nouvelle version existe', 'Rafraichir');

    dialog.afterDismissed().subscribe(() => {
      console.log('updating to new version');
      this.updates.activateUpdate().then(() => document.location.reload());
    });
  }

}
