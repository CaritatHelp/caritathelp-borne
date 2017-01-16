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
var core_2 = require("angular2-google-maps/core");
var centres_panel_component_1 = require("./centres-panel.component");
var shelters_service_1 = require("./services/shelters.service");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var CentresComponent = (function () {
    function CentresComponent(sheltersService) {
        this.sheltersService = sheltersService;
        // google maps zoom level
        this.zoom = 12;
        // initial center position for the map longitude="2.3488000" -d latitude="48.8534100"
        this.lat = 48.8534100;
        this.lng = 2.3488000;
        this.markers = [];
    }
    CentresComponent.prototype.clickedMarker = function (shelter) {
        this.selectedUrls = null;
        this.selectedShelter = shelter;
        //this.retrievesShelterPictures(shelter);
    };
    CentresComponent.prototype.retrievesShelterPictures = function (shelter) {
        var _this = this;
        this.sheltersService.getShelterImage(shelter).subscribe(function (urls) { return _this.handleSuccess(urls); }, function (error) { return _this.errorMessage = error; });
    };
    CentresComponent.prototype.handleSuccess = function (urls) {
        //this.selectedUrls = urls;
    };
    CentresComponent.prototype.clearShelters = function () {
        this.markers = [];
    };
    CentresComponent.prototype.onQueryFinished = function (shelters) {
        this.clearShelters();
        for (var _i = 0, shelters_1 = shelters; _i < shelters_1.length; _i++) {
            var shelter = shelters_1[_i];
            if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
                continue;
            }
            this.markers.push({
                lat: parseFloat(shelter.latitude.toString()),
                lng: parseFloat(shelter.longitude.toString()),
                shelter: shelter
            });
        }
    };
    CentresComponent.prototype.onShelterSelected = function (shelter) {
        this.clearShelters();
        //console.log("shelter selected : " + shelter.name + " push marker at : " + shelter.latitude + " " + shelter.longitude);
        if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
            this.smModal.show();
            return;
        }
        this.markers.push({
            lat: parseFloat(shelter.latitude.toString()),
            lng: parseFloat(shelter.longitude.toString()),
            shelter: shelter
        });
        this.lat = parseFloat(shelter.latitude.toString());
        this.lng = parseFloat(shelter.longitude.toString());
        console.log(this.markers);
    };
    CentresComponent.prototype.mapClicked = function ($event) {
        /*var tmp = new Shelter;
        tmp.name = "rue du crabe";

        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            shelter: tmp
        });
        console.log(this.markers);*/
    };
    CentresComponent.prototype.getGoogleMapHeight = function () {
        var height = window.innerHeight - document.getElementById("app-header").offsetHeight;
        return height + "px";
    };
    __decorate([
        core_1.ViewChild('smModal'), 
        __metadata('design:type', Object)
    ], CentresComponent.prototype, "smModal", void 0);
    CentresComponent = __decorate([
        core_1.Component({
            selector: 'centres',
            templateUrl: 'app/res/html/centres.component.html',
            styleUrls: ['app/res/css/centres.component.css'],
            directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, centres_panel_component_1.CentresPanelComponent, ng2_bootstrap_1.MODAL_DIRECTVES],
            providers: [shelters_service_1.SheltersService, ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            properties: ['height: height']
        }), 
        __metadata('design:paramtypes', [shelters_service_1.SheltersService])
    ], CentresComponent);
    return CentresComponent;
}());
exports.CentresComponent = CentresComponent;
//# sourceMappingURL=centres.component.js.map