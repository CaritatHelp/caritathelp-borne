import {Component, ViewContainerRef} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HomeComponent} from "./home.component";
import {CentresComponent} from "./centres.component";
import {EventsComponent} from "./events.component";

// Add the RxJS Observable operators we need in this app.
import './rxjs-operators';

@RouteConfig([
	{
		path: '/home',
		name: 'Home',
		component: HomeComponent,
		useAsDefault: true
	},
	{
		path: '/centres',
		name: 'Centres',
		component: CentresComponent
	},
	{
		path: '/events',
		name: 'Events',
		component: EventsComponent
	}
])
@Component({
	selector: 'main-app',
	templateUrl: 'app/res/html/app.component.html',
	styleUrls: ['app/res/css/app.component.css'],

	directives: [ROUTER_DIRECTIVES],
	providers: [
		ROUTER_PROVIDERS
	]
})
export class AppComponent {
	title = 'Caritahelp';
	private viewContainerRef;

	public constructor(viewContainerRef:ViewContainerRef) {
		// You need this small hack in order to catch application root view container ref
		this.viewContainerRef = viewContainerRef;
	}
}