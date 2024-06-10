import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'separateurMilliers' })
export class SeparateurMilliersPipe implements PipeTransform {
  transform(value: number): string {
    return value.toLocaleString('fr-FR');
  }
}
