import {Component, EventEmitter, Output} from "@angular/core";
import {SheltersService} from "./services/shelters.service";
import {Shelter} from "./model/shelter";

@Component({
	selector: 'centres-panel',
	templateUrl: 'app/res/html/centres-panel.component.html',
	styleUrls: ['app/res/css/centres-panel.component.css']
})

export class CentresPanelComponent implements OnInit {

	private IC_BT_SEARCH = "glyphicon-search";
	private IC_BT_REFRESH = "glyphicon-refresh";

	private PANEL_OPEN = "centres_panel-main-open";
	private PANEL_CLOSED = "centres_panel-main-closed";

	private BUTTON_OPEN = "app/res/drawable/ic_menu.png";
	private BUTTON_CLOSE = "app/res/drawable/ic_close.png";

	private CONTENT_SHOW = "centres_panel-content-show";
	private CONTENT_HIDE = "centres_panel-content-hide";

	shelters: Shelter[];
	errorMessage;
	icMainButton = this.IC_BT_SEARCH;
	panelState = this.PANEL_OPEN;
	buttonSrc = this.BUTTON_CLOSE;
	contentAlpha = this.CONTENT_SHOW;

	@Output() onShelterSelected = new EventEmitter<Shelter>();
	@Output() onQueryFinished = new EventEmitter<Shelter[]>();

	constructor(private sheltersService: SheltersService) { }

	query = "";

  	ngOnInit() {
  	 	this.retrievesShelters("");
  	}

	clearList() {
			this.errorMessage = null;
    		this.shelters = [];
    		this.onQueryFinished.emit([]);
	}

	toggle(isVisible: boolean = false) {
		if (isVisible) {
			this.panelState = this.PANEL_CLOSED;
			this.buttonSrc = this.BUTTON_OPEN;
			this.contentAlpha = this.CONTENT_HIDE;
		} else {
			this.panelState = this.PANEL_OPEN;
			this.buttonSrc = this.BUTTON_CLOSE;
			this.contentAlpha = this.CONTENT_SHOW;
		}
	}

	onSelect(shelter: Shelter) {
		this.onShelterSelected.emit(shelter);
	}

	onSearchRequested() {
		console.log("query : " + this.query);
		this.retrievesShelters(this.query);
	}

	retrievesShelters(query: string) {
		this.icMainButton = this.IC_BT_REFRESH;
		var observable = (query == null || query == "")
			? this.sheltersService.getShelters()
			: this.sheltersService.getSearchShelters(query);
		observable.subscribe(
			shelters => this.handleSuccess(shelters),
			error =>  this.errorMessage = <any>error,
			() => this.icMainButton = this.IC_BT_SEARCH);
	}

	handleSuccess(shelters: Shelter[]) {
		if (shelters == null || shelters.length == 0) {
			this.shelters = null;
			this.errorMessage = "Aucun résultat pour cette recherche";
			return;
		}

		for (var shelter of shelters) {
			if (shelter.tags != null && shelter.tags.length == 0) {
				shelter.tags = null;
			}
		}

		this.errorMessage = null;
		this.shelters = shelters;
		this.onQueryFinished.emit(shelters);
	}
}