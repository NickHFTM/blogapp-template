import { DestroyRef, Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly mediaQuery = window.matchMedia('(max-width: 767px)');

  readonly isMobile = signal(this.mediaQuery.matches);

  constructor() {
    const listener = (event: MediaQueryListEvent) => {
      this.isMobile.set(event.matches);
    };

    this.mediaQuery.addEventListener('change', listener);

    this.destroyRef.onDestroy(() => {
      this.mediaQuery.removeEventListener('change', listener);
    });
  }
}
