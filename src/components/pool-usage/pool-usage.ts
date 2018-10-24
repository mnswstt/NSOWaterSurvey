import { Component, Input, ViewChildren, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { PumpComponent } from '../pump/pump';

/**
 * Generated class for the PoolUsageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pool-usage',
  templateUrl: 'pool-usage.html'
})
export class PoolUsageComponent implements AfterViewInit ,ISubmitRequestable {

  @Input() public FormItem: FormGroup;
  @Input("headline") public text: string;
  @Input('no') no: string;

  private submitRequested: boolean;
  @ViewChildren(PumpComponent) private pump: PumpComponent[];

  constructor(public fb: FormBuilder) {
    console.log('Hello PoolUsageComponent Component');
    this.text = '1';


    this.FormItem = PoolUsageComponent.CreateFormGroup(this.fb);


  }

  ngAfterViewInit(): void {
    this.setupPumpCountChanges()
  }
  

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'isPoolUsage': ['', Validators.required],
      'cubicMeterPerMonth': [null, Validators.required],
      // 'unknowPoolUsage': [null, Validators.required],
      'hasPump': [null, Validators.required],
      'pumpCount': [null, Validators.required],
      'pumps': fb.array([]),
      

    });

   
  }







  submitRequest() {
    this.submitRequested = true;
    this.pump.forEach(it => it.submitRequest());
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  private setupPumpCountChanges() {
    const componentFormArray: string = "pumps";
    const componentCount: string = "pumpCount";

    var onComponentCountChanges = () => {
      var pumps = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var pumpCount = this.FormItem.get(componentCount).value || 0;
      var pump = this.fb.array([]);

      pumpCount = Math.max(0, pumpCount);

      for (let i = 0; i < pumpCount; i++) {
        var ctrl = null;
        if (i < pumps.length) {
          const fld = pumps[i];
          ctrl = fld;
        } else {
          ctrl = PumpComponent.CreateFormGroup(this.fb);
        }

        pump.push(ctrl);
      }
      this.FormItem.setControl(componentFormArray, pump);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}