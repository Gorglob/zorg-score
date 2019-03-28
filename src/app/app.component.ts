import { PartyListPage } from './../pages/party-list/party-list';
import { AboutPage } from './../pages/about/about';
import { ConfigPage } from './../pages/config/config';
import { PlayerListPage } from './../pages/player-list/player-list';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PartyListPage;

  pages: Array<{title: string, component: any, icon : string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Liste des parties', component: PartyListPage, icon : 'game-controller-b' },
      { title: 'Liste des joueurs', component: PlayerListPage, icon : 'contact'},
      { title: 'Configuration', component: ConfigPage, icon : 'settings'},
      { title: 'A propos', component: AboutPage, icon : 'information-circle'},
      // { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
