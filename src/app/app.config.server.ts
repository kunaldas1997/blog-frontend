import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { RouteReuseStrategy } from '@angular/router';
import { RouteClass } from './RouteClass';
const serverConfig: ApplicationConfig = {
  providers: [
    //provideServerRendering(),
    // {provide: RouteReuseStrategy, useClass: RouteClass}

  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
