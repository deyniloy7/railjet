export interface TripSearchRequest {
  origin: string;
  destination: string;
  date: Date;
  numberOfPassengers: number;
  tripType: 'one-way' | 'round-trip';
}
