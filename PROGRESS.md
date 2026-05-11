# RailJet — Learning Progress

## 🎯 Goal
Build a production-grade Angular 19 travel booking app.
Train to think and code at MAANG / senior dev level.
Crack senior Angular developer interviews.
Reduce production bugs through design-before-code discipline.

## 🔁 Working Methodology
- Claude acts as **client + tech lead**
- Always explain approach **before** writing code
- Every Angular/RxJS/TS feature must solve a **real user problem** — not just tick a checkbox
- Atomic commits after every feature
- Design → Discuss → Code → Review

---

## ✅ Completed

### Foundation
- [x] Angular 19 project scaffolded — standalone by default, no NgModules
- [x] GitHub repo created — github.com/deyniloy7/railjet
- [x] Folder structure — `core/`, `shared/`, `features/`

### Models — `src/app/core/models/`
- [x] `user.model.ts` — User interface, union types for role/gender
- [x] `auth.model.ts` — AuthResponse interface with token, refreshToken, expiresAt, user
- [x] `booking.model.ts` — Booking interface, lifecycle status union type, expiresAt with comment
- [x] `index.ts` — barrel exports

### Services — `src/app/core/services/`
- [x] `auth-api.service.ts` — mock login, logout, restoreSession returning AuthResponse
- [x] `auth.service.ts` — Signals-based state, computed isLoggedIn, finalize, catchError

### App Config
- [x] `app.config.ts` — provideRouter, provideZoneChangeDetection, provideAppInitializer

---

## 🔄 In Progress
- [x] `app.component.ts` — root shell, router outlet
- [x] `navbar.component.ts` — auth-reactive nav, routerLinkActive

---

## 🗺️ Full Feature Map — MAANG Architecture

> Every feature exists because a real user action requires it.

---

### 🔐 Auth Flow
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Session restore on app load | `provideAppInitializer` | ✅ Done |
| Auth state management | Signals, `computed()`, `asReadonly()` | ✅ Done |
| Login / logout | `tap()`, `finalize()`, `catchError()` | ✅ Done |
| Protect booking routes | `CanActivate` guard | ⬜ |
| Admin-only routes | `CanMatch` guard | ⬜ |
| Attach JWT to requests | HTTP Interceptor #1 | ⬜ |
| Redirect on 401 | HTTP Interceptor #3 | ⬜ |
| Cache user profile | `shareReplay(1)` | ⬜ |

---

### 🔍 Search Page
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Search form — origin, destination, date, passengers | Reactive Forms + `FormBuilder` | ⬜ |
| City autocomplete | `debounceTime` + `distinctUntilChanged` | ⬜ |
| Cancel previous search on new input | `switchMap` | ⬜ |
| Defer results until form submitted | `@defer` | ⬜ |
| Render results list efficiently | `@for` with `track` | ⬜ |
| Format trip duration "2h 30m" | Custom Pipe | ⬜ |
| Results list — no unnecessary re-renders | `OnPush` Change Detection | ⬜ |

---

### 🎫 Booking Page
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Pre-load trip data before route activates | Resolver | ⬜ |
| Receive tripId from route | Signal-based `input()` | ⬜ |
| Switch between bus/train seat view | `@switch` | ⬜ |
| Highlight available/selected/taken seats | Custom Directive `appSeatHighlight` | ⬜ |
| Selected seats — derived but writable | `linkedSignal` | ⬜ |
| Access seat map DOM element | `viewChild()` signal | ⬜ |
| Seat map — expensive render optimization | `OnPush` | ⬜ |

---

### 💳 Checkout Page
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Passenger details + payment form | Reactive Forms | ⬜ |
| Warn before leaving mid-payment | `CanDeactivate` guard | ⬜ |
| Build booking object progressively | `Partial<Booking>` utility type | ⬜ |
| Extract only needed model fields | `Pick<>`, `Omit<>` utility types | ⬜ |
| Combine form validity streams | `combineLatest` | ⬜ |

---

### 👤 My Trips / Profile Page
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Lazy load booking history | `@defer` with loading + error blocks | ⬜ |
| Clean up subscriptions on destroy | `takeUntilDestroyed` | ⬜ |
| Manual cleanup | `DestroyRef` | ⬜ |
| Format booking status with color | Custom Pipe `BookingStatusPipe` | ⬜ |
| Load profile + history in parallel | `forkJoin` | ⬜ |

---

### ⚙️ Admin Dashboard
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Route never registers for non-admins | `CanMatch` guard | ⬜ |
| Render stat widgets from config | Dynamic Components | ⬜ |
| Inject dashboard widget config | `InjectionToken` | ⬜ |
| Different config per environment | `EnvironmentProviders` | ⬜ |
| Optimized city/route images | `NgOptimizedImage` | ⬜ |
| Compose tooltip + permission on buttons | Host Directives | ⬜ |

---

### 🌐 Global / Cross-cutting
| Feature | Angular/RxJS Concept | Status |
|---|---|---|
| Attach auth token to every request | HTTP Interceptor #1 | ⬜ |
| Global loading indicator | HTTP Interceptor #2 | ⬜ |
| Global error handler + 401 redirect | HTTP Interceptor #3 | ⬜ |
| Cache cities/routes API response | `shareReplay(1)` | ⬜ |
| Booking confirmed toast notifications | `ReplaySubject` | ⬜ |
| Page transition on route change | `@angular/animations` | ⬜ |
| Hero images on home page | `NgOptimizedImage` | ⬜ |
| Performance by default | `OnPush` everywhere | ⬜ |
| Signal-based component inputs | `input()` signal | ⬜ |
| Signal-based component outputs | `output()` signal | ⬜ |

---

## 📚 Topics Covered In Depth

### 🔴 Core Architecture
| Topic | Key Takeaway |
|---|---|
| Signals | `signal()`, `computed()`, `asReadonly()` — private write, public read |
| Standalone Components | No NgModules in Angular 19 — everything standalone |
| Dependency Injection | `inject()` over constructor, `providedIn: root` for tree shaking |
| Service Architecture | AuthService (state) vs AuthApiService (HTTP) — Single Responsibility |
| APP_INITIALIZER | `provideAppInitializer()` — always catchError, never block the app |

### 🟠 RxJS
| Topic | Key Takeaway |
|---|---|
| `exhaustMap` | Use for login — ignores duplicate clicks |
| `switchMap` | Use for search — cancels previous on new input |
| `concatMap` | Sequential calls that must all complete |
| `mergeMap` | Parallel calls, order doesn't matter |
| `tap()` | Side effects only — never transform with tap |
| `map()` | Transform only — never side effect with map |
| `catchError` | Always log, always return of(null) to keep stream alive |
| `finalize()` | Like finally — runs on success AND error |
| `lastValueFrom()` | Convert Observable to Promise — modern RxJS 7+ |
| `EMPTY` | Completes immediately, emits nothing — use to short circuit |

### 🟡 TypeScript
| Topic | Key Takeaway |
|---|---|
| Union Types | Prefer over enums — no runtime overhead |
| Interface design | Flat models, reference related data by ID not nested objects |
| Barrel exports | index.ts — clean imports across the app |
| Type safety | phoneNumber as string, dates as string from API |

### 🟢 Angular Patterns
| Topic | Key Takeaway |
|---|---|
| `@if` / `@for` / `@switch` | Modern control flow — no imports needed |
| `app.config.ts` | All global providers |
| `app.routes.ts` | Pure config only — no business logic ever |
| `routerLinkActive` | Built-in directive for active route styling |
| `withComponentInputBinding` | Route params auto-bind to `input()` signal |
| Prop drilling vs injection | Global state → inject service directly |

### 🔵 Production Habits
| Topic | Key Takeaway |
|---|---|
| Always log in catchError | Silent errors = invisible production bugs |
| Atomic commits | One commit per feature, conventional commits format |
| DRY principle | Extract duplicated data/logic — one source of truth |
| Code comments | Document WHY not WHAT |
| Naming conventions | `*.model.ts`, `*.service.ts`, `core/` folder structure |
| Design before code | Think → Discuss → Then type |

---

## 🎯 Interview Tier Priority

```
Tier 1 — Always Asked (do first)
  Signals, Change Detection (OnPush), RxJS operators,
  Guards, Lazy Loading, Dependency Injection

Tier 2 — Commonly Asked
  Interceptors, Resolvers, Reactive Forms,
  Smart/Dumb components, takeUntilDestroyed, DestroyRef

Tier 3 — Differentiators (sets you apart)
  Signal inputs/outputs, linkedSignal, Host directives,
  Dynamic components, shareReplay, combineLatest vs forkJoin

Tier 4 — Bonus Points
  NgOptimizedImage, Bundle optimization,
  Custom pipes with generics, Feature flags
```

---

## 💬 Commit History Format
```
feat: add auth models with union types and barrel exports
feat: add AuthApiService with mock data
feat: add AuthService with signals and session restore
feat: wire provideAppInitializer for session restore
```

---

## 🔖 Resources
- [Angular Signals](https://angular.dev/guide/signals)
- [Angular Control Flow](https://angular.dev/guide/templates/control-flow)
- [RxJS Operators](https://rxjs.dev/guide/operators)
- [Conventional Commits](https://www.conventionalcommits.org)
- [Angular Style Guide](https://angular.dev/style-guide)
