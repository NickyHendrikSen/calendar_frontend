import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () =>
      import('./app.module').then((m) => m.AppModule),
  },
  {
    path: 'calendar',
    loadChildren: () =>
      import('./modules/calendar/calendar.module').then((m) => m.CalendarModule),
  },
  { path: 'about', loadChildren: () => import('./modules/about/about.module').then(m => m.AboutModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
