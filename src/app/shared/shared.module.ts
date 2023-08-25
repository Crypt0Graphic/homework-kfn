import { NgModule } from '@angular/core';
import { FilterPipe } from './pipes/filter.pipe';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [FilterPipe],
  exports: [CommonModule, FilterPipe],
})
export class SharedModule {}
