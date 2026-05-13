import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { TripService } from '../services/trip.service';
import { throwError } from 'rxjs';
import { Trip } from '../models';

export const tripResolver: ResolveFn<Trip> = (route, state) => {
  const tripService = inject(TripService);

  const tripId = route.paramMap.get('tripId');

  if (tripId) {
    return  tripService.getTripById(tripId);
  } else {
    return throwError(() => new Error(`Trip ${tripId} not found`));
  }
};
