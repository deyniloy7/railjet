import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private readonly cities: string[] = [
    'Delhi',
    'Mumbai',
    'Kolkata',
    'Chennai',
    'Bangalore',
    'Hyderabad',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Surat',
    'Lucknow',
    'Kanpur',
    'Nagpur',
    'Bhopal',
    'Indore',
  ];

  constructor() {}

  search(query: string): Observable<string[]> {
    return of(
      this.cities.filter((city) =>
        city.toLowerCase().includes(query.toLowerCase()),
      ),
    );
  }
}
