import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Event} from "../model/event";

var g_query = "";
@Injectable()
export class EventsService {
    private API_URL_EVENTS = 'https://staging.caritathelp.me/events?range=';  // URL to web API

    constructor (private http: Http) {}

    getEvents(ranger: string): Observable<Event[]> {
        return this.http.get(this.API_URL_EVENTS + ranger)
            .map(this.extractData)
            .catch(this.handleError);
    }

    searchEvents(query: string, ranger: string): Observable<Event[]> {
        g_query = query;
        console.log(g_query);
        console.log(this.API_URL_EVENTS + ranger);
        return this.http.get(this.API_URL_EVENTS + ranger)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
         let body = res.json();
         console.log(g_query);

        let events = body.response || { };
        let output = [];
        if (g_query == null || g_query == "") {
            output = events;
        } else {
            for (var item in events) {
                if ((events[item].assoc_name != null && events[item].assoc_name.toLowerCase().indexOf(g_query.toLowerCase()) !== -1) // search in assoc's name
                || (events[item].title != null && events[item].title.toLowerCase().indexOf(g_query.toLowerCase()) !== -1) // search in title
                || (events[item].place != null && events[item].place.toLowerCase().indexOf(g_query.toLowerCase()) !== -1) // search in place
                || (events[item].description != null && events[item].description.toLowerCase().indexOf(g_query.toLowerCase()) !== -1)) { // search in description
                    output.push(events[item]);
                }
            }
        }

         return output;
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