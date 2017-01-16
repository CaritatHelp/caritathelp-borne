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
var events_service_1 = require("./services/events.service");
var core_1 = require("@angular/core");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var core_2 = require("angular2-google-maps/core");
var EventsComponent = (function () {
    function EventsComponent(eventsService) {
        this.eventsService = eventsService;
        this.IC_BT_SEARCH = "glyphicon-search";
        this.IC_BT_REFRESH = "glyphicon-refresh";
        this.query = "";
        this.icMainButton = this.IC_BT_SEARCH;
        this.ranger = ["futur", "current", "past"];
        this.selectedRanger = "futur";
        this.markers = [];
        this.onSearchRequested();
    }
    EventsComponent.prototype.clearMarkers = function () {
        this.markers = [];
    };
    EventsComponent.prototype.setDate = function (date) {
        return new Date(date);
    };
    EventsComponent.prototype.clearList = function () {
        this.errorMessage = null;
        this.events = [];
    };
    EventsComponent.prototype.onSelect = function (event) {
    };
    EventsComponent.prototype.onEventDetailRequested = function (event) {
        this.selectedEvent = event;
        this.clearMarkers();
        this.markers.push({
            lat: parseFloat(event.latitude.toString()),
            lng: parseFloat(event.longitude.toString()),
            event: event
        });
        this.smModal.show();
    };
    EventsComponent.prototype.onSearchRequested = function () {
        console.log("query : " + this.query);
        this.clearList();
        this.retrievesEvents(this.query, this.selectedRanger);
    };
    EventsComponent.prototype.updateRanger = function () {
        console.log(this.selectedRanger);
    };
    EventsComponent.prototype.mapClicked = function ($event) {
    };
    EventsComponent.prototype.clickedMarker = function (event) {
    };
    EventsComponent.prototype.isGPSAvailable = function (event) {
        if (event == null || event.latitude == null || event.longitude == null) {
            return "Non disponible";
        }
        return "disponible";
    };
    EventsComponent.prototype.retrievesEvents = function (query, ranger) {
        var _this = this;
        this.icMainButton = this.IC_BT_REFRESH;
        var observable = (query == null || query == "")
            ? this.eventsService.getEvents(ranger)
            : this.eventsService.searchEvents(query, ranger);
        observable.subscribe(function (events) { return _this.handleSuccess(events); }, function (error) { return _this.errorMessage = error; }, function () { return _this.icMainButton = _this.IC_BT_SEARCH; });
    };
    EventsComponent.prototype.handleSuccess = function (events) {
        if (events == null || events.length == 0) {
            this.events = null;
            this.errorMessage = "Aucun résultat pour cette recherche";
            return;
        }
        var output = [];
        if (this.query == null || this.query == "") {
            output = events;
        }
        else {
            for (var item in events) {
                console.log(events[item]); // 0,1,2
                console.log(this.query); // 0,1,2
                console.log("index of => " + events[item].assoc_name.indexOf(this.query)); // 0,1,2
                if (events[item].assoc_name.indexOf(this.query) !== -1
                    || events[item].title.indexOf(this.query) !== -1
                    || events[item].place.indexOf(this.query) !== -1
                    || events[item].description.indexOf(this.query) !== -1) {
                    output.push(events[item]);
                }
            }
        }
        this.errorMessage = null;
        this.events = output;
    };
    __decorate([
        core_1.ViewChild('smModal'), 
        __metadata('design:type', Object)
    ], EventsComponent.prototype, "smModal", void 0);
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'events',
            templateUrl: 'app/res/html/events.component.html',
            providers: [events_service_1.EventsService, ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, ng2_bootstrap_1.MODAL_DIRECTVES],
            styleUrls: ['app/res/css/events.component.css']
        }), 
        __metadata('design:paramtypes', [events_service_1.EventsService])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map