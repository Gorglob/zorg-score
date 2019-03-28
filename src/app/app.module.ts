import { ComponentsModule } from './../components/components.module';
import { PartyBetPage } from './../pages/party-bet/party-bet';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { PartyListPage } from './../pages/party-list/party-list';
import { PlayerListPage } from './../pages/player-list/player-list';
import { PlayerPage } from './../pages/player/player';
import { PartyPage } from './../pages/party/party';
import { ConfigPage } from './../pages/config/config';
import { AboutPage } from './../pages/about/about';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HelperProvider } from '../providers/helper/helper';
import { PartyProvider } from '../providers/party/party';
import { PlayerProvider } from '../providers/player/player';
import { ConfigProvider } from '../providers/config/config';

@NgModule({
  declarations: [
    MyApp,
    PartyListPage,
    PlayerListPage,
    PlayerPage,
    PartyPage,    
    ConfigPage,
    AboutPage,
    PartyBetPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''      
    }),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PartyListPage,
    PlayerListPage,
    PlayerPage,
    PartyPage,    
    ConfigPage,
    AboutPage,
    PartyBetPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HelperProvider,
    PartyProvider,
    PlayerProvider,
    ConfigProvider
  ]
})
export class AppModule {}
