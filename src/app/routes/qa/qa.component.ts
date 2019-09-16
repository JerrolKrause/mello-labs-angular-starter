import { Component, OnInit } from '@angular/core';
import {
  ConfirmationService,
  DialogService,
  MessageService,
} from 'primeng/api';
import { DemoModalComponent } from './components/modal/demo-modal/demo-modal.component';
import { LogoutModalComponent, FeedbackModalComponent } from '$modals';
import { filter } from 'rxjs/operators';
import { NtsServiceWorkerService } from '$services';

@Component({
  selector: 'app-qa',
  templateUrl: './qa.component.html',
  styleUrls: ['./qa.component.scss'],
})
export class QaComponent implements OnInit {
  public launchModalWorks: boolean | undefined;

  public filterFruit: any;
  public filterFruitMore: any;
  public fruits = [
    'Apple',
    'Orange',
    'Kiwi',
    'Marionberries',
    'Loganberries',
    'Mangostein',
    'Peach',
    'Pear',
    'Blackberries',
    'Strawberries',
  ];
  public fruitsMore = [
    { name: 'Apple' },
    { name: 'Orange' },
    { name: 'Kiwi' },
    { name: 'Marionberries' },
    { name: 'Loganberries' },
    { name: 'Mangostein' },
    { name: 'Peach' },
    { name: 'Pear' },
    { name: 'Blackberries' },
    { name: 'Strawberries' },
  ];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private sw: NtsServiceWorkerService,
    private message: MessageService,
  ) {}

  ngOnInit() {}

  /**
   * Confirm Window
   * https://www.primefaces.org/primeng/#/confirmdialog
   */
  public modalConfirm() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      header: 'Confirmation',
      accept: () => {
        console.log('Awesomeness Ensures!!!');
      },
      reject: () => {
        console.log('Nope!!!');
      },
    });
  }

  /**
   * Component Modal
   * https://www.primefaces.org/primeng/#/dynamicdialog
   */
  public modalOpen() {
    this.dialogService.open(DemoModalComponent, {
      data: {
        id: '51gF3',
      },
      header: 'Choose a Car',
      width: '70%',
      dismissableMask: true,
    });
  }

  /**
   * Component Modal
   * https://www.primefaces.org/primeng/#/dynamicdialog
   */
  public modalOpen2() {
    const ref = this.dialogService.open(LogoutModalComponent, {
      data: 60,
      header: 'Warning',
      width: '70%',
      dismissableMask: true,
    });

    ref.onClose.subscribe((reason: any) => {
      if (reason !== true) {
        console.log('Reset timer');
      } else {
        console.log('Log out');
      }
    });
  }
  /**
   * Component Modal
   * https://www.primefaces.org/primeng/#/dynamicdialog
   */
  public modalOpen3() {
    const ref = this.dialogService.open(FeedbackModalComponent, {
      data: 60,
      header: 'Send Feedback',
      width: '70%',
      dismissableMask: true,
    });

    ref.onClose.subscribe((reason: any) => {
      if (reason !== true) {
        console.log('Reset timer');
      } else {
        console.log('Log out');
      }
    });
  }

  public toasterPop() {
    console.log(1, this.message);
    this.message.add({
      severity: 'success',
      summary: 'Service Message',
      detail: 'Via MessageService',
    });
  }

  /**
   * Send a browser notification
   */
  public pushNotification() {
    this.sw
      .sendNotification('Hello World')
      .pipe(filter(res => res.type === 'click')) // Only get click events
      .subscribe(res => {
        console.log(res);
      });
  }

  public removeSW() {
    this.sw.remove();
  }
}
