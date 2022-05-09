import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDial, Dial } from '../dial.model';
import { DialService } from '../service/dial.service';
import { IBucket } from 'app/entities/simManagementTool/bucket/bucket.model';
import { BucketService } from 'app/entities/simManagementTool/bucket/service/bucket.service';
import { ICustomer } from 'app/entities/simManagementTool/customer/customer.model';
import { CustomerService } from 'app/entities/simManagementTool/customer/service/customer.service';

@Component({
  selector: 'jhi-dial-update',
  templateUrl: './dial-update.component.html',
})
export class DialUpdateComponent implements OnInit {
  isSaving = false;

  bucketsCollection: IBucket[] = [];
  customersSharedCollection: ICustomer[] = [];

  editForm = this.fb.group({
    id: [],
    dial: [null, [Validators.required]],
    activeAlertId: [],
    dialConsumption: [],
    bucketdate: [],
    contractStatus: [],
    contractDate: [],
    simNum: [],
    volStatusFlag: [],
    apnName: [],
    softDisconnect: [],
    billCycle: [],
    m2mMonitoringService: [],
    bucket: [],
    customer: [],
  });

  constructor(
    protected dialService: DialService,
    protected bucketService: BucketService,
    protected customerService: CustomerService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ dial }) => {
      this.updateForm(dial);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const dial = this.createFromForm();
    if (dial.id !== undefined) {
      this.subscribeToSaveResponse(this.dialService.update(dial));
    } else {
      this.subscribeToSaveResponse(this.dialService.create(dial));
    }
  }

  trackBucketById(_index: number, item: IBucket): number {
    return item.id!;
  }

  trackCustomerById(_index: number, item: ICustomer): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDial>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(dial: IDial): void {
    this.editForm.patchValue({
      id: dial.id,
      dial: dial.dial,
      activeAlertId: dial.activeAlertId,
      dialConsumption: dial.dialConsumption,
      bucketdate: dial.bucketdate,
      contractStatus: dial.contractStatus,
      contractDate: dial.contractDate,
      simNum: dial.simNum,
      volStatusFlag: dial.volStatusFlag,
      apnName: dial.apnName,
      softDisconnect: dial.softDisconnect,
      billCycle: dial.billCycle,
      m2mMonitoringService: dial.m2mMonitoringService,
      bucket: dial.bucket,
      customer: dial.customer,
    });

    this.bucketsCollection = this.bucketService.addBucketToCollectionIfMissing(this.bucketsCollection, dial.bucket);
    this.customersSharedCollection = this.customerService.addCustomerToCollectionIfMissing(this.customersSharedCollection, dial.customer);
  }

  protected loadRelationshipsOptions(): void {
    this.bucketService
      .query({ filter: 'dial-is-null' })
      .pipe(map((res: HttpResponse<IBucket[]>) => res.body ?? []))
      .pipe(map((buckets: IBucket[]) => this.bucketService.addBucketToCollectionIfMissing(buckets, this.editForm.get('bucket')!.value)))
      .subscribe((buckets: IBucket[]) => (this.bucketsCollection = buckets));

    this.customerService
      .query()
      .pipe(map((res: HttpResponse<ICustomer[]>) => res.body ?? []))
      .pipe(
        map((customers: ICustomer[]) =>
          this.customerService.addCustomerToCollectionIfMissing(customers, this.editForm.get('customer')!.value)
        )
      )
      .subscribe((customers: ICustomer[]) => (this.customersSharedCollection = customers));
  }

  protected createFromForm(): IDial {
    return {
      ...new Dial(),
      id: this.editForm.get(['id'])!.value,
      dial: this.editForm.get(['dial'])!.value,
      activeAlertId: this.editForm.get(['activeAlertId'])!.value,
      dialConsumption: this.editForm.get(['dialConsumption'])!.value,
      bucketdate: this.editForm.get(['bucketdate'])!.value,
      contractStatus: this.editForm.get(['contractStatus'])!.value,
      contractDate: this.editForm.get(['contractDate'])!.value,
      simNum: this.editForm.get(['simNum'])!.value,
      volStatusFlag: this.editForm.get(['volStatusFlag'])!.value,
      apnName: this.editForm.get(['apnName'])!.value,
      softDisconnect: this.editForm.get(['softDisconnect'])!.value,
      billCycle: this.editForm.get(['billCycle'])!.value,
      m2mMonitoringService: this.editForm.get(['m2mMonitoringService'])!.value,
      bucket: this.editForm.get(['bucket'])!.value,
      customer: this.editForm.get(['customer'])!.value,
    };
  }
}
