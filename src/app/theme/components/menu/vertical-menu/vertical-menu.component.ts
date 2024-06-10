import {
  Component,
  OnInit,
  Input,
  Output,
  ViewEncapsulation,
  EventEmitter,
} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { Menu } from '../menu.model';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { projectOption } from 'src/environments/project-option';
import { verticalMenuItems } from '../menu';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMenuComponent implements OnInit {
  public menuItems: Menu[] = [];
  @Input('menuParentId') menuParentId;
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>();
  public parentMenu: Array<any>;
  public settings: Settings;
  constructor(
    public appSettings: AppSettings,
    protected translate: TranslateService,
    protected loginService: LoginService,
    private location: Location,
    private localStorageService: LocalStorageService,
    public router: Router
  ) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    // this.loginService.account.subscribe((data) => {
    //   if (data.id) {
    //     this.menuItems = JSON.parse(
    //       this.localStorageService.getInLocalStorage(projectOption.userRolesKey)
    //     );
    //     if (this.menuItems) {
    //       this.parentMenu = this.menuItems.filter(
    //         (item) => item.parentId == this.menuParentId
    //       );
    //     }
    //   }
    // });
    this.menuItems = verticalMenuItems;
    this.parentMenu = this.menuItems.filter(
      (item) => item.parentId == this.menuParentId
    );
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          let mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        } else {
          document.getElementsByClassName(
            'mat-drawer-content'
          )[0].scrollTop = 0;
        }
      }
    });
  }

  onClick(menuId) {
    this.toggleMenuItem(menuId);
    this.closeOtherSubMenus(this.menuItems, menuId);
    this.onClickMenuItem.emit(menuId);
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    let url = this.location.path();
    let routerLink = url; // url.substring(1, url.length);
    let activeMenuItem = menu.filter((item) => item.routerLink === routerLink);
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId != 0) {
        let parentMenuItem = menu.filter(
          (item) => item.id == menuItem.parentId
        )[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId) {
    let menuItem = document.getElementById('menu-item-' + menuId);
    let subMenu = document.getElementById('sub-menu-' + menuId);
    if (subMenu) {
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem!.classList.remove('expanded');
      } else {
        subMenu.classList.add('show');
        menuItem!.classList.add('expanded');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    // console.log(menuId);
    let currentMenuItem = menu.filter((item) => item.id == menuId)[0];
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach((item) => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id);
          let menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem!.classList.remove('expanded');
            }
          }
          // console.log(menuItem);
          // menuItem.classList.remove("active-link");
        }
      });
    } else {
      menu.forEach((item) => {
        if (item.id != menuId) {
          let subMenu = document.getElementById('sub-menu-' + item.id);
          let menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) subMenu.classList.remove('active-link');
          if (menuItem) menuItem.classList.remove('active-link');
        }
      });
    }
  }
}
