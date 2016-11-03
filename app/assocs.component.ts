import {Component, ViewChild} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, MouseEvent} from "angular2-google-maps/core";
import {AssocsPanelComponent} from "./assocs-panel.component";
import {AssocsService} from "./services/assocs.service";
import {Assoc} from "./model/assoc";
import {BS_VIEW_PROVIDERS, MODAL_DIRECTVES, ModalDirective} from "ng2-bootstrap/ng2-bootstrap";


@Component({
	selector: 'assocs',
	templateUrl: 'app/res/html/assocs.component.html',
	styleUrls: ['app/res/css/assocs.component.css'],
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES, AssocsPanelComponent, MODAL_DIRECTVES],
	providers: [AssocsService, BS_VIEW_PROVIDERS],
	properties: ['height: height']
})

export class AssocsComponent {
	// google maps zoom level
	zoom: number = 12;
	selectedAssoc: Assoc;
	selectedUrls: string[];
	errorMessage: string;

	// initial center position for the map longitude="2.3488000" -d latitude="48.8534100"
	lat: number = 48.8534100;
	lng: number = 2.3488000;
	@ViewChild('smModal') smModal;

	constructor(private assocsService: AssocsService) { }

	clickedMarker(assoc: Assoc) {
		this.selectedUrls = null;
		this.selectedAssoc = assoc;
		console.log("click marker " + assoc);
		//this.retrievesAssocPictures(assoc);
	}

	retrievesAssocPictures(assoc: Assoc) {
		this.assocsService.getAssocImage(assoc).subscribe(
			urls => this.handleSuccess(urls),
			error =>  this.errorMessage = <any>error);
	}

	handleSuccess(urls: string[]) {
		//this.selectedUrls = urls;
	}

	clearAssocs() {
		this.markers = [];
	}

	onQueryFinished(assocs: Assoc[]) {
	    console.log("onQueryFinished" + assocs);
		this.clearAssocs();
		for (var assoc of assocs) {
			if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
				continue;
			}
			this.markers.push({
				lat: parseFloat(assoc.latitude.toString()),
				lng: parseFloat(assoc.longitude.toString()),
				assoc: assoc
			});
        }
	}

	onAssocSelected(assoc: Assoc) {
	    console.log("onAssocSelected" + assoc);
		this.clearAssocs();
		console.log("assoc selected : " + assoc.name + " push marker at : " + assoc.latitude + " " + assoc.longitude);
		if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
			this.smModal.show();
			return;
		}
		this.markers.push({
			lat: parseFloat(assoc.latitude.toString()),
			lng: parseFloat(assoc.longitude.toString()),
			assoc: assoc
		});
		console.log(this.markers);
	}

	mapClicked($event: MouseEvent) {
		/*var tmp = new Assoc;
		tmp.name = "rue du crabe";
		
		this.markers.push({
			lat: $event.coords.lat,
			lng: $event.coords.lng,
			assoc: tmp
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
	assoc: Assoc;
}