import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addUserEntryToCurrentAddressAction } from '../../StoreMatch/match.actions';
import { getLoading } from '../../StoreMatch/match.selectors';

@Component({
  selector: 'att-add-text',
  templateUrl: './add-text.component.html',
  styleUrls: ['./add-text.component.scss'],
})
export class AddTextComponent implements OnInit {
  public addTextForm: FormGroup;
  public showSpinner: Observable<boolean>;

  constructor(private store: Store, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addTextForm = this.fb.group({
      textInputValue: ['', Validators.required],
    });

    this.showSpinner = this.store.select(getLoading);
  }

  async submit() {
    const textValue = this.addTextForm.get('textInputValue').value;

    this.store.dispatch(
      addUserEntryToCurrentAddressAction({
        textValue,
      }),
    );
  }
}
