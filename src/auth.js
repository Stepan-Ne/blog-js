export function getAuthForm() {
    return `
    <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input type="email" id="email" required></input>
              <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
              <input type="password" id="password" required></input>
              <label for="password">Password</label>
            </div>
            <button type="submit" class="mui-btn mui-btn--raised btn-submit">
              Sign in
            </button>
          </form>
    `
}

export const authWithEmailPassword = (email, password) => {

    const apiKey = 'AIzaSyBnfP5FmbBjzm4GKEpmDwNdzTbR4I8TuXk'
return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({email, password, returnSecureToken: true}),
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(response => response.json())
.then(data => data.idToken )
}