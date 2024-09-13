import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrl: './my-form.component.css'
})
export class MyFormComponent {
  form: FormGroup;
  history: any[] = [];
  redoHistory: any[] = [];
  historyIndex = -1;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      email: [''],
      subscribed: [false],
      country: [''],
      textarea:['']
    });

    this.form.valueChanges.subscribe(() => this.saveState());
  }

  saveState() {
    // Save the current form state
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    this.history.push(this.form.value);
    this.redoHistory = [];
    this.historyIndex = this.history.length - 1;

  }

  undo() {
    if (this.canUndo()) {
      this.redoHistory.push(this.form.value);
      this.historyIndex--;
      this.form.patchValue(this.history[this.historyIndex], { emitEvent: false });

    }
  }

  redo() {
    if (this.canRedo()) {
      this.historyIndex++;
      this.form.patchValue(this.history[this.historyIndex], { emitEvent: false });

    }
  }

  canUndo(): boolean {
    return this.historyIndex > 0;
  }

  canRedo(): boolean {
    return this.redoHistory.length > 0;
  }
  }

