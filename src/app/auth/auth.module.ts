import {NgModule} from '@angular/core'
import {LoginComponent} from './login/login.component'
import {RouterModule, Routes} from '@angular/router'
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from '@angular/forms'
import {EffectsModule} from '@ngrx/effects'
import {AuthEffects} from './state/auth.effects'

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
]

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes)
  ]
})
export class AuthModule {}
