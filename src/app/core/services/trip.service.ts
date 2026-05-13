import { Injectable } from '@angular/core';
import { Trip, TripSearchRequest } from '../models';
import { Observable, of, throwError } from 'rxjs';

const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

const dep1 = new Date(tomorrow);
dep1.setHours(9, 0, 0, 0);

const arr1 = new Date(dep1);
arr1.setMinutes(arr1.getMinutes() + 960);

// Trip 2 dates
const dep2 = new Date(tomorrow);
dep2.setHours(6, 0, 0, 0);
const arr2 = new Date(dep2);
arr2.setMinutes(arr2.getMinutes() + 300);

// Trip 3 dates
const dep3 = new Date(tomorrow);
dep3.setHours(23, 0, 0, 0);
const arr3 = new Date(dep3);
arr3.setMinutes(arr3.getMinutes() + 480);

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly _trips: Trip[] = [
    {
      id: 'trip-1',
      origin: 'Bangalore',
      destination: 'Mumbai',
      departureTime: dep1,
      arrivalTime: arr1,
      duration: 960, // in minutes
      seatsAvailable: 32,
      price: 899,
      operator: 'VRL Travels',
      vehicleType: 'bus',
    },
    {
      id: 'trip-2',
      origin: 'Delhi',
      destination: 'Jaipur',
      departureTime: dep2,
      arrivalTime: arr2,
      duration: 300, // in minutes
      seatsAvailable: 20,
      price: 399,
      operator: 'RSRTC',
      vehicleType: 'bus',
    },
    {
      id: 'trip-3',
      origin: 'Chennai',
      destination: 'Hyderabad',
      departureTime: dep3,
      arrivalTime: arr3,
      duration: 480, // in minutes
      seatsAvailable: 120,
      price: 650,
      operator: 'Indian Railways',
      vehicleType: 'train',
    },
  ];

  constructor() {}

  public search(request: TripSearchRequest): Observable<Trip[]> {
    return of(
      this._trips.filter(
        (trip) =>
          trip.origin.toLowerCase() === request.origin.toLowerCase() &&
          trip.destination.toLowerCase() === request.destination.toLowerCase(),
      ),
    );
  }

  public getTripById(tripId: string): Observable<Trip> {
    const trip = this._trips.find(trip => trip.id === tripId);
    if(!trip) return throwError(() => new Error(`Trip ${tripId} not found`));
    return of(trip);
  }
}
