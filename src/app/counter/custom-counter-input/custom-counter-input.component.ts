import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {changedMyName, customIncrement} from '../state/counter.actions';
import {getMyName} from '../state/counter.selectors';
import {Observable} from 'rxjs';
import {AppState} from '../../store/app.state';

@Component({
  selector: 'app-custom-counter-input',
  templateUrl: './custom-counter-input.component.html',
  styleUrls: ['./custom-counter-input.component.css']
})
export class CustomCounterInputComponent implements OnInit {
  value: number;
  myName: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.myName = this.store.select(getMyName);
  }

  onAdd() {
    this.store.dispatch(customIncrement({count: this.value}));
  }

  onChangeMyName() {
    this.store.dispatch(changedMyName());
  }
}
