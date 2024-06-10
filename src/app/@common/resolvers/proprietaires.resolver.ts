import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';

import { ConstanteService } from 'src/app/@common/services/constante.service';
import { ProprietaireService } from '../services/proprietaire.service';

@Injectable({
  providedIn: 'root',
})
export class ProprietairesResolver {
  item: BehaviorSubject<any>;

  constructor(private service: ProprietaireService) {
    this.item = new BehaviorSubject({});
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    const values = [];
    const id = route.paramMap.get('id');
    if (id && Number.isInteger(+id)) {
      values.push(this.find(id));
    } else {
      this.item.next(null);
    }

    return new Promise<void>((resolve, reject) => {
      Promise.all(values).then(() => {
        resolve();
      }, reject);
    });
  }

  private find(id): Promise<any> {
    return new Promise((resolve, reject) => {
      this.service.find(id).subscribe((response) => {
        this.item.next(ConstanteService.getDatas(response));
        resolve(response);
      }, reject);
    });
  }
}
