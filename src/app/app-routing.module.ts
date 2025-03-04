import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

// Disable lazy loading
import { HomePageModule } from './pages/home/home.module';

export function loadHomePageModule() {
  return HomePageModule;
}

import { TaskPageModule } from './pages/task/task.module';

export function loadTaskModule() {
  return TaskPageModule;
}

import { NewItemPageModule } from './pages/new-item/new-item.module';

export function loadNewItemPageModule() {
  return NewItemPageModule;
}

import { UpdateItemPageModule } from './pages/update-item/update-item.module';

export function loadUpdateItemPageModule() {
  return UpdateItemPageModule;
}

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: loadHomePageModule },
  { path: 'tasks', loadChildren: loadTaskModule },
  { path: 'new-item', loadChildren: loadNewItemPageModule },
  { path: 'update-item', loadChildren: loadUpdateItemPageModule },
  { path: 'about', loadChildren: './pages/about/docs.module#DocsPageModule' },
  { path: 'profile', loadChildren: './pages/profile/profile.module#ProfilePageModule' },
  { path: 'devicetrust', loadChildren: './pages/devicetrust/devicetrust.module#DeviceTrustPageModule' },
  { path: 'apptrust', loadChildren: './pages/apptrust/apptrust.module#AppTrustPageModule'},
  { path: 'files', loadChildren: './pages/files/files.module#FilesPageModule' },
  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },
  { path: 'offline-queue', loadChildren: './pages/offline-queue/offline-queue.module#OfflineQueuePageModule' },
];
@NgModule({
  imports: [
    HomePageModule,
    NewItemPageModule,
    UpdateItemPageModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
