import { Injectable } from '@angular/core';
import { Booking, CreateBookingRequest } from '../models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly _mockBooking: Booking = {
    id: 'booking-1',
    status: 'confirmed',
    tripId: 'trip-1',
    ticketId: 'ticket-1',
    userId: 'user-1',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 10 * 60 * 1000),
  }

  constructor() { }

  public createBooking(createBookingRequest: CreateBookingRequest): Observable<Booking> {
    return of(this._mockBooking);
  }
}
