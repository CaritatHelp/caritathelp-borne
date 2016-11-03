import {Component, EventEmitter, Output, OnInit} from "@angular/core";
import {AssocsService} from "./services/assocs.service";
import {Assoc} from "./model/assoc";

@Component({
	selector: 'assocs-panel',
	templateUrl: 'app/res/html/assocs-panel.component.html',
	styleUrls: ['app/res/css/assocs-panel.component.css']
})

export class AssocsPanelComponent implements OnInit {

	private IC_BT_SEARCH = "glyphicon-search";
	private IC_BT_REFRESH = "glyphicon-refresh";

	private PANEL_OPEN = "assocs_panel-main-open";
	private PANEL_CLOSED = "assocs_panel-main-closed";

	private BUTTON_OPEN = "app/res/drawable/ic_menu.png";
	private BUTTON_CLOSE = "app/res/drawable/ic_close.png";

	private CONTENT_SHOW = "assocs_panel-content-show";
	private CONTENT_HIDE = "assocs_panel-content-hide";

	assocs: Assoc[];
	errorMessage;
	icMainButton = this.IC_BT_SEARCH;
	panelState = this.PANEL_OPEN;
	buttonSrc = this.BUTTON_CLOSE;
	contentAlpha = this.CONTENT_SHOW;

    query = "";

	@Output() onAssocSelected = new EventEmitter<Assoc>();
	@Output() onQueryFinished = new EventEmitter<Assoc[]>();

	constructor(private assocsService: AssocsService) { }

  	ngOnInit() {
  	 	this.retrievesAssocs("");
  	}

	clearList() {
			this.errorMessage = null;
    		this.assocs = [];
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

    isLocationAvailable(assoc: Assoc) {
        if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
            return "Non disponible";
        }
        return "disponible";
    }

	onSelect(assoc: Assoc) {
        console.log("on select")
    	this.onAssocSelected.emit(assoc);
	}

	onSearchRequested() {
		this.clearList();
		console.log("query : " + this.query);
		this.retrievesAssocs(this.query);
	}

	retrievesAssocs(query: string) {
		this.icMainButton = this.IC_BT_REFRESH;
		var observable = (query == null || query == "")
			? this.assocsService.getAssocs()
			: this.assocsService.getSearchAssocs(query);
		observable.subscribe(
			assocs => this.handleSuccess(assocs),
			error =>  this.errorMessage = <any>error,
			() => this.icMainButton = this.IC_BT_SEARCH);
	}

	handleSuccess(assocs: Assoc[]) {
		if (assocs == null || assocs.length == 0) {
			this.assocs = null;
			this.errorMessage = "Aucun résultat pour cette recherche";
			return;
		}

        if (this.query != "") {
            for (var assoc of assocs) {
                if (assoc.name.indexOf(this.query) == -1 &&
                    assoc.description.indexOf(this.query) == -1) {
                    assocs.splice(assocs.indexOf(assoc), 1);
                }
            }
        }

		this.errorMessage = null;
		this.assocs = assocs;
		this.onQueryFinished.emit(assocs);
	}
}