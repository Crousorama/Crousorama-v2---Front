import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';

const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatRippleModule,
  MatProgressBarModule,
  MatInputModule,
  MatFormFieldModule,
  MatChipsModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatListModule,
  MatButtonToggleModule,
  MatDividerModule,
  MatSnackBarModule
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule { }
