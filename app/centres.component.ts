import {Component, ViewChild} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from "angular2-google-maps/core";
import {CentresPanelComponent} from "./centres-panel.component";
import {SheltersService} from "./services/shelters.service";
import {Shelter} from "./model/shelter";
import {BS_VIEW_PROVIDERS, MODAL_DIRECTVES, ModalDirective} from "ng2-bootstrap/ng2-bootstrap";


@Component({
	selector: 'centres',
	templateUrl: 'app/res/html/centres.component.html',
	styleUrls: ['app/res/css/centres.component.css'],
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, CentresPanelComponent, MODAL_DIRECTVES],
	providers: [SheltersService, BS_VIEW_PROVIDERS],
	properties: ['height: height']
})

export class CentresComponent {
	// google maps zoom level
	zoom: number = 8;

	// initial center position for the map
	lat: number = 51.673858;
	lng: number = 7.815982;
	@ViewChild('smModal') smModal;

	clickedMarker(label: string, index: number) {
		//console.log(`clicked the marker: ${label || index}`)
	}

	onShelterSelected(shelter: Shelter) {
		//console.log("shelter selected : " + shelter.name + " push marker at : " + shelter.latitude + " " + shelter.longitude);
		if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
			this.smModal.show();
			return;
		}
		this.markers.push({
			lat: parseFloat(shelter.latitude.toString()),
			lng: parseFloat(shelter.longitude.toString()),
			label: shelter.name
		});
		console.log(this.markers);
	}

	mapClicked($event: MouseEvent) {
		this.markers.push({
			lat: $event.coords.lat,
			lng: $event.coords.lng,
			label: 'hclick'
		});
		console.log(this.markers);
	}

	markers: marker[] = [

	];

	getGoogleMapHeight() {
		var height = window.innerHeight - document.getElementById("app-header").offsetHeight;
		return height + "px";
	}
}


// just an interface for type safety.
interface marker {
	lat: number;
	lng: number;
	label?: string;
}