import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, delay, filter } from 'rxjs';

@Directive({
  selector: '[appObserverVisibility]'
})
export class ObserverVisibilityDirective implements OnDestroy, OnInit, AfterViewInit{
  @Input() debounceTime = 0;
  @Input() threshold = 1;

  @Output() visible = new EventEmitter<HTMLElement>();

  private observer:IntersectionObserver | undefined;
  private subject = new Subject<{
    entry:IntersectionObserverEntry;
    observer:IntersectionObserver;
  } | null>();
  
  constructor(private element: ElementRef) { }

  ngOnInit(): void {
    this.createObserver();
  }

  ngAfterViewInit(): void {
    this.startObservingElements();
  }

  ngOnDestroy(): void {
    if(this.observer){
      this.observer.disconnect();
      this.observer = undefined;
    }

    this.subject.next(null);
    this.subject.complete();
  }

  private isVisible(element: HTMLElement){
    return new Promise(resolve=>{
      const OBSERVER = new IntersectionObserver(([entry]) => {
        resolve(entry.intersectionRatio === 1);
        OBSERVER.disconnect();
      });
      OBSERVER.observe(element);
    });
  }

  private createObserver(){
    const OPTIONS = {
      rootMargin: '0px',
      threshold: this.threshold
    };

    const isIntersecting = (entry: IntersectionObserverEntry) =>  entry.isIntersecting || entry.intersectionRatio > 0;
    
    this.observer = new IntersectionObserver((entries,observer) => {
      entries.forEach(entry => {
        if(isIntersecting(entry)){
          this.subject.next({entry,observer});
        }
      });
    },OPTIONS);
  }

  private startObservingElements(){
    if(!this.observer){
      return;
    }

    this.observer.observe(this.element.nativeElement);

    this.subject
      .pipe(delay(this.debounceTime),filter(Boolean))
      .subscribe(async({entry,observer}) => {
        const TARGET = entry.target as HTMLElement;
        const IS_STILL_VISIBLE = await this.isVisible(TARGET);

        if(IS_STILL_VISIBLE){
          this.visible.emit(TARGET);
          observer.unobserve(TARGET);
        }
      });
    }

}
