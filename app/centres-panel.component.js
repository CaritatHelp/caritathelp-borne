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
var shelters_service_1 = require("./services/shelters.service");
var CentresPanelComponent = (function () {
    function CentresPanelComponent(sheltersService) {
        this.sheltersService = sheltersService;
        this.IC_BT_SEARCH = "glyphicon-search";
        this.IC_BT_REFRESH = "glyphicon-refresh";
        this.PANEL_OPEN = "centres_panel-main-open";
        this.PANEL_CLOSED = "centres_panel-main-closed";
        this.BUTTON_OPEN = "app/res/drawable/ic_menu.png";
        this.BUTTON_CLOSE = "app/res/drawable/ic_close.png";
        this.CONTENT_SHOW = "centres_panel-content-show";
        this.CONTENT_HIDE = "centres_panel-content-hide";
        this.icMainButton = this.IC_BT_SEARCH;
        this.panelState = this.PANEL_OPEN;
        this.buttonSrc = this.BUTTON_CLOSE;
        this.contentAlpha = this.CONTENT_SHOW;
        this.query = "";
        this.onShelterSelected = new core_1.EventEmitter();
        this.onQueryFinished = new core_1.EventEmitter();
    }
    CentresPanelComponent.prototype.ngOnInit = function () {
        this.freePlaceOnly = false;
        this.retrievesShelters("");
    };
    CentresPanelComponent.prototype.clearList = function () {
        this.errorMessage = null;
        this.shelters = [];
        this.onQueryFinished.emit([]);
    };
    CentresPanelComponent.prototype.toggle = function (isVisible) {
        if (isVisible === void 0) { isVisible = false; }
        if (isVisible) {
            this.panelState = this.PANEL_CLOSED;
            this.buttonSrc = this.BUTTON_OPEN;
            this.contentAlpha = this.CONTENT_HIDE;
        }
        else {
            this.panelState = this.PANEL_OPEN;
            this.buttonSrc = this.BUTTON_CLOSE;
            this.contentAlpha = this.CONTENT_SHOW;
        }
    };
    CentresPanelComponent.prototype.isLocationAvailable = function (shelter) {
        if (shelter == null || shelter.latitude == null || shelter.longitude == null) {
            return "Non disponible";
        }
        return "disponible";
    };
    CentresPanelComponent.prototype.onSelect = function (shelter) {
        this.onShelterSelected.emit(shelter);
    };
    CentresPanelComponent.prototype.onSearchRequested = function () {
        this.clearList();
        console.log("query : " + this.query);
        this.retrievesShelters(this.query);
    };
    CentresPanelComponent.prototype.onFreePlacesOnlyChanged = function () {
        this.freePlaceOnly = !this.freePlaceOnly;
        console.log(this.freePlaceOnly);
        if (this.freePlaceOnly) {
            for (var _i = 0, _a = this.shelters; _i < _a.length; _i++) {
                var shelter = _a[_i];
                if (shelter.free_places == 0) {
                    this.shelters.splice(this.shelters.indexOf(shelter), 1);
                }
            }
        }
    };
    CentresPanelComponent.prototype.retrievesShelters = function (query) {
        var _this = this;
        this.icMainButton = this.IC_BT_REFRESH;
        var observable = (query == null || query == "")
            ? this.sheltersService.getShelters()
            : this.sheltersService.getSearchShelters(query);
        observable.subscribe(function (shelters) { return _this.handleSuccess(shelters); }, function (error) { return _this.errorMessage = error; }, function () { return _this.icMainButton = _this.IC_BT_SEARCH; });
    };
    CentresPanelComponent.prototype.handleSuccess = function (shelters) {
        if (shelters == null || shelters.length == 0) {
            this.shelters = null;
            this.errorMessage = "Aucun résultat pour cette recherche";
            return;
        }
        for (var _i = 0, shelters_1 = shelters; _i < shelters_1.length; _i++) {
            var shelter = shelters_1[_i];
            if (shelter.tags != null && shelter.tags.length == 0) {
                shelter.tags = null;
            }
        }
        if (this.freePlaceOnly) {
            for (var _a = 0, shelters_2 = shelters; _a < shelters_2.length; _a++) {
                var shelter = shelters_2[_a];
                if (shelter.free_places == 0) {
                    shelters.splice(shelters.indexOf(shelter), 1);
                }
            }
        }
        this.errorMessage = null;
        this.shelters = shelters;
        this.onQueryFinished.emit(shelters);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CentresPanelComponent.prototype, "onShelterSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CentresPanelComponent.prototype, "onQueryFinished", void 0);
    CentresPanelComponent = __decorate([
        core_1.Component({
            selector: 'centres-panel',
            templateUrl: 'app/res/html/centres-panel.component.html',
            styleUrls: ['app/res/css/centres-panel.component.css']
        }), 
        __metadata('design:paramtypes', [shelters_service_1.SheltersService])
    ], CentresPanelComponent);
    return CentresPanelComponent;
}());
exports.CentresPanelComponent = CentresPanelComponent;
//# sourceMappingURL=centres-panel.component.js.map