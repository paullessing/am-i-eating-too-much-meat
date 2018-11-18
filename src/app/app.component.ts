import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  template: `
    <form [formGroup]="form">
      <div class="row">
        <label class="input-button">
          <input
            class="input-button__input"
            type="radio"
            formControlName="day"
            value="yesterday"
          >
          <span class="input-button__text">
            Yesterday
          </span>
        </label>
        <label class="input-button">
          <input
            class="input-button__input"
            type="radio"
            formControlName="day"
            value="today"
          >
          <span class="input-button__text">
            Today
          </span>
        </label>
      </div>
    </form>
    {{ form.value | json }}
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public form: FormGroup;

  constructor() {
    this.form = new FormGroup({
      day: new FormControl(null, Validators.required)
    });
  }
}
