import {EventsService} from "./services/events.service";
import {Event} from "./model/event";
import {Component, ViewChild} from "@angular/core";
import {BS_VIEW_PROVIDERS, MODAL_DIRECTVES, ModalDirective} from "ng2-bootstrap/ng2-bootstrap";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from "angular2-google-maps/core";

@Component({
	selector: 'events',
	templateUrl: 'app/res/html/events.component.html',
    providers: [EventsService, BS_VIEW_PROVIDERS],
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MODAL_DIRECTVES],
	styleUrls: ['app/res/css/events.component.css']
})

export class EventsComponent {
	private IC_BT_SEARCH = "glyphicon-search";
	private IC_BT_REFRESH = "glyphicon-refresh";

	errorMessage;
    query = "";
	icMainButton = this.IC_BT_SEARCH;

    ranger = ["futur", "current", "past"];
    selectedRanger = "futur";
	events: Event[];
	selectedEvent: Event;
	@ViewChild('smModal') smModal;

	markers: marker[] = [

	];

	constructor(private eventsService: EventsService) {
	    this.onSearchRequested();
	}

	clearMarkers() {
		this.markers = [];
	}

    setDate(date: string) {
        return new Date(date);
    }

	clearList() {
			this.errorMessage = null;
    		this.events = [];
	}

	onSelect(event: Event) {
	}

	onEventDetailRequested(event: Event) {
        this.selectedEvent = event;

        this.clearMarkers();
        this.markers.push({
            lat: parseFloat(event.latitude.toString()),
            lng: parseFloat(event.longitude.toString()),
            event: event
        });
        this.smModal.show();
	}

	onSearchRequested() {
		this.clearList();
		this.retrievesEvents(this.query, this.selectedRanger);
	}

	updateRanger() {

	}

	mapClicked($event: MouseEvent) {

	}

	clickedMarker(event: Event) {

	}

    isGPSAvailable(event: Event) {
        if (event == null || event.latitude == null || event.longitude == null) {
            return "Non disponible";
        }
        return "disponible";
    }

    retrievesEvents(query: string, ranger: string) {
		this.icMainButton = this.IC_BT_REFRESH;
        var observable = (query == null || query == "")
            ? this.eventsService.getEvents(ranger)
            : this.eventsService.searchEvents(query, ranger);
        observable.subscribe(
            events => this.handleSuccess(events),
            error =>  this.errorMessage = <any>error,
            () => this.icMainButton = this.IC_BT_SEARCH);
    }

    handleSuccess(events: Event[]) {
        if (events == null || events.length == 0) {
            this.events = null;
            this.errorMessage = "Aucun résultat pour cette recherche";
            return;
        }

        this.errorMessage = null;
        this.events = events;
    }
}

// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	event: Event;
}