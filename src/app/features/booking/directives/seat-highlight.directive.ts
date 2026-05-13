import { Directive, effect, ElementRef, inject, input } from '@angular/core';

@Directive({
  selector: '[appSeatHighlight]',
  standalone: true,

})
export class SeatHighlightDirective {

  public status = input.required<'available' | 'taken' | 'selected'>();
  private readonly _elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      const status = this.status();
      const elementStyle = this._elementRef.nativeElement.style;

      switch(status) {
        case 'available':
          elementStyle.backgroundColor = 'green';
          elementStyle.cursor = 'pointer';
          elementStyle.pointerEvents = 'auto';
          break;
        case 'selected':
          elementStyle.backgroundColor = 'blue';
          elementStyle.cursor = 'pointer';
          elementStyle.pointerEvents = 'auto';
          break;
        case 'taken':
          elementStyle.backgroundColor = 'grey';
          elementStyle.cursor = 'not-allowed';
          elementStyle.pointerEvents = 'none';
          break;
      }
    })


   }

}
