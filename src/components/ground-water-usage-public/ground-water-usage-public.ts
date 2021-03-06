import { Component, Input, AfterViewInit, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ISubmitRequestable } from '../../shared/ISubmitRequestable';
import { PumpComponent } from '../pump/pump';
import { WaterActivity6Component } from '../water-activity6/water-activity6';
import { WaterProblem6Component } from '../water-problem6/water-problem6';

/**
 * Generated class for the GroundWaterUsagePublicComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'ground-water-usage-public',
  templateUrl: 'ground-water-usage-public.html'
})
export class GroundWaterUsagePublicComponent implements AfterViewInit, ISubmitRequestable {

  @Input('no') text: string;
  @Input() public FormItem: FormGroup;

  @ViewChildren(PumpComponent) private pump: PumpComponent[];
  @ViewChildren(WaterActivity6Component) private waterActivity6: WaterActivity6Component[];
  @ViewChildren(WaterProblem6Component) private waterProblem6: WaterProblem6Component[];


  private submitRequested: boolean;

  constructor(private fb: FormBuilder) {

    this.FormItem = PumpComponent.CreateFormGroup(this.fb);

  }

  ngAfterViewInit(): void {
    this.setupPumpCountChanges()
  }

  public static CreateFormGroup(fb: FormBuilder): FormGroup {
    return fb.group({
      'cubicMeterPerMonth': [null, Validators.required],
      'unknow': [null, Validators.required],
      'hasPump': [null, Validators.required],
      'pumpCount': [null, Validators.required],
      'pump': fb.array([]),
      'usageActivities': WaterActivity6Component.CreateFormGroup(fb),
      'hasQaulityProblem': [null, Validators.required],
      'qualityProblems': fb.group({
        "hasProblem": [null, Validators.required],
        "problem": WaterProblem6Component.CreateFormGroup(fb)
      })
    });
  }

  submitRequest() {
    this.submitRequested = true;
    this.pump.forEach(it => it.submitRequest());
    this.waterProblem6.forEach(it => it.submitRequest());
    this.waterActivity6.forEach(it => it.submitRequest());
  }

  public isValid(name: string): boolean {
    var ctrl = this.FormItem.get(name);
    return ctrl.invalid && (ctrl.touched || this.submitRequested);
  }

  private setupPumpCountChanges() {
    const componentFormArray: string = "pump";
    const componentCount: string = "pumpCount";

    var onComponentCountChanges = () => {
      var pump = (this.FormItem.get(componentFormArray) as FormArray).controls || [];
      var pumpCount = this.FormItem.get(componentCount).value || 0;
      var p = this.fb.array([]);

      pumpCount = Math.max(0, pumpCount);

      for (let i = 0; i < pumpCount; i++) {
        var ctrl = null;
        if (i < pump.length) {
          const fld = pump[i];
          ctrl = fld;
        } else {
          ctrl = PumpComponent.CreateFormGroup(this.fb);
        }

        p.push(ctrl);
      }
      this.FormItem.setControl(componentFormArray, p);
    };

    this.FormItem.get(componentCount).valueChanges.subscribe(it => onComponentCountChanges());

    onComponentCountChanges();
  }

}
