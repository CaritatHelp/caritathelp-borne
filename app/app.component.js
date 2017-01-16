"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var home_component_1 = require("./home.component");
var centres_component_1 = require("./centres.component");
var events_component_1 = require("./events.component");
var assocs_component_1 = require("./assocs.component");
// Add the RxJS Observable operators we need in this app.
require('./rxjs-operators');
var AppComponent = (function () {
    function AppComponent(router, viewContainerRef) {
        var _this = this;
        this.router = router;
        this.title = 'Caritathelp';
        // You need this small hack in order to catch application root view container ref
        this.viewContainerRef = viewContainerRef;
        router.subscribe(function (val) { return _this.setTitle(_this.getTitleByPath(val)); });
    }
    AppComponent.prototype.setTitle = function (name) {
        if (name == null) {
            this.title = 'Caritathelp';
            return;
        }
        this.title = 'Caritathelp / ' + name;
    };
    AppComponent.prototype.getTitleByPath = function (path) {
        if (path == "assocs") {
            return "Associations";
        }
        if (path == "centres") {
            return "Centres";
        }
        if (path == "events") {
            return "Évènements";
        }
        return null;
    };
    AppComponent.prototype.onLogoClicked = function ($event) {
        var link = ['Home'];
        this.router.navigate(link);
    };
    AppComponent = __decorate([
        router_deprecated_1.RouteConfig([
            {
                path: '/home',
                name: 'Home',
                component: home_component_1.HomeComponent,
                useAsDefault: true
            },
            {
                path: '/centres',
                name: 'Centres',
                component: centres_component_1.CentresComponent
            },
            {
                path: '/events',
                name: 'Events',
                component: events_component_1.EventsComponent
            },
            {
                path: '/assocs',
                name: 'Assocs',
                component: assocs_component_1.AssocsComponent
            }
        ]),
        core_1.Component({
            selector: 'main-app',
            templateUrl: 'app/res/html/app.component.html',
            styleUrls: ['app/res/css/app.component.css'],
            directives: [router_deprecated_1.ROUTER_DIRECTIVES],
            providers: [
                router_deprecated_1.ROUTER_PROVIDERS
            ]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, core_1.ViewContainerRef])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map