export interface Seat {
    id: string;
    seatNumber: string;
    row: number;
    column: string;
    isReserved: boolean;
    isWindow: boolean;
    priceModifier: number;
}

export interface BusSeat extends Seat {
    isAisle: boolean;
    seatType: 'seater' | 'sleeper' | 'semi-sleeper';
}

export interface TrainSeat extends Seat {
    berth: 'lower' | 'middle' | 'upper' | 'side-lower' | 'side-upper';
    coach: string;
    gender: 'any' | 'ladies'
}