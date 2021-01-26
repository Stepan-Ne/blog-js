import './styles.css';
import { isValid, createModalAuth } from './utils';
import { Post } from './sendPost';
import { getAuthForm, authWithEmailPassword } from './auth'

// get elements
const form = document.getElementById('form');
const textarea = form.querySelector('#post-input');
const btn = form.querySelector('#submit');
const authBtn = document.getElementById('auth-btn');
// listeners
window.addEventListener('load', Post.fetch);
textarea.addEventListener('input', () => {
  btn.disabled = !isValid(textarea.value);
});
form.addEventListener('submit', submitFormHandler);
authBtn.addEventListener('click', openAuthModal)


// handlers
function submitFormHandler(event) {
  event.preventDefault();
  if (isValid(textarea.value)) {
    const post = {
      text: textarea.value.trim(),
      date: new Date().toJSON(),
    };
    btn.disabled = true;
    // async request to server to save post
    Post.sendPost(post).then(() => {
      textarea.value = '';
      textarea.className = '';
      //btn.disabled = false
    });
  }
}
export function openAuthModal() {
    // create form
    createModalAuth('Sign in', getAuthForm())
    // submit form
    
    const formAuth = document.getElementById('auth-form')
    formAuth.addEventListener('submit', authFormHandler, {once: true})
}


// Authorisation
function authFormHandler(event) {
event.preventDefault()
// get email & password
const email = event.target.querySelector('#email').value
const password = event.target.querySelector('#password').value

authWithEmailPassword(email, password)
// get list of posts
.then(token => {
    localStorage.setItem('token', JSON.stringify(token));

    const formAuth = document.getElementById('mui-overlay')
    formAuth.remove()
})

}