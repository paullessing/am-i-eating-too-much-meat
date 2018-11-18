import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-button',
  template: `
    <label class="input-button">
      <input
        class="input-button__input"
        type="radio"
        [value]="value"
        [formControl]="control"
        [name]="name"
      >
      <span class="input-button__text">
        <ng-content></ng-content>
      </span>
    </label>
  `,
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {

  @Input()
  public control: FormControl;

  @Input()
  public value: string;

  @Input()
  public name: string;
}
