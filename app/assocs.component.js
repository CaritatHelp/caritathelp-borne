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
var assocs_panel_component_1 = require("./assocs-panel.component");
var assocs_service_1 = require("./services/assocs.service");
var ng2_bootstrap_1 = require("ng2-bootstrap/ng2-bootstrap");
var AssocsComponent = (function () {
    function AssocsComponent(assocsService) {
        this.assocsService = assocsService;
        // google maps zoom level
        this.zoom = 12;
        // initial center position for the map longitude="2.3488000" -d latitude="48.8534100"
        this.lat = 48.8534100;
        this.lng = 2.3488000;
        this.markers = [];
    }
    AssocsComponent.prototype.clickedMarker = function (assoc) {
        this.selectedUrls = null;
        this.selectedAssoc = assoc;
        console.log("click marker " + assoc);
        //this.retrievesAssocPictures(assoc);
    };
    AssocsComponent.prototype.retrievesAssocPictures = function (assoc) {
        var _this = this;
        this.assocsService.getAssocImage(assoc).subscribe(function (urls) { return _this.handleSuccess(urls); }, function (error) { return _this.errorMessage = error; });
    };
    AssocsComponent.prototype.handleSuccess = function (urls) {
        //this.selectedUrls = urls;
    };
    AssocsComponent.prototype.clearAssocs = function () {
        this.markers = [];
    };
    AssocsComponent.prototype.onQueryFinished = function (assocs) {
        console.log("onQueryFinished" + assocs);
        this.clearAssocs();
        for (var _i = 0, assocs_1 = assocs; _i < assocs_1.length; _i++) {
            var assoc = assocs_1[_i];
            if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
                continue;
            }
            this.markers.push({
                lat: parseFloat(assoc.latitude.toString()),
                lng: parseFloat(assoc.longitude.toString()),
                assoc: assoc
            });
        }
    };
    AssocsComponent.prototype.onAssocSelected = function (assoc) {
        console.log("onAssocSelected" + assoc);
        this.clearAssocs();
        console.log("assoc selected : " + assoc.name + " push marker at : " + assoc.latitude + " " + assoc.longitude);
        if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
            this.smModal.show();
            return;
        }
        this.markers.push({
            lat: parseFloat(assoc.latitude.toString()),
            lng: parseFloat(assoc.longitude.toString()),
            assoc: assoc
        });
        this.lat = parseFloat(assoc.latitude.toString());
        this.lng = parseFloat(assoc.longitude.toString());
        console.log(this.markers);
    };
    AssocsComponent.prototype.mapClicked = function ($event) {
        /*var tmp = new Assoc;
        tmp.name = "rue du crabe";
        
        this.markers.push({
            lat: $event.coords.lat,
            lng: $event.coords.lng,
            assoc: tmp
        });
        console.log(this.markers);*/
    };
    AssocsComponent.prototype.getGoogleMapHeight = function () {
        var height = window.innerHeight - document.getElementById("app-header").offsetHeight;
        return height + "px";
    };
    __decorate([
        core_1.ViewChild('smModal'), 
        __metadata('design:type', Object)
    ], AssocsComponent.prototype, "smModal", void 0);
    AssocsComponent = __decorate([
        core_1.Component({
            selector: 'assocs',
            templateUrl: 'app/res/html/assocs.component.html',
            styleUrls: ['app/res/css/assocs.component.css'],
            directives: [core_2.ANGULAR2_GOOGLE_MAPS_DIRECTIVES, assocs_panel_component_1.AssocsPanelComponent, ng2_bootstrap_1.MODAL_DIRECTVES],
            providers: [assocs_service_1.AssocsService, ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            properties: ['height: height']
        }), 
        __metadata('design:paramtypes', [assocs_service_1.AssocsService])
    ], AssocsComponent);
    return AssocsComponent;
}());
exports.AssocsComponent = AssocsComponent;
//# sourceMappingURL=assocs.component.js.map