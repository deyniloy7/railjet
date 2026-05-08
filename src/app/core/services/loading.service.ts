import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private readonly _loadingCount = signal<number>(0);

  readonly isLoading = computed(() => this._loadingCount() > 0);

  increment() {
    this._loadingCount.update((c) => c + 1);
  }
  
  decrement() {
    this._loadingCount.update((c) => c - 1);
  }
}
