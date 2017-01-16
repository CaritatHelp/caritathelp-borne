import {Component, ViewContainerRef} from "@angular/core";
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router} from "@angular/router-deprecated";
import {HomeComponent} from "./home.component";
import {CentresComponent} from "./centres.component";
import {EventsComponent} from "./events.component";
import {AssocsComponent} from "./assocs.component";

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
	},
	{
		path: '/assocs',
		name: 'Assocs',
		component: AssocsComponent
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
	title = 'Caritathelp';
	private viewContainerRef;

	public constructor(public router: Router, viewContainerRef:ViewContainerRef) {
		// You need this small hack in order to catch application root view container ref
		this.viewContainerRef = viewContainerRef;
		router.subscribe((val) => this.setTitle(this.getTitleByPath(val)))
	}

    private setTitle(name: string) {
        if (name == null) {
            this.title = 'Caritathelp';
            return;
        }
        this.title = 'Caritathelp / ' + name;
    }

	private getTitleByPath(path: string) {
	    if (path == "assocs") {
	        return "Associations"
	    }
        if (path == "centres") {
            return "Centres"
        }
        if (path == "events") {
            return "Évènements"
        }
	    return null;
	}

    onLogoClicked($event: MouseEvent) {
        let link = ['Home'];
        this.router.navigate(link);
    }
}