import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {environment} from '../../environments/environment'
import {AuthResponseData} from '../models/AuthResponseData.model'
import {Observable} from 'rxjs'
import {User} from '../models/user.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    )
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    )
    return new User(data.email, data.localId, data.idToken, expirationDate)
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email not found'
      case 'INVALID_PASSWORD':
        return 'Invalid password'
      default:
        return 'Unknown error occurred. Please try again'
    }
  }
}
