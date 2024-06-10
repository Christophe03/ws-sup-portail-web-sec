import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordreMission'
})
export class OrdreMissionPipe implements PipeTransform {

  transform(value: string, args?): string {
    if (value === 'P') return "sc.planifiee";
    if (value === 'A') return "sc.annulee";
    if (value === 'S') return "sc.soumise";
    if (value === 'V') return "sc.acceptee";
    if (value === 'R') return "sc.rejetee";
    if (value === 'F') return "sc.Fermee";
    return "";
  }

}
