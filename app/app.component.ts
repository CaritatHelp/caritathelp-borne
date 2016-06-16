import {Component} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from "@angular/router-deprecated";
import {HomeComponent} from "./home.component";
import {CentresComponent} from "./centres.component";
import {EventsComponent} from "./events.component";

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
}