import { Injectable, signal } from '@angular/core';
import { BookingState } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BookingStateService {

  private readonly _bookingState = signal<BookingState | null>(null);
  readonly bookingState = this._bookingState.asReadonly();

  constructor() { }

  public setBookingData(tripId: string, seatIds: string[]): void {
    this._bookingState.set({
      tripId, seatIds
    })
  }

  public getBookingData(): BookingState | null {
    return this.bookingState();
  }

  clearBookingData(): void {
    this._bookingState.set(null);
  }
}
