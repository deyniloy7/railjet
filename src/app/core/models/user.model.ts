export interface User {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    age: number;
    gender: 'male' | 'female' | 'other';
    role: 'admin' | 'user' | 'guest';
}