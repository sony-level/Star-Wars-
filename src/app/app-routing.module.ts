import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FilmsComponent } from './films/films.component';
import { PeopleComponent } from './people/people.component';
import { PlanetsComponent } from './planets/planets.component';
import { AboutComponent } from './about/about.component';
import { SpeciesComponent } from './species/species.component';
import { StarshipsComponent } from './starships/starships.component';
import { VehiclesComponent } from './vehicles/vehicles.component';




const routes: Routes = [
  { path: 'Home', component: HomeComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'people', component: PeopleComponent},
  { path: 'planets', component: PlanetsComponent},
  { path: 'starships', component: StarshipsComponent},
  { path: 'vehicles', component: VehiclesComponent},
  { path: 'species', component: SpeciesComponent},
  { path: 'about', component: AboutComponent},
  { path: '', redirectTo: '/Home', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {


 }
