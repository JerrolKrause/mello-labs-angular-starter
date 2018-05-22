import { Injectable } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';

import { UIStoreActions } from './ui.actions';
import { AppSettings } from 'src/app/shared/app.settings';
import { AppStore } from 'src/app/shared/stores/store';
import { ApiService } from 'src/app/shared/stores/api';

import { ConfirmationModalComponent, LogoutModalComponent } from '$modals';

/** Sample Usage:
this.ui.modals.open('ConfirmationModalComponent', false, 'lg', 'Are you sure you want to delete this user?', 'Delete User').result.then(
	() => console.log('Modal Closed'),
	() => console.log('Modal Dismissed'));
*/

// List modals here by component name
type modals = 'LogoutModalComponent' | 'ConfirmationModalComponent';

@Injectable()
export class UIModalService {
  /** Reference to the STATIC currently open modal. This reference is used for static non persistant modals */
  public modalRef: NgbModalRef;
  /** Reference to the STORE OBSERVABLE currently open modal. This reference is used for modals persisted in the UI store */
  public modalRef$: BehaviorSubject<any> = new BehaviorSubject(null);
  /** List of component references of available modals */
  public modalList: { [key: string]: any } = {
    ConfirmationModalComponent: ConfirmationModalComponent,
    LogoutModalComponent: LogoutModalComponent,
  };

  constructor(
    private modalService: NgbModal,
    private store: Store<AppStore.Root>,
    private api: ApiService,
    private settings: AppSettings,
  ) {
    // Subscribe to the modal in the store and launch store modal if data is found. Also make sure token is present
    this.store.select(storeElem => storeElem.ui.modal).subscribe((modal: any) => {
      // Make sure modal exists AND that a token is present in app settings. This prevents a modal from persisting after logout
      if (modal && Object.keys(modal).length && this.settings.token) {
        // Store reference to the modal instance
        const modalRef = this.modalService.open(this.modalList[modal.modalId], modal.options);
        // Add any passed in data to the modal instance after it has opened
        if (modal.data) {
          modalRef.componentInstance.data = modal.data;
        }
        if (modal.dataAlt) {
          modalRef.componentInstance.dataAlt = modal.dataAlt;
        }
        this.modalRef$.next(modalRef);
        this.onClose();
      }
    });
  }

  /**
   * Open a modal window
   * @param modalId The class name of the modal window
   * @param persist Should the modal persist on reload or otherwise have its state managed by the UI store
   * @param size Modal size
   * @param data Primary set of data to pass to the modal
   * @param dataAlt Secondary set of data to pass to the modal
   */
  public open(
    modalId: modals,
    persist: boolean = false,
    size: 'sm' | 'lg' | 'xl' | 'full' = 'lg',
    data?: any,
    dataAlt?: any,
  ) {
    let windowClass = '';
    if (size === 'xl') {
      windowClass += ' modal-xl';
    }
    if (size === 'full') {
      windowClass += ' modal-full';
    }

    // If persist is set, load this modal into the store so state is managed by the UI store
    if (persist) {
      this.store.dispatch(
        UIStoreActions.MODAL_OPEN({
          modalId: modalId,
          options: { size: <any>size, windowClass: windowClass },
          data: data,
          dataAlt: dataAlt,
        }),
      );
    } else {
      // If persist is not set
      this.modalRef = this.modalService.open(this.modalList[modalId], { size: <any>size, windowClass: windowClass });
      if (data) {
        this.modalRef.componentInstance.data = data;
      }
      if (dataAlt) {
        this.modalRef.componentInstance.dataAlt = dataAlt;
      }
    }
    return this.modalRef;
  }

  /**
   * When the modal window is closed, remove from store
   */
  private onClose() {
    this.modalRef$.subscribe(modal => {
      // Wait for promise that is returned when modal is closed or dismissed
      modal.result.then(
        () => {
          this.store.dispatch(UIStoreActions.MODAL_UNLOAD(null));
          this.api.resetErrors();
          this.api.resetSuccess();
        },
        () => {
          // On modal dismiss, which is closed without performing an action
          this.store.dispatch(UIStoreActions.MODAL_UNLOAD(null));
          this.api.resetErrors();
          this.api.resetSuccess();
        },
      );
    });
  }
}
