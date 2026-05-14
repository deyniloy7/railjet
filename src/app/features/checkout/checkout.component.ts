import { Component, inject, signal } from '@angular/core';
import { CanComponentDeactivate } from '../../core/guards/can-component-deactivate';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BookingService } from '../../core/services/booking.service';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, finalize, map, of, startWith, tap } from 'rxjs';
import { CreateBookingRequest } from '../../core/models';
import { BookingStateService } from '../../core/services/booking-state.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements CanComponentDeactivate {
  private readonly _fb = inject(FormBuilder);
  private readonly _bookingService = inject(BookingService);
  private readonly _router = inject(Router);
  private readonly _authService = inject(AuthService);
  private readonly _bookingStateService = inject(BookingStateService);

  public passengerForm = this._fb.group({
    name: ['', Validators.required],
    age: [1, [Validators.required, Validators.min(1)]],
    gender: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10)]],
    idType: ['', Validators.required],
    idNumber: ['', Validators.required]
  });
  public paymentForm = this._fb.group({
    cardNumber: ['', [Validators.required, Validators.minLength(16)]], 
    cvv: ['', [Validators.required, Validators.minLength(3)]], 
    expiryDate: ['', Validators.required], 
    nameOnCard: ['', Validators.required]
  });

  public isFormValid = toSignal(
    combineLatest([
      this.passengerForm.statusChanges.pipe(startWith(this.passengerForm.status)),
      this.paymentForm.statusChanges.pipe(startWith(this.paymentForm.status)),
    ]).pipe(map(([passengerStatus, paymentStatus]) => {
      return passengerStatus === 'VALID' && paymentStatus === 'VALID'
    })),
    { initialValue: false }
  );

  public isLoading = signal<boolean>(false);
  private _isSubmitSuccessful = false;

  canDeactivate(): boolean {
    if (this._isSubmitSuccessful) return true;
    return !this.passengerForm.touched && !this.paymentForm.touched;
  }

  public onSubmit(): void {
    const state = this._bookingStateService.getBookingData();

    if (!this.isFormValid() || !state) return;

    this.isLoading.set(true);

    const bookingRequest: CreateBookingRequest = {
      seatIds: state.seatIds,
      tripId: state.tripId,
      userId: this._authService.currentUser()!.id,
    }

    this._bookingService.createBooking(bookingRequest).pipe(
      tap(() => {
        this._isSubmitSuccessful = true;
        this._bookingStateService.clearBookingData();
        this._router.navigateByUrl('/my-trips');
      }),
      catchError(err => {
        console.error('Booking creation failed', err);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }


}
