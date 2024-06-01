import { Injectable, NgZone } from '@angular/core';
import { animate } from 'motion';

@Injectable({
  providedIn: 'root',
})
export class AnimateService {
  constructor(private zone: NgZone) {}

  animateBell(element: HTMLElement) {
    this.zone.runOutsideAngular(() => {
      animate(
        element,
        {
          transform: ['rotate(45deg)', 'rotate(-45deg)', 'none'],
        },
        {
          offset: [0, 0.5, 1],
        }
      );
    });
  }
}
