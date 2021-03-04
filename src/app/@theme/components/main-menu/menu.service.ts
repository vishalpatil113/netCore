import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { ReplaySubject, BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';
import { isUrlPathEqual, isUrlPathContain } from './url-matching-helpers';
import { Location } from '@angular/common';

export interface NgnMenuBag { tag: string; item: NgnMenuItem; }

const itemClick$ = new ReplaySubject<NgnMenuBag>(1);
const addItems$ = new ReplaySubject<{ tag: string; items: NgnMenuItem[] }>(1);
const navigateHome$ = new ReplaySubject<{ tag: string }>(1);
const getSelectedItem$
  = new ReplaySubject<{ tag: string; listener: BehaviorSubject<NgnMenuBag> }>(1);
const itemSelect$ = new ReplaySubject<NgnMenuBag>(1);
const itemHover$ = new ReplaySubject<NgnMenuBag>(1);
const submenuToggle$ = new ReplaySubject<NgnMenuBag>(1);

/**
 * Menu Item options
 */
export class NgnMenuItem {
  /**
   * Item Title
   * @type {string}
   */
  title: string;
  /**
   * Item relative link (for routerLink)
   * @type {string}
   */
  link?: string;
  /**
   * Icon class name
   * @type {string}
   */
  icon?: string;
  /**
   * Expanded by defaul
   * @type {boolean}
   */
  expanded?: boolean;
  /**
   * Children items
   * @type {List<NgnMenuItem>}
   */
  children?: NgnMenuItem[];
  /**
   * Children items height
   * @type {number}
   */
  subMenuHeight ? = 0;
  /**
   * HTML Link target
   * @type {string}
   */
  target?: string;
  /**
   * Hidden Item
   * @type {boolean}
   */
  hidden?: boolean;
  /**
   * Item is selected when partly or fully equal to the current url
   * @type {string}
   */
  pathMatch ? = 'full';
  /**
   * Whether the item is just a group (non-clickable)
   * @type {boolean}
   */
  group?: boolean;
  /** Map of query parameters
   *@type {Params}
   */
  queryParams?: Params;
  parent?: NgnMenuItem;
  selected?: boolean;
  data?: any;
  fragment?: string;
}

/**
 * Menu Service. Allows you to listen to menu events, or to interact with a menu.
 */
@Injectable()
export class NgnMenuService {

  constructor() { }

  /**
   * Add items to the end of the menu items list
   * @param {List<NgnMenuItem>} items
   * @param {string} tag
   */
  addItems(items: NgnMenuItem[], tag?: string) {
    addItems$.next({ tag, items });
  }

  /**
   * Navigate to the home menu item
   * @param {string} tag
   */
  navigateHome(tag?: string) {
    navigateHome$.next({ tag });
  }

  /**
   * Returns currently selected item. Won't subscribe to the future events.
   * @param {string} tag
   * @returns {Observable<{tag: string; item: NgnMenuItem}>}
   */
  getSelectedItem(tag?: string): Observable<NgnMenuBag> {
    const listener = new BehaviorSubject<NgnMenuBag>(null);

    getSelectedItem$.next({ tag, listener });

    return listener.asObservable();
  }

  onItemClick(): Observable<NgnMenuBag> {
    return itemClick$.pipe(share());
  }

  onItemSelect(): Observable<NgnMenuBag> {
    return itemSelect$.pipe(share());
  }

  onItemHover(): Observable<NgnMenuBag> {
    return itemHover$.pipe(share());
  }

  onSubmenuToggle(): Observable<NgnMenuBag> {
    return submenuToggle$.pipe(share());
  }
}

@Injectable()
export class NgnMenuInternalService {
  private items: NgnMenuItem[] = [];

  constructor(private location: Location) {
    this.items = [];
  }

  getItems(): NgnMenuItem[] {
    return this.items;
  }

  prepareItems(items: NgnMenuItem[]) {
    const defaultItem = new NgnMenuItem();
    items.forEach(i => {
      this.applyDefaults(i, defaultItem);
      this.setParent(i);
    });
  }

  updateSelection(items: NgnMenuItem[], tag: string, collapseOther: boolean = false) {
    if (collapseOther) {
      this.collapseAll(items, tag);
    }
    items.forEach(item => this.selectItemByUrl(item, tag));
  }

  resetItems(items: NgnMenuItem[]) {
    items.forEach(i => this.resetItem(i));
  }

  collapseAll(items: NgnMenuItem[], tag: string, except?: NgnMenuItem) {
    items.forEach(i => this.collapseItem(i, tag, except));
  }

  onAddItem(): Observable<{ tag: string; items: NgnMenuItem[] }> {
    return addItems$.pipe(share());
  }

  onNavigateHome(): Observable<{ tag: string }> {
    return navigateHome$.pipe(share());
  }

  onGetSelectedItem(): Observable<{ tag: string; listener: BehaviorSubject<NgnMenuBag> }> {
    return getSelectedItem$.pipe(share());
  }

  itemHover(item: NgnMenuItem, tag?: string) {
    itemHover$.next({tag, item});
  }

  submenuToggle(item: NgnMenuItem, tag?: string) {
    submenuToggle$.next({tag, item});
  }

  itemSelect(item: NgnMenuItem, tag?: string) {
    itemSelect$.next({tag, item});
  }

  itemClick(item: NgnMenuItem, tag?: string) {
    itemClick$.next({tag, item});
  }

  private resetItem(item: NgnMenuItem) {
    item.selected = false;

    if (item.children) {
      item.children.forEach(child => {
        this.resetItem(child);
      });
    }
  }

  private isParent(parent, child) {
    return child.parent
      ? child.parent === parent || this.isParent(parent, child.parent)
      : false;
  }

  private collapseItem(item: NgnMenuItem, tag: string, except?: NgnMenuItem) {
    if (except && (item === except || this.isParent(item, except))) {
      return;
    }

    const wasExpanded = item.expanded;
    item.expanded = false;
    if (wasExpanded) {
      this.submenuToggle(item);
    }

    if (item.children) {
      item.children.forEach(child => this.collapseItem(child, tag));
    }
  }

  private applyDefaults(item, defaultItem) {
    const menuItem = {...item};
    Object.assign(item, defaultItem, menuItem);
    if (item.children) {
      item.children.forEach(child => {
        this.applyDefaults(child, defaultItem);
      });
    }
  }

  private setParent(item: NgnMenuItem) {
    if (item.children) {
      item.children.forEach(child => {
        child.parent = item;
        this.setParent(child);
      });
    }
  }

  selectItem(item: NgnMenuItem, tag: string) {
    item.selected = true;
    this.itemSelect(item, tag);
    this.selectParent(item, tag);
  }

  private selectParent({ parent: item }: NgnMenuItem, tag: string) {
    if (!item) {
      return;
    }

    if (!item.expanded) {
      item.expanded = true;
      this.submenuToggle(item, tag);
    }

    item.selected = true;
    this.selectParent(item, tag);
  }

  private selectItemByUrl(item: NgnMenuItem, tag: string) {
    const wasSelected = item.selected;
    const isSelected = this.selectedInUrl(item);
    if (!wasSelected && isSelected) {
      this.selectItem(item, tag);
    }
    if (item.children) {
      this.updateSelection(item.children, tag);
    }
  }

  private selectedInUrl(item: NgnMenuItem): boolean {
    const exact: boolean = item.pathMatch === 'full';
    return exact
      ? isUrlPathEqual(this.location.path(), item.link)
      : isUrlPathContain(this.location.path(), item.link);
  }
}
