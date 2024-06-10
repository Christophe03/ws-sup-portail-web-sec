import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "missionPipe",
})
export class MissionPipe implements PipeTransform {
  transform(value: string, args?): string {
    if (value === "P") return "smission.planifiee";
    if (value === "E") return "smission.en.cours";
    if (value === "C") return "smission.cloturee";
    if (value === "A") return "smission.annulle";
    return "";
  }
}
