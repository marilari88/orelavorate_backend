export interface Timbratura {
    _id: {
        $oid: string;
    };
    ingresso: String;
    uscita?: String;
    differenza?: Number;
}