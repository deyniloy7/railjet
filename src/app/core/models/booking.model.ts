export interface Booking {
    id: string;
    userId: string;
    tripId: string;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    createdAt: Date;
    expiresAt: string; // only relevant when status is 'pending'
    ticketId: string;
}