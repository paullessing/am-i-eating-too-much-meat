import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <div class="row">
        <app-button
          class="row__input"
          [control]="form.controls.day"
          value="today"
          name="day"
        >Today</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.day"
          value="yesterday"
          name="day"
        >Yesterday</app-button>
      </div>
      <div class="row">
        <app-button
          class="row__input"
          [control]="form.controls.meal"
          value="breakfast"
          name="meal"
        >Breakfast</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.meal"
          value="lunch"
          name="meal"
        >Lunch</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.meal"
          value="dinner"
          name="meal"
        >Dinner</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.meal"
          value="snacks"
          name="meal"
        >Snacks</app-button>
      </div>
      <div class="row">
        <app-button
          class="row__input"
          [control]="form.controls.type"
          value="meat"
          name="type"
        >Meat</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.type"
          value="ethical-meat"
          name="type"
        >Meat (Ethical)</app-button>
        <app-button
          class="row__input"
          style="margin-right: 50%"
          [control]="form.controls.type"
          value="fish"
          name="type"
        >Fish</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.type"
          value="vegetarian"
          name="type"
        >Vegetarian</app-button>
        <app-button
          class="row__input"
          [control]="form.controls.type"
          value="vegan"
          name="type"
        >Vegan</app-button>
      </div>
      <button type="submit" class="submit">Send</button>
    </form>
    {{ form.value | json }}
    {{ form.valid | json }}
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      day: new FormControl('today', Validators.required),
      meal: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required)
    });
  }
}
