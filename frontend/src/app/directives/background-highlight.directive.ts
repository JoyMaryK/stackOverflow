import { Directive, ElementRef, Input, OnInit, isStandalone } from '@angular/core';

@Directive({
  selector: 'backgroundHighlight',
  standalone: true
})
export class BackgroundHighlightDirective implements OnInit {
  @Input('backgroundHighlight') isPrefered!: boolean;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.highlightBackground();
  }

  private highlightBackground() {
    const color = this.isPrefered === true ? '#BFDBF7' : 'transparent';
    this.elementRef.nativeElement.style.backgroundColor = color;
  }
}
