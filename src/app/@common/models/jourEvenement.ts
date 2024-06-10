import { EventData } from "./eventData";

export class JourEvenement {
    annee: number;
    mois: number;
    date: number;
    evenements: EventData[]; // Correction : changer le type pour correspondre à EventData

    constructor() {
        this.annee = 0;
        this.mois = 0;
        this.date = 0;
        this.evenements = [];
    }
}
