"use strict";
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var http_1 = require('@angular/http');
var app_component_1 = require("./app.component");
var core_1 = require('@angular/core');
var core_2 = require("angular2-google-maps/core");
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [http_1.HTTP_PROVIDERS, core_2.ANGULAR2_GOOGLE_MAPS_PROVIDERS,
    core_1.provide(core_2.LazyMapsAPILoaderConfig, { useFactory: function () {
            var config = new core_2.LazyMapsAPILoaderConfig();
            config.apiKey = 'AIzaSyDaW5dY5CtJGJXTfkYsGzAeL2_wcsO6utg';
            return config;
        } })
]);
//# sourceMappingURL=main.js.map