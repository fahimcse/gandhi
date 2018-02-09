import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Network } from '@ionic-native/network';
import { Dialogs } from '@ionic-native/dialogs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, statusBar: StatusBar,
 splashScreen: SplashScreen,private dialogs: Dialogs,private network: Network ,private iab: InAppBrowser,  private spinnerDialog: SpinnerDialog) {
    platform.ready().then(() => {
        statusBar.styleDefault();

        
        if (this.network.type === "none")
        {
           this.dialogs.alert('Network was disconnected','Alert','Close')
            .then(() => platform.exitApp())
            .catch(e => platform.exitApp()); 
        }
        else
        {
            let browser = this.iab.create('https://www.shop-gandhigravesend.co.uk/','_blank',{location:'no',hidden:'yes',clearcache:'yes'});
            splashScreen.hide();
            this.network.onDisconnect().subscribe(() => {
                browser.hide();
                this.dialogs.alert('Network was disconnected','Alert','Close')
                .then(() => platform.exitApp())
                .catch(e => platform.exitApp());    
            });
            browser.on('loadstop').subscribe(event => {            
                this.spinnerDialog.hide();
                browser.show();

            }, err => {
                browser.hide();
                this.dialogs.alert('Sorry something went wrong','Alert','Close')
                    .then(() => platform.exitApp())
                    .catch(e => platform.exitApp());
            });
            browser.on('loadstart').subscribe(event => {
                 this.spinnerDialog.show("","Loading...",true);
            }, err => {
                browser.hide();
                this.dialogs.alert('Sorry something went wrong','Alert','Close')
                    .then(() => platform.exitApp())
                    .catch(e => platform.exitApp());
            });
            browser.on('exit').subscribe(event => {
                 platform.exitApp();
            }, err => {
                browser.hide();
                this.dialogs.alert('Sorry something went wrong','Alert','Close')
                    .then(() => platform.exitApp())
                    .catch(e => platform.exitApp());
            });
        }
      
    });
  }
}

