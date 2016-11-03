import {bootstrap} from "@angular/platform-browser-dynamic";
import {HTTP_PROVIDERS} from '@angular/http';
import {AppComponent} from "./app.component";
import {provide} from '@angular/core';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS, LazyMapsAPILoaderConfig} from "angular2-google-maps/core";

bootstrap(AppComponent, [ HTTP_PROVIDERS, ANGULAR2_GOOGLE_MAPS_PROVIDERS,
                                            provide(LazyMapsAPILoaderConfig, {useFactory: () => {
                                              let config = new LazyMapsAPILoaderConfig();
                                              config.apiKey = 'AIzaSyDaW5dY5CtJGJXTfkYsGzAeL2_wcsO6utg';
                                              return config;
                                            }})
                        ]);
