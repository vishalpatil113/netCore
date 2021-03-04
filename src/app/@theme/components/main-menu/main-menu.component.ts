import { Component, OnInit, Input, Inject, AfterViewInit, OnDestroy } from '@angular/core';
import { NgnMenuItem, NgnMenuInternalService, NgnMenuBag } from './menu.service';
import { Router, NavigationEnd } from '@angular/router';
import { convertToBoolProperty } from '../../helpers';
import { takeWhile, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ngn-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private isActive: Boolean = false;
  /**
   * Tags a menu with some ID, can be later used in the menu service
   * to determine which menu triggered the action, if multiple menus exist on the page.
   *1
   * @type {string}
   */
  @Input() tag: string;

  /**
   * Collapse all opened submenus on the toggle event
   * Default value is "false"
   * @type Boolean
   */
  @Input()
  set autoCollapse(val: Boolean) {
    this.autoCollapseValue = convertToBoolProperty(val);
  }



  private alive = true;
  private autoCollapseValue = false;

  /**
   * List of menu items.
   * @type List<NgnMenuItem> | List<any> | any
   */
  @Input() items: NgnMenuItem[];

  constructor(private menuInternalService: NgnMenuInternalService,
    private router: Router) { }

  ngOnInit() {
    this.menuInternalService
      .onAddItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: NgnMenuItem[] }) => this.compareTag(data.tag)),
    )
      .subscribe(data => this.onAddItem(data));

    this.menuInternalService
      .onNavigateHome()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; items: NgnMenuItem[] }) => this.compareTag(data.tag)),
    )
      .subscribe(() => console.log('navigate home'));

    this.menuInternalService
      .onGetSelectedItem()
      .pipe(
        takeWhile(() => this.alive),
        filter((data: { tag: string; listener: BehaviorSubject<NgnMenuBag> }) => this.compareTag(data.tag)),
    )
      .subscribe((data: { tag: string; listener: BehaviorSubject<NgnMenuBag> }) => {
        data.listener.next({ tag: this.tag, item: this.getSelectedItem(this.items) });
      });

    this.router.events
      .pipe(
        takeWhile(() => this.alive),
        filter(event => event instanceof NavigationEnd),
    )
      .subscribe(() => {
        this.menuInternalService.resetItems(this.items);
        this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue);
      });

    // TODO: this probably won't work if you pass items dynamically into items input
    this.menuInternalService.prepareItems(this.items);
    this.items.push(...this.menuInternalService.getItems());
  }

  ngAfterViewInit() {
    setTimeout(() => this.menuInternalService.updateSelection(this.items, this.tag));
  }

  onAddItem(data: { tag: string; items: NgnMenuItem[] }) {
    this.items.push(...data.items);

    this.menuInternalService.prepareItems(this.items);
    this.menuInternalService.updateSelection(this.items, this.tag, this.autoCollapseValue);
  }

  onHoverItem(item: NgnMenuItem) {
    this.menuInternalService.itemHover(item, this.tag);
  }

  onToggleSubMenu(item: NgnMenuItem) {
    if (this.autoCollapseValue) {
      this.menuInternalService.collapseAll(this.items, this.tag, item);
    }
    item.expanded = !item.expanded;
    this.menuInternalService.submenuToggle(item, this.tag);
  }

  // TODO: is not fired on page reload
  onSelectItem(item: NgnMenuItem) {
    this.menuInternalService.resetItems(this.items);
    this.menuInternalService.selectItem(item, this.tag);
  }

  onItemClick(item: NgnMenuItem) {
    this.menuInternalService.itemClick(item, this.tag);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private compareTag(tag: string) {
    return !tag || tag === this.tag;
  }

  private getSelectedItem(items: NgnMenuItem[]): NgnMenuItem {
    let selected = null;
    items.forEach((item: NgnMenuItem) => {
      if (item.selected) {
        selected = item;
      }
      if (item.selected && item.children && item.children.length > 0) {
        selected = this.getSelectedItem(item.children);
      }
    });
    return selected;
  }
  private toggleOpened() {
    this.isActive = !this.isActive;
  }
}
