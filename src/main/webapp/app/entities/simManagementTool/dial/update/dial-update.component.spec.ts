import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DialService } from '../service/dial.service';
import { IDial, Dial } from '../dial.model';
import { IBucket } from 'app/entities/simManagementTool/bucket/bucket.model';
import { BucketService } from 'app/entities/simManagementTool/bucket/service/bucket.service';
import { ICustomer } from 'app/entities/simManagementTool/customer/customer.model';
import { CustomerService } from 'app/entities/simManagementTool/customer/service/customer.service';

import { DialUpdateComponent } from './dial-update.component';

describe('Dial Management Update Component', () => {
  let comp: DialUpdateComponent;
  let fixture: ComponentFixture<DialUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let dialService: DialService;
  let bucketService: BucketService;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DialUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(DialUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DialUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    dialService = TestBed.inject(DialService);
    bucketService = TestBed.inject(BucketService);
    customerService = TestBed.inject(CustomerService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call bucket query and add missing value', () => {
      const dial: IDial = { id: 456 };
      const bucket: IBucket = { id: 63365 };
      dial.bucket = bucket;

      const bucketCollection: IBucket[] = [{ id: 55761 }];
      jest.spyOn(bucketService, 'query').mockReturnValue(of(new HttpResponse({ body: bucketCollection })));
      const expectedCollection: IBucket[] = [bucket, ...bucketCollection];
      jest.spyOn(bucketService, 'addBucketToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      expect(bucketService.query).toHaveBeenCalled();
      expect(bucketService.addBucketToCollectionIfMissing).toHaveBeenCalledWith(bucketCollection, bucket);
      expect(comp.bucketsCollection).toEqual(expectedCollection);
    });

    it('Should call Customer query and add missing value', () => {
      const dial: IDial = { id: 456 };
      const customer: ICustomer = { id: 58608 };
      dial.customer = customer;

      const customerCollection: ICustomer[] = [{ id: 26001 }];
      jest.spyOn(customerService, 'query').mockReturnValue(of(new HttpResponse({ body: customerCollection })));
      const additionalCustomers = [customer];
      const expectedCollection: ICustomer[] = [...additionalCustomers, ...customerCollection];
      jest.spyOn(customerService, 'addCustomerToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      expect(customerService.query).toHaveBeenCalled();
      expect(customerService.addCustomerToCollectionIfMissing).toHaveBeenCalledWith(customerCollection, ...additionalCustomers);
      expect(comp.customersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const dial: IDial = { id: 456 };
      const bucket: IBucket = { id: 14671 };
      dial.bucket = bucket;
      const customer: ICustomer = { id: 89018 };
      dial.customer = customer;

      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(dial));
      expect(comp.bucketsCollection).toContain(bucket);
      expect(comp.customersSharedCollection).toContain(customer);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dial>>();
      const dial = { id: 123 };
      jest.spyOn(dialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dial }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(dialService.update).toHaveBeenCalledWith(dial);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dial>>();
      const dial = new Dial();
      jest.spyOn(dialService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: dial }));
      saveSubject.complete();

      // THEN
      expect(dialService.create).toHaveBeenCalledWith(dial);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Dial>>();
      const dial = { id: 123 };
      jest.spyOn(dialService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ dial });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(dialService.update).toHaveBeenCalledWith(dial);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackBucketById', () => {
      it('Should return tracked Bucket primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackBucketById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackCustomerById', () => {
      it('Should return tracked Customer primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackCustomerById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
