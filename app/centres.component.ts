import {Component, ElementRef} from "@angular/core";
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ANGULAR2_GOOGLE_MAPS_PROVIDERS} from "angular2-google-maps/core";

@Component({
	selector: 'centres',
	templateUrl: 'app/res/html/centres.component.html',
	styleUrls: ['app/res/css/centres.component.css'],
	directives: [ANGULAR2_GOOGLE_MAPS_DIRECTIVES], // this loads all angular2-google-maps directives in this component
	// the following line sets the height of the map - Important: if you don't set a height, you won't see a map!!
	providers: [
		ANGULAR2_GOOGLE_MAPS_PROVIDERS
	],
	properties: ['height: height']
})

export class CentresComponent {
	lat: number = 51.678418;
	lng: number = 7.809007;

	private el:HTMLElement;
	constructor(el: ElementRef) { this.el = el.nativeElement; }

	getGoogleMapHeight() {
		var height = window.innerHeight - document.getElementById("app-header").offsetHeight;
		return height + "px";
	}
}