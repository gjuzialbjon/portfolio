import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CardsRoutingModule } from './cards-routing.module'
import { CardsComponent } from './components/cards/cards.component'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { SuitPositionPipe } from '@app/core/pipes/suit-position.pipe'
import { ValueToTextPipe } from '@app/core/pipes/value-to-text.pipe'
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from './components/table/table.component';
import { HiddenCardsComponent } from './components/hidden-cards/hidden-cards.component';
import { RulesComponent } from './components/rules/rules.component'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'

@NgModule({
  declarations: [CardsComponent, ValueToTextPipe, SuitPositionPipe, TableComponent, HiddenCardsComponent, RulesComponent],
  imports: [CommonModule, CardsRoutingModule, DragDropModule, NgbDropdownModule, TranslateModule.forChild()],
})
export class CardsModule {}
