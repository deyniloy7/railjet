import { AbstractControl, ValidatorFn } from "@angular/forms";

export const sourceDestinationValidator: ValidatorFn = (control: AbstractControl) => {
    const origin: string = control.get('origin')?.value;
    const destination: string = control.get('destination')?.value;

    if(!!origin && !!destination && origin.toLowerCase() === destination.toLowerCase()) {
        return { sameSourceDestination: true };
    }

    return null;
}