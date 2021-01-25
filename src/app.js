import './styles.css';
import { isValid } from './utils';
import { Post } from './sendPost';

// get elements
const form = document.getElementById('form');
const textarea = form.querySelector('#post-input');
const btn = form.querySelector('#submit');
const authBtn = document.getElementById('auth-btn');
// listeners
window.addEventListener('load', Post.renderListOfPosts);
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
function openAuthModal() {
    
}