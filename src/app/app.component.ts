import {
  Component,
  afterRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { ChangeDetectionDemoComponent } from './components/change-detection-demo/change-detection-demo.component';
import { AsyncPipe } from '@angular/common';
import { BellComponent } from './components/bell/bell.component';
import { PrimaryButtonComponent } from './components/primary-button/primary-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <nav class="p-4 bg-teal-800 text-white text-xl shadow-xl">
      Angular Zoneless Apps
    </nav>
    <div class="flex justify-between items-center px-28 py-3 gap-5">
      <div class="flex gap-5">
        <app-primary-button (click)="updateChildOneInput()"
          >Trigger Input (property)</app-primary-button
        >
        <app-primary-button (click)="updateChildOneInputAfterTimeout()"
          >after 2 seconds</app-primary-button
        >
      </div>

      <div class="flex gap-5">
        <app-bell #cdBell />
        <app-bell #renderBell bellType="render" />
      </div>
      <div class="flex gap-5">
        <app-primary-button (click)="updateChildTwoInput()"
          >Trigger Input (signal)</app-primary-button
        >
        <app-primary-button (click)="updateChildTwoInputAfterTimeout()"
          >after 2 seconds</app-primary-button
        >
      </div>
    </div>
    <div class="flex gap-4 p-3 justify-evenly items-center">
      <app-change-detection-demo [inputData]="childOneInput" />
      <app-change-detection-demo [inputData]="childTwoInput()" />
    </div>
  `,
  styles: `

    :host {
      height: 100vh;
    }

  `,
  imports: [
    ChangeDetectionDemoComponent,
    AsyncPipe,
    BellComponent,
    PrimaryButtonComponent,
  ],
})
export class AppComponent {
  cdBell = viewChild.required<BellComponent>('cdBell');
  renderBell = viewChild.required<BellComponent>('renderBell');

  childOneInput = 'Input Data';
  childTwoInput = signal('Input Data');

  constructor() {
    afterRender(() => {
      this.renderBell().ring();
    });
  }

  ngAfterViewChecked() {
    this.cdBell().ring();
  }

  updateChildOneInput() {
    this.childOneInput = `New Input ${Math.round(Math.random() * 100)}`;
  }

  updateChildOneInputAfterTimeout() {
    setTimeout(() => {
      this.childOneInput = `New Input ${Math.round(Math.random() * 100)}`;
    }, 2000);
  }

  updateChildTwoInput() {
    this.childTwoInput.set(`New Input ${Math.round(Math.random() * 100)}`);
  }

  updateChildTwoInputAfterTimeout() {
    setTimeout(() => {
      this.childTwoInput.set(`New Input ${Math.round(Math.random() * 100)}`);
    }, 2000);
  }
}
