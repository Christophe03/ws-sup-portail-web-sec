import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'AgentRole'
})
export class AgentRolePipe implements PipeTransform {

  transform(value: string, args?): string {
    if (value === 'U') return "UTILISATEUR";
    if (value === 'S') return "SYSTEME";
    return "";
  }

}
