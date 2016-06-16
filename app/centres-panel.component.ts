import {Component} from "@angular/core";

@Component({
	selector: 'centres-panel',
	templateUrl: 'app/res/html/centres-panel.component.html',
	styleUrls: ['app/res/css/centres-panel.component.css']
})

export class CentresPanelComponent {

	query = "";

	toggle(isVisible: boolean = false) {
		if (isVisible) {

		} else {

		}
	}

	onSearchRequested() {
		console.log("query" + this.query)
	}
}