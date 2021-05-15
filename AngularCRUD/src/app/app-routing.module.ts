import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicineComponent } from './medicine/medicine.component';
import { Routes } from '@angular/router';
import { AddAditComponent } from './medicine/adedit/add-adit/add-adit.component';

const routes:Routes=[

   {path:'test',component:AddAditComponent},
{ path: 'add', component: MedicineComponent },
{ path: 'edit/:id', component: MedicineComponent },
{
  path:"**",
  component:MedicineComponent
}
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
