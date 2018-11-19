import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format, subDays } from 'date-fns';
import { auth } from 'firebase/app';

type Day = 'today' | 'yesterday';
type Meal = 'breakfast' | 'lunch' | 'dinner' | 'snacks';
type Type = 'meat' | 'ethical-meat' | 'fish' | 'vegetarian' | 'vegan';

interface DayData {
  day: string;
  meal: Meal;
  type: Type;
}

interface FormDayData {
  day: Day;
  meal: Meal;
  type: Type;
}

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="fireAuth.user | async; else login">
      <form [formGroup]="form" (submit)="onSubmit()">
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
      <div *ngIf="feedback" class="feedback">
        {{ feedback }}
      </div>
    </ng-container>
    <ng-template #login>
      <button class="submit" (click)="onLogin()">Login</button>
    </ng-template>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public form: FormGroup;

  public feedback: string | null;

  public all: DayData[];

  private data: AngularFirestoreCollection<DayData>;

  constructor(
    private db: AngularFirestore,
    private fireAuth: AngularFireAuth,
  ) {
    this.form = new FormGroup({
      day: new FormControl('today', Validators.required),
      meal: new FormControl(null, Validators.required),
      type: new FormControl(null, Validators.required),
    });
    this.feedback = null;
  }

  public ngOnInit(): void {
    this.data = this.db.collection<DayData>('daydata');
    this.data.valueChanges().subscribe((data) => this.all = data);
  }

  public async onLogin(): Promise<void> {
    await this.fireAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  public async onSubmit(): Promise<void> {
    this.feedback = null;
    if (!this.form.valid) {
      this.feedback = 'Form incomplete';
      return;
    }

    const formData: FormDayData = this.form.value;
    const date = format(formData.day === 'yesterday' ? subDays(new Date(), 1) : new Date(), 'YYYY-MM-DD');
    const data: DayData = {
      ...formData,
      day: date,
    };
    const id = `${date}-${data.meal}`;

    try {
      await this.data.doc(id).set(data);
      this.feedback = 'Added!';
    } catch (e) {
      this.feedback = 'Error';
    }
  }
}
