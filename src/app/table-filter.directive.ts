import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[tableFilter]'
})
export class TableFilterDirective {
  @Output() filterValueChange = new EventEmitter();

  value = '';

  constructor(private el: ElementRef) { }

  @HostListener('keyup') onKeyUp() {
    this.value = this.el.nativeElement.value;
    this.filterValueChange.emit();
  }

}
