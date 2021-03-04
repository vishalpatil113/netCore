import {
  Component,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  ElementRef,
  QueryList,
  ViewChildren,
  EventEmitter,
  ChangeDetectorRef,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import { NgnMenuItem, NgnMenuInternalService, NgnMenuService } from './menu.service';
import { takeWhile } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { getElementHeight } from '../../helpers';

function sumSubmenuHeight(item: NgnMenuItem) {
  return item.expanded
    ? (item.subMenuHeight || 0) + item.children.filter(c => c.children).reduce((acc, c) => acc + sumSubmenuHeight(c), 0)
    : 0;
}

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ngnMenuItem]',
  templateUrl: './menu-item.component.html',
})
export class NgnMenuItemComponent implements AfterViewInit, OnDestroy {

  @Input() menuItem = <NgnMenuItem>null;

  @Output() hoverItem = new EventEmitter<any>();
  @Output() toggleSubMenu = new EventEmitter<any>();
  @Output() selectItem = new EventEmitter<any>();
  @Output() itemClick = new EventEmitter<any>();

  private alive = true;

  @ViewChildren(NgnMenuItemComponent, { read: ElementRef }) subMenu: QueryList<ElementRef>;
  maxHeight = 0;

  constructor(
    private menuService: NgnMenuService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private changeDetection: ChangeDetectorRef,
  ) { }

  ngAfterViewInit() {
    this.subMenu.changes
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.updateSubmenuHeight();
        this.updateMaxHeight();
      });

    this.menuService.onSubmenuToggle()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.updateMaxHeight());

    this.updateSubmenuHeight();
    this.updateMaxHeight();
    this.changeDetection.detectChanges();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  updateSubmenuHeight() {
    if (isPlatformBrowser(this.platformId)) {
      this.menuItem.subMenuHeight = this.subMenu.reduce(
        (acc, c) => acc + getElementHeight(c.nativeElement),
        0,
      );
    }
  }

  updateMaxHeight() {
    this.maxHeight = sumSubmenuHeight(this.menuItem);
  }

  onToggleSubMenu(item: NgnMenuItem) {
    this.toggleSubMenu.emit(item);
  }

  onHoverItem(item: NgnMenuItem) {
    this.hoverItem.emit(item);
  }

  onSelectItem(item: NgnMenuItem) {
    this.selectItem.emit(item);
  }

  onItemClick(item: NgnMenuItem) {
    this.itemClick.emit(item);
  }
}
