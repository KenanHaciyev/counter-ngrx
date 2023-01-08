import {Injectable} from '@angular/core'
import {Actions, createEffect, ofType} from '@ngrx/effects'
import {AuthService} from '../../services/auth.service'
import {loginStart, loginSuccess} from './auth.actions'
import {catchError, exhaustMap, map, of, tap} from 'rxjs'
import {AuthResponseData} from '../../models/AuthResponseData.model'
import {Store} from '@ngrx/store'
import {AppState} from '../../store/app.state'
import {
  setErrorMessage,
  setLoadingSpinner
} from '../../store/shared/shared.actions'
import {Router} from '@angular/router'

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action: any) => {
        return this.authServ.login(action.email, action.password).pipe(
          map((data: AuthResponseData) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            this.store.dispatch(setErrorMessage({message: ''}))
            const user = this.authServ.formatUser(data)
            return loginSuccess({user})
          }),
          catchError((errResp: any) => {
            this.store.dispatch(setLoadingSpinner({status: false}))
            const errorMessage = this.authServ.getErrorMessage(
              errResp.error.error.message
            )
            return of(setErrorMessage({message: errorMessage}))
          })
        )
      })
    )
  })

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loginSuccess),
        tap((action: any) => {
          return this.router.navigate(['/'])
        })
      )
    },
    {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private authServ: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
