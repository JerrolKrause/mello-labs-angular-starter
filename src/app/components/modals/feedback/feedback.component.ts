import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackModalComponent implements OnInit {
  constructor(public ref: DynamicDialogRef) {}

  ngOnInit() {}

  /**
   * Submit the form
   */
  public submit() {
    this.ref.close();
  }
}
