interface UserData {
    id: number;
    formation: string;
    adresse: string[];
    code: string;
    date_insc: string;
    date_naiss: string;
    email: string;
    etablissement: string;
    annee_acc: string;
    lieu_naiss: string;
    pid: string;
    prenom: string;
    publish_at: string;
    sexe: string;
    tel1: string;
    tel2: string;
    ville: string;
    nom: string;
    niveau: string;
    length: number;
    join: (separator?: string) => string;
    reverse: () => any[];
    shift: () => any;
    slice: (start?: number, end?: number) => any[];
}