import { Component } from '@angular/core';

import { Logs } from '../logs/logs';
import { Scan } from '../scan/scan';
import { HomePage } from '../home/home';
// import { Login } from '../login/login';
import { Settings } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Scan;
  tab3Root = Logs;
  tab4Root = Settings;

  constructor() {

  }
}
