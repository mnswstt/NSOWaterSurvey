import { WaterSources9Component } from './../../components/water-sources9/water-sources9';
import { FieldDryCropPlantingComponent } from './../../components/field-dry-crop-planting/field-dry-crop-planting';
import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { EX_TREERAI_LIST } from '../../models/tree';

/**
 * Generated class for the DryCropPlantingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dry-crop-planting',
  templateUrl: 'dry-crop-planting.html',
})
export class DryCropPlantingPage {
  @ViewChildren(FieldDryCropPlantingComponent) private fieldDryCrop : FieldDryCropPlantingComponent[];
  public agronomyPlant: FormGroup;
  private submitRequested: boolean;
  shownData: string[];
 
  constructor(public navCtrl: NavController, public navParams: NavParams, private fb: FormBuilder, public modalCtrl: ModalController) {
    this.agronomyPlant = this.fb.group({
      'doing': [null, Validators.required],
      'fieldCount': [null, Validators.required],
      'fields': fb.array([
        FieldDryCropPlantingComponent.CreateFormGroup(fb)
      ])
      // 'irrigationField': [null, Validators.required],
      // 'names': [null, Validators.required],
    });
    this.setupFieldCountChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DryCropPlantingPage');

  }

  public handleSubmit() {
    this.submitRequested = true;
    this.fieldDryCrop.forEach(it=>it.submitRequest());
  }

  public isValid(name: string): boolean {
    var ctrl = this.agronomyPlant.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }
  // model() {
  //   const modal = this.modalCtrl.create("SearchDropdownPage", { type: "TREERAI", model: [], list: [] });

  //   modal.onDidDismiss(data => {
  //     if (data) {
  //       // this.FormItem = data;
  //       // var fg = <FormGroup>data;
  //       // this.FormItem.setValue(fg.value);

  //       var adata = data as Array<string>;
  //       this.shownData = adata.map(it => it.split(".")[1]);
  //     }
  //   });

  //   modal.present();
  // }
  // model() {
  //   const modal = this.modalCtrl.create("SearchDropdownPage",
  //     { title: "พืชไร่", selected: [], list: EX_TREERAI_LIST, limit: 5 });
  //   modal.onDidDismiss(data => {
  //     if (data) {
  //       // this.FormItem = data;
  //       // var fg = <FormGroup>data;
  //       // this.FormItem.setValue(fg.value);
  //       var adata = data as Array<string>;
  //       this.shownData = adata.map(it => it.split(".")[1]);
  //     }
  //   });

  //   modal.present();
  // }

  private setupFieldCountChanges() {
    const componentFormArray: string = "fields";
    const componentCount: string = "fieldCount";

    var onComponentCountChanges = () => {
      var fieldDryCrop = (this.agronomyPlant.get(componentFormArray) as FormArray).controls || [];
      var fieldCount = this.agronomyPlant.get(componentCount).value || 0;
      var field = this.fb.array([]);

      fieldCount = Math.max(0, fieldCount);

      for (let i = 0; i < fieldCount; i++) {
        var ctrl = null;
        if (i < fieldDryCrop.length) {
          const fld = fieldDryCrop[i];
          ctrl = fld;
        } else {
          ctrl = FieldDryCropPlantingComponent.CreateFormGroup(this.fb);
        }

        field.push(ctrl);
      }
      this.agronomyPlant.setControl(componentFormArray, field);
    };

    this.agronomyPlant.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }
}
