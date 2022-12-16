import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountListComponent} from './component/account-list/account-list.component';
import {AccountEditComponent} from './component/account-edit/account-edit.component';
import {AccountModuleComponent} from './account-module.component';
import {AccountRegisterComponent} from './account-register/account-register.component';
import {ChangePasswordComponent} from './component/change-password/change-password.component';
import {ChangeInfoComponent} from './component/change-info/change-info.component';
import {ViewHistoryPointComponent} from './component/view-history-point/view-history-point.component';
import {EmployeeListComponent} from './employee/employee-list/employee-list.component';

const routes: Routes = [
  {
    path: 'account', component: AccountModuleComponent, children: [
      {
        path: 'list', component: AccountListComponent
      },
      {
        path: 'edit/:id', component: AccountEditComponent
      },
      {
        path: 'register', component: AccountRegisterComponent,
      },
      {
        path: 'changePassword', component: ChangePasswordComponent
      },
      {
        path: 'changeInfo', component: ChangeInfoComponent
      },
      {
        path: 'view-history-point', component: ViewHistoryPointComponent
      },
      {
        path : 'employee', component: EmployeeListComponent
      }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AccountModuleRoutingModule {
}
