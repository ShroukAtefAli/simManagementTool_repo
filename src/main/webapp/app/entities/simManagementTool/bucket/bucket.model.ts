import { IDial } from 'app/entities/simManagementTool/dial/dial.model';
import { ICustomer } from 'app/entities/simManagementTool/customer/customer.model';

export interface IBucket {
  id?: number;
  bucketName?: string;
  bucketCapacity?: number;
  bucketType?: string;
  bucketDescription?: string | null;
  ratePlan?: string | null;
  dial?: IDial | null;
  customer?: ICustomer | null;
}

export class Bucket implements IBucket {
  constructor(
    public id?: number,
    public bucketName?: string,
    public bucketCapacity?: number,
    public bucketType?: string,
    public bucketDescription?: string | null,
    public ratePlan?: string | null,
    public dial?: IDial | null,
    public customer?: ICustomer | null
  ) {}
}

export function getBucketIdentifier(bucket: IBucket): number | undefined {
  return bucket.id;
}
