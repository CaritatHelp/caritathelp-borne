import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Shelter} from "../model/shelter";

@Injectable()
export class SheltersService {
    private API_URL_SHELTERS = 'http://api.caritathelp.me/shelters';  // URL to web API
    private API_URL_SHELTERS_RESEARCH = 'http://api.caritathelp.me/shelters/search';  // URL to web API
    private API_URL_SHELTER_PICTURES = 'http://api.caritathelp.me/shelters/';  // URL to pictures

    constructor (private http: Http) {}

    getShelters(): Observable<Shelter[]> {
        return this.http.get(this.API_URL_SHELTERS)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getShelterImage(shelter: Shelter): Observable<string[]> {
        return this.http.get(this.API_URL_SHELTER_PICTURES + shelter.id.toString() + "/pictures")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSearchShelters(query: string): Observable<Shelter[]> {
        return this.http.get(this.API_URL_SHELTERS_RESEARCH + "?research=" + query)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        console.log(body.response);
        return body.response || { };
    }

    private handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}