import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'domMail'
})
export class DomaineMailPipe implements PipeTransform {

  transform(value: string, args?): string {
    if (value === 'CL') return "dom.clients";
    if (value === 'AG') return "dom.collaborateurs";
    if (value === 'GC') return "dom.conges";
    if (value === 'MI') return "dom.missions";
    if (value === 'TP') return "dom.temps.passe";
    return "";
  }

}
