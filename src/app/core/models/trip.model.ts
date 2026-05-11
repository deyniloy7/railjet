export interface Trip {
    id: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number // in minutes
    seatsAvailable: number;
    price: number;
    operator: string;
    vehicleType: 'bus' | 'train'
}
