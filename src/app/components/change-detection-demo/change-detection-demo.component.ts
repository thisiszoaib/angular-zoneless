import { Component, inject, input, signal, viewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { AsyncPipe, NgClass } from '@angular/common';
import { BellComponent } from '../bell/bell.component';

@Component({
  selector: 'app-change-detection-demo',
  standalone: true,
  template: `
    <div
      class="p-5 min-w-full grid grid-cols-2 grid-rows-2 gap-8 relative border-2 rounded"
    >
      <div
        class="rounded-xl bg-slate-100 shadow-lg p-6 flex flex-col justify-center items-center gap-6"
      >
        <section class="text-center">
          <p>Property Value</p>
          <p class="font-bold">{{ propertyData }}</p>
        </section>

        <div class="flex gap-2">
          <app-primary-button (click)="updateProperty()">
            Update
          </app-primary-button>
          <app-primary-button (click)="updatePropertyAfterTimeout()">
            after 2s timeout
          </app-primary-button>
        </div>
      </div>
      <div
        class="rounded-xl bg-slate-100 shadow-lg p-6 flex flex-col justify-center items-center gap-6"
      >
        <section class="text-center">
          <p>Signal Value</p>
          <p class="font-bold">{{ signalData() }}</p>
        </section>
        <div class="flex gap-2">
          <app-primary-button (click)="updateSignal()">
            Update
          </app-primary-button>
          <app-primary-button (click)="updateSignalAfterTimeout()">
            after 2s timeout
          </app-primary-button>
        </div>
      </div>
      <div
        class="rounded-xl bg-slate-100 shadow-lg p-6 flex flex-col justify-center items-center gap-6"
      >
        <section class="text-center">
          <p>Input Value</p>
          <p class="font-bold">{{ inputData() }}</p>
        </section>
      </div>
      <div
        class="rounded-xl bg-slate-100 shadow-lg p-6 flex flex-col justify-center items-center gap-6"
      >
        <section class="text-center">
          <p>Observable Value</p>
          <p class="font-bold">{{ obsData$ | async }}</p>
        </section>
        <div class="flex gap-2">
          <app-primary-button (click)="updateObs()">
            Update
          </app-primary-button>
          <app-primary-button (click)="updateObsAfterTimeout()">
            after 2s timeout
          </app-primary-button>
        </div>
      </div>
      <app-bell
        class="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
      />
    </div>
  `,
  styles: `
  


  `,
  imports: [PrimaryButtonComponent, AsyncPipe, NgClass, BellComponent],
})
export class ChangeDetectionDemoComponent {
  propertyData = 'Property Data';
  signalData = signal('Signal Data');

  inputData = input<string | null>();

  obsData$ = new BehaviorSubject<string>('Observable Data');

  bell = viewChild.required(BellComponent);

  updateProperty() {
    this.propertyData = 'Property updated with button';
  }

  updatePropertyAfterTimeout() {
    setTimeout(() => {
      this.propertyData = 'Property updated after 2 seconds';
    }, 2000);
  }

  updateSignal() {
    this.signalData.set('Signal updated with button');
  }

  updateSignalAfterTimeout() {
    setTimeout(() => {
      this.signalData.set('Signal updated after 2 seconds');
    }, 2000);
  }

  updateObs() {
    this.obsData$.next('Observable updated with button');
  }

  updateObsAfterTimeout() {
    setTimeout(() => {
      this.obsData$.next('Observable updated after 2 seconds');
    }, 2000);
  }

  ngAfterViewChecked() {
    this.bell().ring();
  }
}
