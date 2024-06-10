import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-alert-messages",
  templateUrl: "./alert-messages.component.html",
  styleUrls: ["./alert-messages.component.scss"],
})
export class AlertMessagesComponent implements OnInit {
  // @Input()
  // activite: Activite;
  show = true;
  // @Input()
  // siteLink;
  constructor(private router: Router) { }

  ngOnInit(): void { }
  closeAlert() {
    this.show = false;
  }
  // link() {
  //   if (
  //     this.activite.note === "postes.vacants" &&
  //     this.activite.demandeId > 0
  //   ) {
  //     let link = this.siteLink + "view/" + this.activite.demandeId;
  //     window.open(link, "_blank");
  //     //this.router.navigateByUrl('/demandes/recrutement/' + this.activite.demandeId);
  //   }
  // }
}
