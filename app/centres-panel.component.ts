import {Component} from "@angular/core";
import {SheltersService} from "./services/shelters.service";
import {Shelter} from "./model/shelter";

@Component({
	selector: 'centres-panel',
	templateUrl: 'app/res/html/centres-panel.component.html',
	styleUrls: ['app/res/css/centres-panel.component.css']
})

export class CentresPanelComponent {

	shelters: Shelter[];
	errorMessage;

	constructor(private sheltersService: SheltersService) { }

	query = "";

	toggle(isVisible: boolean = false) {
		if (isVisible) {

		} else {

		}
	}

	onSelect(shelter: Shelter) {
		console.log("shelter selected : " + shelter.name);
	}

	onSearchRequested() {
		console.log("query : " + this.query);
		this.retrievesShelters();
	}

	retrievesShelters() {
		this.sheltersService.getShelters()
			.subscribe(
				shelters => this.shelters = shelters,
				error =>  this.errorMessage = <any>error);
	}
}