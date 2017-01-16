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
var assocs_service_1 = require("./services/assocs.service");
var AssocsPanelComponent = (function () {
    function AssocsPanelComponent(assocsService) {
        this.assocsService = assocsService;
        this.IC_BT_SEARCH = "glyphicon-search";
        this.IC_BT_REFRESH = "glyphicon-refresh";
        this.PANEL_OPEN = "assocs_panel-main-open";
        this.PANEL_CLOSED = "assocs_panel-main-closed";
        this.BUTTON_OPEN = "app/res/drawable/ic_menu.png";
        this.BUTTON_CLOSE = "app/res/drawable/ic_close.png";
        this.CONTENT_SHOW = "assocs_panel-content-show";
        this.CONTENT_HIDE = "assocs_panel-content-hide";
        this.icMainButton = this.IC_BT_SEARCH;
        this.panelState = this.PANEL_OPEN;
        this.buttonSrc = this.BUTTON_CLOSE;
        this.contentAlpha = this.CONTENT_SHOW;
        this.query = "";
        this.onAssocSelected = new core_1.EventEmitter();
        this.onQueryFinished = new core_1.EventEmitter();
    }
    AssocsPanelComponent.prototype.ngOnInit = function () {
        this.retrievesAssocs("");
    };
    AssocsPanelComponent.prototype.clearList = function () {
        this.errorMessage = null;
        this.assocs = [];
        this.onQueryFinished.emit([]);
    };
    AssocsPanelComponent.prototype.toggle = function (isVisible) {
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
    AssocsPanelComponent.prototype.isLocationAvailable = function (assoc) {
        if (assoc == null || assoc.latitude == null || assoc.longitude == null) {
            return "Non disponible";
        }
        return "disponible";
    };
    AssocsPanelComponent.prototype.onSelect = function (assoc) {
        console.log("on select");
        this.onAssocSelected.emit(assoc);
    };
    AssocsPanelComponent.prototype.onSearchRequested = function () {
        this.clearList();
        console.log("query : " + this.query);
        this.retrievesAssocs(this.query);
    };
    AssocsPanelComponent.prototype.retrievesAssocs = function (query) {
        var _this = this;
        this.icMainButton = this.IC_BT_REFRESH;
        var observable = (query == null || query == "")
            ? this.assocsService.getAssocs()
            : this.assocsService.getSearchAssocs(query);
        observable.subscribe(function (assocs) { return _this.handleSuccess(assocs); }, function (error) { return _this.errorMessage = error; }, function () { return _this.icMainButton = _this.IC_BT_SEARCH; });
    };
    AssocsPanelComponent.prototype.handleSuccess = function (assocs) {
        if (assocs == null || assocs.length == 0) {
            this.assocs = null;
            this.errorMessage = "Aucun résultat pour cette recherche";
            return;
        }
        var output = [];
        if (this.query != "") {
            for (var _i = 0, assocs_1 = assocs; _i < assocs_1.length; _i++) {
                var assoc = assocs_1[_i];
                var index = assoc.name.toLowerCase().indexOf(this.query.toLowerCase());
                if (index == -1) {
                    index = assoc.description.toLowerCase().indexOf(this.query.toLowerCase());
                }
                if (index != -1) {
                    output.push(assoc);
                }
            }
        }
        else {
            output = assocs;
        }
        this.errorMessage = null;
        this.assocs = output;
        this.onQueryFinished.emit(output);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssocsPanelComponent.prototype, "onAssocSelected", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AssocsPanelComponent.prototype, "onQueryFinished", void 0);
    AssocsPanelComponent = __decorate([
        core_1.Component({
            selector: 'assocs-panel',
            templateUrl: 'app/res/html/assocs-panel.component.html',
            styleUrls: ['app/res/css/assocs-panel.component.css']
        }), 
        __metadata('design:paramtypes', [assocs_service_1.AssocsService])
    ], AssocsPanelComponent);
    return AssocsPanelComponent;
}());
exports.AssocsPanelComponent = AssocsPanelComponent;
//# sourceMappingURL=assocs-panel.component.js.map