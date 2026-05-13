export interface SeatAvailability {
    seatId: string;
    tripId: string;
    date: Date;
    status: 'available' | 'taken' | 'selected';
}