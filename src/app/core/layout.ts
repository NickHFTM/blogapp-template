import { DestroyRef, Injectable, inject, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private readonly destroyRef = inject(DestroyRef);

  private readonly mediaQuery =
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(max-width: 767px)')
      : null;

  readonly isMobile = signal(this.mediaQuery?.matches ?? false);

  constructor() {
    if (!this.mediaQuery) {
      return;
    }

    const listener = (event: MediaQueryListEvent) => {
      this.isMobile.set(event.matches);
    };

    this.mediaQuery.addEventListener('change', listener);

    this.destroyRef.onDestroy(() => {
      this.mediaQuery?.removeEventListener('change', listener);
    });
  }
}
