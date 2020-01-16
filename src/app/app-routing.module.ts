import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Cliente } from './pages/cadastro/cliente/cliente.component';
import { PageMenu } from './pages/Menu/menu-component';
import { PageHome } from './pages/home/home-component';

const routes: Routes = [
  {
    path: 'menu_tokio', component: PageMenu, children: [
      { path: 'home', component: PageHome },
      { path: 'cliente', component: Cliente }
    ]
  },
  { path: '', redirectTo: '/menu_tokio/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
