import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { verticalMenuItems, horizontalMenuItems } from './menu';
import { projectOption } from 'src/environments/project-option';

import { TranslateService } from '@ngx-translate/core';
import { Users } from 'src/app/@common/models/users';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
// import { LoginService } from "src/app/@common/services/login.service";
import { Menu } from './menu.model';

@Injectable()
export class MenuService {
  menuItems: Menu[] = [];
  account: Users;
  constructor(
    private location: Location,
    private router: Router,
    protected translate: TranslateService,
    // protected loginService: LoginService,
    protected localStorageService: LocalStorageService
  ) {}

  public getVerticalMenuItems(): Array<Menu> {
    //return verticalMenuItems;
    this.account = JSON.parse(
      this.localStorageService.getInLocalStorage(projectOption.userObj)
    );
    this.menuItems = JSON.parse(
      this.localStorageService.getInLocalStorage(projectOption.userRolesKey)
    );

    return this.menuItems;
  }

  public getHorizontalMenuItems(): Array<Menu> {
    return horizontalMenuItems;
  }

  //   public expandActiveSubMenu(menu: Array<Menu>) {
  //     let url = this.location.path();
  //     let routerLink = url; // url.substring(1, url.length);
  //     let activeMenuItem = menu.filter((item) => item.routerLink === routerLink);
  //     if (activeMenuItem[0]) {
  //       let menuItem = activeMenuItem[0];
  //       while (menuItem.parentId != 0) {
  //         let parentMenuItem = menu.filter(
  //           (item) => item.id == menuItem.parentId
  //         )[0];
  //         menuItem = parentMenuItem;
  //         this.toggleMenuItem(menuItem.id);
  //       }
  //     }
  //   }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let url = this.location.path();

    let routerLink = url; // url.substring(1, url.length);
    if (menu != null) {
      let activeMenuItem = menu.filter(
        (item) => item.routerLink != '' && routerLink.includes(item.routerLink)
      );
      // menu.forEach((element) => {
      //   console.log(element.title);
      //   //   console.log();
      //   console.log(
      //     element.routerLink != "" && routerLink.includes(element.routerLink)
      //   );
      // });
      // console.log(activeMenuItem);
      if (activeMenuItem[0]) {
        let menuItem = activeMenuItem[0];
        let men = document.getElementById('menu-item-' + menuItem.id);
        men.classList.add('active-link');
      }
    }
  }

  public getCurrentMenu(menu: Array<Menu>) {
    let url = this.location.path();

    let routerLink = url;
    if (menu != null) {
      let activeMenuItem = menu.filter(
        (item) => item.routerLink != '' && routerLink.includes(item.routerLink)
      );
      if (activeMenuItem[0]) {
        let menuItem = activeMenuItem[0];
        return menuItem;
      }
      return null;
    } else {
      return null;
    }
  }

  public toggleMenuItem(menuId) {
    let menuItem = document.getElementById('menu-item-' + menuId);
    let subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    let currentMenuItem = menu.filter((item) => item.id == menuId)[0];
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach((item) => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id);
          let menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }
          }
        }
      });
    }
  }
}
