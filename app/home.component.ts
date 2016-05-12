import {Component} from '@angular/core';
import {Router} from '@angular/router-deprecated';

@Component({
    selector: 'home',
    templateUrl: 'app/res/html/home.component.html',
    styleUrls: ['app/res/css/home.component.css']
})

export class HomeComponent {

    constructor(
        private router: Router) {
    }

    onCentersRequested() {
        let link = ['Centres'];
        this.router.navigate(link);
    }

    onEventsRequested() {
        let link = ['Events'];
        this.router.navigate(link);
    }
}