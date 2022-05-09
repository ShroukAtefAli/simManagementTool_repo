import dayjs from 'dayjs/esm';
import { IBucket } from 'app/entities/simManagementTool/bucket/bucket.model';
import { IActiveAlert } from 'app/entities/simManagementTool/active-alert/active-alert.model';
import { ICustomer } from 'app/entities/simManagementTool/customer/customer.model';

export interface IDial {
  id?: number;
  dial?: string;
  activeAlertId?: number | null;
  dialConsumption?: number | null;
  bucketdate?: dayjs.Dayjs | null;
  contractStatus?: string | null;
  contractDate?: dayjs.Dayjs | null;
  simNum?: string | null;
  volStatusFlag?: string | null;
  apnName?: string | null;
  softDisconnect?: string | null;
  billCycle?: number | null;
  m2mMonitoringService?: string | null;
  bucket?: IBucket | null;
  activeAlerts?: IActiveAlert[] | null;
  customer?: ICustomer | null;
}

export class Dial implements IDial {
  constructor(
    public id?: number,
    public dial?: string,
    public activeAlertId?: number | null,
    public dialConsumption?: number | null,
    public bucketdate?: dayjs.Dayjs | null,
    public contractStatus?: string | null,
    public contractDate?: dayjs.Dayjs | null,
    public simNum?: string | null,
    public volStatusFlag?: string | null,
    public apnName?: string | null,
    public softDisconnect?: string | null,
    public billCycle?: number | null,
    public m2mMonitoringService?: string | null,
    public bucket?: IBucket | null,
    public activeAlerts?: IActiveAlert[] | null,
    public customer?: ICustomer | null
  ) {}
}

export function getDialIdentifier(dial: IDial): number | undefined {
  return dial.id;
}
