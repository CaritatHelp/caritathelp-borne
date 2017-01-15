import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Assoc} from "../model/assoc";

@Injectable()
export class AssocsService {
    private API_URL_ASSOCIATIONS = 'https://staging.caritathelp.me/associations';  // URL to web API
    private API_URL_ASSOCIATIONS_RESEARCH = 'https://staging.caritathelp.me/associations/search';  // URL to web API
    private API_URL_SHELTER_PICTURES = 'https://staging.caritathelp.me/associations/';  // URL to pictures

    constructor (private http: Http) {}

    getAssocs(): Observable<Assoc[]> {
        return this.http.get(this.API_URL_ASSOCIATIONS)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAssocImage(assoc: Assoc): Observable<string[]> {
        return this.http.get(this.API_URL_SHELTER_PICTURES + assoc.id.toString() + "/pictures")
            .map(this.extractData)
            .catch(this.handleError);
    }

    getSearchAssocs(query: string): Observable<Assoc[]> {
        return this.http.get(this.API_URL_ASSOCIATIONS)
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