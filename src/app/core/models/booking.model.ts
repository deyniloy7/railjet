export interface Booking {
    id: string;
    userId: string;
    tripId: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: Date;
    expiresAt: Date; // only relevant when status is 'pending'
    ticketId: string;
}