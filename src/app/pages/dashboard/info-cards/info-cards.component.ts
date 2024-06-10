import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';
import { Router } from '@angular/router';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';

@Component({
  selector: 'app-info-cards',
  templateUrl: './info-cards.component.html',
  styleUrls: ['./info-cards.component.scss'],
})
export class InfoCardsComponent implements OnInit {
  @Input()
  model: DashboardWrapper;
  public colorScheme = {
    domain: ['#999'],
  };
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv: number = 0;
  public settings: Settings;

  constructor(public appSettings: AppSettings, private router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {}

  public onSelect(event) {
    console.log(event);
  }

  ngOnDestroy() {}

  ngAfterViewChecked() {
    if (
      this.previousWidthOfResizedDiv !=
      this.resizedDiv.nativeElement.clientWidth
    ) {
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
  showDemandes() {
    this.router.navigateByUrl('/demandes/recrutement');
  }
}
