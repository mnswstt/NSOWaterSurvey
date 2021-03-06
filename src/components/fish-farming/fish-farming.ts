import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { WaterSources9Component } from '../water-sources9/water-sources9';
import { PoolAreaComponent } from '../pool-area/pool-area';

/**
 * Generated class for the FishFarmingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'fish-farming',
  templateUrl: 'fish-farming.html'
})
export class FishFarmingComponent implements AfterViewInit {
  [x: string]: any;

  @Input() public FormItem: FormGroup;
  @Input('headline') text: string;
  @Input('type') type: string;
  private submitRequested: boolean;
  @ViewChildren(WaterSources9Component) private waterSources9: WaterSources9Component[];
  @ViewChildren(PoolAreaComponent) private poolArea: PoolAreaComponent[];


  constructor(public fb: FormBuilder) {
    console.log('Hello FishFarmingComponent Component');
    this.text = 'Hello World';
    this.type = 'กก.';

    this.FormItem = FishFarmingComponent.CreateFormGroup(fb);

    // this.setupPoolCountChanges()
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      "doing": [null, Validators.required],
      "depression": [false, Validators.required],
      "gardenGroove": [false, Validators.required],
      "stew": [false, Validators.required],
      "riceField": [false, Validators.required],
      'hasOther': [false, Validators.required],
      "other": ['', Validators.required],
      "fieldCount": ['', Validators.required],
      "fieldsAreSameSize": ['', Validators.required],
      "fields": fb.array([]),
      "animalsCount": ['', Validators.required],
      'waterSources': WaterSources9Component.CreateFormGroup(fb)
    },{
      validator: FishFarmingComponent.checkAnyOrOther()
    });
  }

  ngAfterViewInit(): void {
    this.setupPoolCountChanges()
  }
  
  
  submitRequest() {
    this.submitRequested = true;
    this.poolArea.forEach(it => it.submitRequest());
    this.waterSources9.forEach(it => it.submitRequest());
  }

  public static checkAnyOrOther(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => {
      const depression = c.get('depression');
      const gardenGroove = c.get('gardenGroove');
      const stew = c.get('stew');
      const riceField = c.get('riceField');
      const hasOther = c.get('hasOther');
      const other = c.get('other');
    

      if (!depression.value && !gardenGroove.value && !stew.value && !hasOther.value && !riceField.value) {
        return { 'anycheck': true };
      } else if (hasOther.value == true && (!other.value || other.value.trim() == '')) {
        return { 'other': true };
      }
      return null;
    }
  }
  
  // public handleSubmit() {
  //   this.submitRequested = true;
    
  // }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    
    if (name == 'anycheck') {
      ctrl = this.FormItem;
      return ctrl.errors && ctrl.errors.anycheck && (ctrl.touched || this.submitRequested);
    } else if (name == 'other') {
      return this.FormItem.errors && this.FormItem.errors.other && (ctrl.touched || this.submitRequested);
    }
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  private setupPoolCountChanges() {
    const componentFormArray: string = "fields";
    const componentCount: string = "fieldCount";

    var onComponentCountChanges = () => {
      var fields = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var fieldCount = this.FormItem.get(componentCount).value || 0;
      var pool = this.fb.array([]);

      fieldCount = Math.max(0, fieldCount);

      for (let i = 0; i < fieldCount; i++) {
        var ctrl = null;
        if (i < fields.length) {
          const fld = fields[i];
          ctrl = fld;
        } else {
          ctrl = PoolAreaComponent.CreateFormGroup(this.fb);
        }

        pool.push(ctrl);
      }
      this.FormItem.setControl(componentFormArray, pool);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }
}
