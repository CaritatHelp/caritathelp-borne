import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Event} from "../model/event";

@Injectable()
export class EventsService {
    private API_URL_EVENTS = 'http://staging.caritathelp.me/events?range=';  // URL to web API

    constructor (private http: Http) {}

    getEvents(ranger: string): Observable<Event[]> {
        return this.http.get(this.API_URL_EVENTS + ranger)
            .map(this.extractData)
            .catch(this.handleError);
    }

    searchEvents(query: string, ranger: string): Observable<Event[]> {
        console.log(this.API_URL_EVENTS + ranger);
        return this.http.get(this.API_URL_EVENTS + ranger)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
         let body = res.json();
         console.log(body);
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