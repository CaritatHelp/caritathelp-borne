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
	selectedShelter: Shelter;
	selectedUrls: string[];

	// initial center position for the map longitude="2.3488000" -d latitude="48.8534100"
	lat: number = 48.8534100;
	lng: number = 2.3488000;
	@ViewChild('smModal') smModal;

	constructor(private sheltersService: SheltersService) { }

	clickedMarker(shelter: Shelter) {
		this.selectedUrls = null;
		this.selectedShelter = shelter;
		//this.retrievesShelterPictures(shelter);
	}

	retrievesShelterPictures(shelter: Shelter) {
		this.sheltersService.getShelterImage(shelter).subscribe(
			urls => this.handleSuccess(urls),
			error =>  this.errorMessage = <any>error);
	}

	handleSuccess(urls: string[]) {
		//this.selectedUrls = urls;
	}

	clearShelters() {
		this.markers = [];
	}

	onQueryFinished(shelters: Shelter[]) {
		this.clearShelters();
		for (var shelter of shelters) {
			if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
				continue;
			}
			this.markers.push({
				lat: parseFloat(shelter.latitude.toString()),
				lng: parseFloat(shelter.longitude.toString()),
				shelter: shelter
			});
        }
	}

	onShelterSelected(shelter: Shelter) {
		this.clearShelters();
		//console.log("shelter selected : " + shelter.name + " push marker at : " + shelter.latitude + " " + shelter.longitude);
		if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
			this.smModal.show();
			return;
		}
		this.markers.push({
			lat: parseFloat(shelter.latitude.toString()),
			lng: parseFloat(shelter.longitude.toString()),
			shelter: shelter
		});
		console.log(this.markers);
	}

	mapClicked($event: MouseEvent) {
		/*var tmp = new Shelter;
		tmp.name = "rue du crabe";
		
		this.markers.push({
			lat: $event.coords.lat,
			lng: $event.coords.lng,
			shelter: tmp
		});
		console.log(this.markers);*/
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
	shelter: Shelter;
}