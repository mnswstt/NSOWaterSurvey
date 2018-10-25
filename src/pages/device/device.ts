import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder } from '@ionic-native/native-geocoder';
import { Platform } from 'ionic-angular/platform/platform';

/**
 * Generated class for the DevicePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-device',
  templateUrl: 'device.html',
})
export class DevicePage {

  public lat;
  public long;
  public locat;

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner, private geolocation: Geolocation, private nativeGeocoder: NativeGeocoder, private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DevicePage');
  }

  public scanQR() {
    if (this.platform.is('cordova')) {
      // Optionally request the permission early
      this.qrScanner.prepare()
        .then((status: QRScannerStatus) => {
          if (status.authorized) {
            // camera permission was granted

            
            // start scanning
            let scanSub = this.qrScanner.scan().subscribe((text: string) => {
              console.log('Scanned something', text);

              this.qrScanner.hide(); // hide camera preview
              scanSub.unsubscribe(); // stop scanning
            });

          } else if (status.denied) {
            // camera permission was permanently denied
            // you must use QRScanner.openSettings() method to guide the user to the settings page
            // then they can grant the permission from there
          } else {
            // permission was denied, but not permanently. You can ask for permission again at a later time.
          }
        })
        .catch((e: any) => console.log('Error is', e));
    }
  }

  public getLocation() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then(pos => {
      this.lat = pos.coords.latitude;
      this.long = pos.coords.longitude;

      if (this.platform.is("cordova")) {
        this.nativeGeocoder.reverseGeocode(this.lat, this.long, { defaultLocale: "th-TH", maxResults: 1, useLocale: true }).then(arr => {
          if (arr && arr.length > 0) {
            let r = arr[0];
            this.locat = r.administrativeArea + ', ' + r.locality + ', ' + r.countryName + ', ' + r.postalCode;
          }
        });
      }
    });
  }

}
