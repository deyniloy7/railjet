import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Trip } from '../../core/models';

@Component({
  selector: 'app-booking',
  imports: [],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingComponent {
  trip = input.required<Trip>();
}
