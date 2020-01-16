import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cliente } from './pages/cadastro/cliente/cliente.component';

const routes: Routes = [
  {path:'cliente',component:Cliente},
  { path: '', redirectTo: '/cliente', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
