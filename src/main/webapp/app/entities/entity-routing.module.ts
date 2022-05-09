import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'customer',
        data: { pageTitle: 'simManagementToolApp.simManagementToolCustomer.home.title' },
        loadChildren: () => import('./simManagementTool/customer/customer.module').then(m => m.SimManagementToolCustomerModule),
      },
      {
        path: 'dial',
        data: { pageTitle: 'simManagementToolApp.simManagementToolDial.home.title' },
        loadChildren: () => import('./simManagementTool/dial/dial.module').then(m => m.SimManagementToolDialModule),
      },
      {
        path: 'bucket',
        data: { pageTitle: 'simManagementToolApp.simManagementToolBucket.home.title' },
        loadChildren: () => import('./simManagementTool/bucket/bucket.module').then(m => m.SimManagementToolBucketModule),
      },
      {
        path: 'alert',
        data: { pageTitle: 'simManagementToolApp.simManagementToolAlert.home.title' },
        loadChildren: () => import('./simManagementTool/alert/alert.module').then(m => m.SimManagementToolAlertModule),
      },
      {
        path: 'active-alert',
        data: { pageTitle: 'simManagementToolApp.simManagementToolActiveAlert.home.title' },
        loadChildren: () => import('./simManagementTool/active-alert/active-alert.module').then(m => m.SimManagementToolActiveAlertModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
