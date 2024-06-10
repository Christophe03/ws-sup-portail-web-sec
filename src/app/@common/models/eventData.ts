export interface EventData {
    endDate: string | number | Date;
    id: number;
    year: number;
    showYear: number;
    month: number;
    days: EventData[];
    events: EventData[];
    showMonth: number;
    startDate: Date; // Correction : s'agit-il de startDate au lieu de starDate ?
    jour: EventData[];
}
