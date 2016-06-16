import {Component} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from "angular2-google-maps/core";
import {CentresPanelComponent} from "./centres-panel.component";
import {SheltersService} from "./services/shelters.service";


@Component({
	selector: 'centres',
	templateUrl: 'app/res/html/centres.component.html',
	styleUrls: ['app/res/css/centres.component.css'],
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, CentresPanelComponent],
	providers: [SheltersService],
	properties: ['height: height']
})

export class CentresComponent {
	lat: number = 51.678418;
	lng: number = 7.809007;

	clickedMarker(label: string, index: number) {
		console.log(`clicked the marker: ${label || index}`)
	}

	mapClicked($event: MouseEvent) {
		this.markers.push({
			lat: $event.coords.lat,
			lng: $event.coords.lng,
			label: 'hclick'
		});
	}

	markers: marker[] = [
		{
			lat: 51.673858,
			lng: 7.815982,
			label: 'A'
		},
		{
			lat: 51.373858,
			lng: 7.215982,
			label: 'B'
		},
		{
			lat: 51.723858,
			lng: 7.895982,
			label: 'C'
		}
	]

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