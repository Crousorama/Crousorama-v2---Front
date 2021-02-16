import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';

const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatGridListModule,
  MatRippleModule,
  MatProgressBarModule
];

@NgModule({
  imports: material,
  exports: material,
})
export class MaterialModule { }
