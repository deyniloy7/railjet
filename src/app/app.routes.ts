import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { authGuard } from './core/guards/auth.guard';
import { tripResolver } from './core/resolvers/trip.resolver';
import { checkoutGuard } from './core/guards/checkout.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'search',
        loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent),
    },
    {
        path: 'my-trips',
        loadComponent: () => import('./features/trips/trips.component').then(m => m.TripsComponent),
        canActivate: [authGuard]
    },
    {
        path: 'profile',
        loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent),
        canActivate: [authGuard]
    },
    {
        path: 'booking/:tripId',
        loadComponent: () => import('./features/booking/booking.component').then(m => m.BookingComponent),
        canActivate: [authGuard],
        resolve: { trip: tripResolver }
    },
    {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent),
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard]
    },
    {
        path: 'admin',
        loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
        canActivate: [authGuard],
        canMatch: [adminGuard],
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes),
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
    },
];

// Define routes in this file - pure config only
