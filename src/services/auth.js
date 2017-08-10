import auth0 from 'auth0-js';

export default class Auth {

  constructor() {

    this.auth0 = new auth0.WebAuth({
      domain: 'swapio.auth0.com',
      clientID: 'ZYhR5yxNmx0Oywmv170VZiyMK0mXXgC4',
      redirectUri: 'http://localhost:3001/callback',
      audience: 'http://swap.io/api/',
      responseType: 'token id_token'
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  logout(history) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username')

    history.replace('/home');
  }

  handleAuth() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve()
        } else {
          reject(err)
        }
      })
    })
  }

  isAuthenticated() {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt && localStorage.getItem('username');
  }

  setSession(authResult, history) {
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }

}
