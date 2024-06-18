import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    //provideServerRendering(),
    // {provide: RouteReuseStrategy, useClass: RouteClass}

  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
