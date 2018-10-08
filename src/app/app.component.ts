import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { IrrigationPage } from '../pages/irrigation/irrigation';
import { RainPage } from '../pages/rain/rain';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      // test push
      { title: 'Gun', component: "GunPage" },
      { title: 'Home', component: HomePage },
      { title: 'Zero', component: "ZeroPage" },
      { title: 'Demo', component: "DemoPage" },
      { title: 'Rice', component: "RicePage" },
      { title: 'Mushroom', component: "MushroomPage" },
      { title: 'List', component: ListPage },
      { title: 'Plumbing', component: "PlumbingPage" },
      { title: 'GroundWater', component: "GroundWaterPage" },
      { title: 'River', component: "RiverPage" },
      { title: 'FlowerCrop', component: "FlowerCropPage" },
      { title: 'HerbsPlant', component: "HerbsPlantPage" },
      { title: 'AnimalFarm', component: "AnimalFarmPage" },
      { title: 'Factorial', component: "FactorialPage" },
      { title: 'Disaster', component: "DisasterPage" },
      { title: 'Residential', component: "ResidentialPage" },
      { title: 'Buying', component: "BuyingPage" },
      { title: 'Disasterous', component: "DisasterousPage" },
      { title: 'Irrigation', component: IrrigationPage },
      { title: 'Rain', component: RainPage },
      { title: 'Dry-CropPlanting', component: "DryCropPlantingPage" },
      { title: 'RubberTree', component: "RubberTreePage" },
      { title: 'PerennialPlanting', component: "PerennialPlantingPage" },
      { title: 'WaterAnimalPlanting', component: "WaterAnimalPlantingPage" },
      { title: 'PrivateGroundWater', component: "PrivateGroundWaterPage" },
      { title: 'PublicGroundWater', component: "PublicGroundWaterPage" },
      

      


      { title: 'User', component: "UserPage" },
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
