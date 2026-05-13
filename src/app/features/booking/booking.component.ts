import { ChangeDetectionStrategy, Component, computed, inject, input, linkedSignal, signal } from '@angular/core';
import { BusSeat, CreateBookingRequest, Trip } from '../../core/models';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { PricePipe } from '../../shared/pipes/price.pipe';
import { DurationPipe } from '../../shared/pipes/duration.pipe';
import { BookingService } from '../../core/services/booking.service';
import { AuthService } from '../../core/services/auth.service';
import { catchError, finalize, of, tap } from 'rxjs';
import { SeatHighlightDirective } from "./directives/seat-highlight.directive";

@Component({
  selector: 'app-booking',
  imports: [DatePipe, PricePipe, DurationPipe, SeatHighlightDirective],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingComponent {
  trip = input.required<Trip>();
  private readonly _bookingService = inject(BookingService);
  private readonly _router = inject(Router);
  private readonly authService = inject(AuthService);

  public selectedSeats = linkedSignal<string[]>(() => {
    const _ = this.trip();
    return [];
  });

  public isLoading = signal<boolean>(false);

  private readonly seats = signal<BusSeat[]>([
    {
      id: 'seat_1',
      seatNumber: '1A',
      row: 1,
      column: 'A',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_2',
      seatNumber: '1B',
      row: 1,
      column: 'B',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_3',
      seatNumber: '1C',
      row: 1,
      column: 'C',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_4',
      seatNumber: '1D',
      row: 1,
      column: 'D',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_5',
      seatNumber: '2A',
      row: 2,
      column: 'A',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_6',
      seatNumber: '2B',
      row: 2,
      column: 'B',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_7',
      seatNumber: '2C',
      row: 2,
      column: 'C',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_8',
      seatNumber: '2D',
      row: 2,
      column: 'D',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_9',
      seatNumber: '3A',
      row: 3,
      column: 'A',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_10',
      seatNumber: '3B',
      row: 3,
      column: 'B',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_11',
      seatNumber: '3C',
      row: 3,
      column: 'C',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_12',
      seatNumber: '3D',
      row: 3,
      column: 'D',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_13',
      seatNumber: '4A',
      row: 4,
      column: 'A',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
    {
      id: 'seat_14',
      seatNumber: '4B',
      row: 4,
      column: 'B',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_15',
      seatNumber: '4C',
      row: 4,
      column: 'C',
      isReserved: false,
      isWindow: false,
      isAisle: true,
      priceModifier: 1,
      seatType: 'seater',
    },
    {
      id: 'seat_16',
      seatNumber: '4D',
      row: 4,
      column: 'D',
      isReserved: false,
      isWindow: true,
      isAisle: false,
      priceModifier: 1.2,
      seatType: 'seater',
    },
  ]);

  public selectedSeatDetails = computed(() => 
    this.seats().filter(seat => this.selectedSeats().includes(seat.id))
  )

  public seatRows = computed(() => {
    const rows = new Map<number, BusSeat[]>();
    this.seats().forEach(seat => {
      if (!rows.has(seat.row)) {
        rows.set(seat.row, []);
      }
      rows.get(seat.row)!.push(seat);
    })
    return Array.from(rows.values());
  })

  public toggleSeat(seatId: string): void {
    if (this.selectedSeats().includes(seatId)) {
      this.selectedSeats.set([...this.selectedSeats().filter(id => id !== seatId)]);
    } else {
      this.selectedSeats.set([...this.selectedSeats(), seatId]);
    }
  }

  public proceedToCheckout(): void {
    if (this.selectedSeats().length === 0) return;

    this.isLoading.set(true);

    const createBookingRequest: CreateBookingRequest = {
      seatIds: this.selectedSeats(),
      // Safe — authGuard guarantees user is authenticated on this route
      userId: this.authService.currentUser()!.id,
      tripId: this.trip().id,
    }

    this._bookingService.createBooking(createBookingRequest).pipe(
      tap(() => {
        this._router.navigateByUrl("/checkout");
      }),
      catchError(err => {
        console.error("Booking creation error", err);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }


  public getSeatStatus(seat: BusSeat): 'available' | 'taken' | 'selected' {
    if (this.selectedSeats().includes(seat.id)) {
      return 'selected';
    }
    return 'available';
  }
}
