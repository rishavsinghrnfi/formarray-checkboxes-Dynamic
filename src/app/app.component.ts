import { Component, VERSION } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from "@angular/forms";

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      // get a list of checkbox values (boolean)
      .map(control => control.value)
      // total up the number of checked checkboxes
      .reduce((prev, next) => next ? prev + next : prev, 0);

    // if the total is not greater than the minimum, return the error message
    return totalSelected >= min ? null : { required: true };
  };

  return validator;
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {participantGroupMappingForm: FormGroup;

  form: FormGroup;
  participantIds = [
    '12345678',
    '87654321',
    '11654321',
    '22654321',
    '33654321',
  ];
  groupIds = [
    '000',
    '001',
    '002',
    '003',
    '004',
    '005'
  ];
  get participantsFormArray() {
    return this.form.controls.participants as FormArray;
  }
  get userGroupsFormArray() {
    return this.form.controls.userGroups as FormArray;
  }
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      participants: new FormArray([], minSelectedCheckboxes(1))
    });
// userGroups: new FormArray([], minSelectedCheckboxes(1))
    this.addCheckboxes();
  }

  private addCheckboxes() {
    this.participantIds.forEach(() => this.participantsFormArray.push(new FormControl(false)));
   // this.groupIds.forEach(() => this.userGroupsFormArray.push(new FormControl(false)));
  }

  submit() {
    const selectedParticipantIds = this.form.value.participants
      .map((checked, i) => checked ? this.participantIds[i] : null)
      .filter(v => v !== null);
    // const selectedGroupIds = this.form.value.userGroups
    //   .map((checked, i) => checked ? this.groupIds[i] : null)
    //   .filter(v => v !== null); 

    const result = {
      moudule_id: selectedParticipantIds,
      user_id: '201245',
    }
    //groups: selectedGroupIds

    console.log(JSON.stringify(result));
  }
}
