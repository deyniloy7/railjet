import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TripService } from '../../core/services/trip.service';
import { CityService } from '../../core/services/city.service';
import { sourceDestinationValidator } from '../../shared/validators/source-destination.validator';
import { Trip, TripSearchRequest } from '../../core/models';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, debounceTime, distinctUntilChanged, finalize, of, switchMap, tap } from 'rxjs';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule, RouterLink, DurationPipe, PricePipe, DatePipe],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  private readonly _formBuilder = inject(FormBuilder);
  private readonly _router = inject(Router);
  private readonly _tripService = inject(TripService);
  private readonly _cityService = inject(CityService);

  public searchForm = this._formBuilder.group(
    {
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      date: ['', Validators.required],
      numberOfPassengers: [1, [Validators.required, Validators.min(1)]],
      tripType: ['one-way', Validators.required],
    },
    { validators: sourceDestinationValidator },
  );

  public originCities = toSignal(
    this.searchForm.get('origin')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => (value ? this._cityService.search(value) : of([]))),
    ),
    { initialValue: [] as string[] },
  );

  public destinationCities = toSignal(
    this.searchForm.get('destination')!.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((value) => (value ? this._cityService.search(value) : of([]))),
    ),
    { initialValue: [] as string[] },
  );

  public results = signal<Trip[]>([]);
  public isLoading = signal<boolean>(false);

  public onSearch() {
    if (this.searchForm.invalid) return;

    this.isLoading.set(true);

    const values = this.searchForm.getRawValue() as unknown as TripSearchRequest;

    this._tripService.search(values).pipe(
      tap(trips => {
        this.results.set(trips);
      }),
      catchError((err) => {
        console.error('Search failed', err);
        this.results.set([]);
        return of([]);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();

  }
}
