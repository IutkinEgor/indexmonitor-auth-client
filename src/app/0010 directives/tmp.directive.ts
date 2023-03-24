import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

/*
 * DIRECTIVE TEMPLATE.
 * Use this template to create own directive. Import your directive to SharedModuel through _index.ts
 */

@Directive({
  selector: '[appTmp]',
})
export class TmpDirective implements OnInit{
  constructor(
    private templateRef: TemplateRef<any>,
    private viewConteinerRef: ViewContainerRef,
  ) {}  

  ngOnInit(): void {}

}
