import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { selectAllTags } from '../Store/Selectors/selectors';
import * as actions from '../Store/actions/tagsActions';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
  constructor(private store:Store<AppState>){}

  tags$ = this.store.select(selectAllTags)
 ngOnInit(): void {
    this.store.dispatch(actions.getAllTags()) 
 }
}
