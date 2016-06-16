import {Injectable} from "@angular/core";
import {Shelter} from "../model/shelter";

@Injectable()
export class SheltersService {
    SHELTERS : Shelter[] = [
        {id: 11, name: 'Mr. Nice'},
        {id: 12, name: 'Narco'},
        {id: 13, name: 'Bombasto'},
        {id: 14, name: 'Celeritas'},
        {id: 15, name: 'Magneta'},
        {id: 16, name: 'RubberMan'},
        {id: 17, name: 'Dynama'},
        {id: 18, name: 'Dr IQ'},
        {id: 19, name: 'Magma'},
        {id: 20, name: 'Tornado'}
    ];

    getShelters() {
        return Promise.resolve(this.SHELTERS);
    }

    getSheltersSlowly() {
        return new Promise<Shelter[]>(resolve =>
            setTimeout(() => resolve(this.SHELTERS), 2000) // 2 seconds
        );
    }
}