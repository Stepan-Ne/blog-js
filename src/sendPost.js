import {openAuthModal} from './app'

export class Post {

  static sendPost(post) {

    const token = getTokenFromLocaleStorage()
    if (!token.length) {
        openAuthModal()
        return new Promise(resolve => resolve());
    }

    return fetch(`https://sn-blog-js-default-rtdb.europe-west1.firebasedatabase.app/posts.json?auth=${token}`, {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        post.id = data.name;
        return post;
      })
      .then(addToLocaleStorage)
      .then(Post.renderListOfPosts);
  }

  static renderListOfPosts() {
      
    let posts = getPostsFromLocaleStorage();
    // if (!posts.length) {
    //   fetch('https://sn-blog-js-default-rtdb.europe-west1.firebasedatabase.app/posts.json')
    //     .then((res) => res.json())
    //     .then((data) => {
    //       const keys = Object.keys(data);
    //       posts = keys.map((k) => data[k]);

    //       // render list of posts
    //       const html = posts.map((p) => toCard(p));
    //       const list = document.getElementById('list');
    //       list.innerHTML = html;
    //     });
    // }
    // render list of posts
  
    const html = posts.map((p) => toCard(p));
    const list = document.getElementById('list');
    list.innerHTML = html;
  }

  static fetch() {

    return fetch(
      `https://sn-blog-js-default-rtdb.europe-west1.firebasedatabase.app/posts.json`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data) {
          return 
        }
        
        const keys = Object.keys(data);
        const posts = keys.map((k) => data[k]);
       
        let p = localStorage.getItem('posts') || '[]'
        let pp = JSON.parse(p)
        pp = [...posts]
        localStorage.setItem('posts', JSON.stringify(pp));
        
      })
      .then(Post.renderListOfPosts);
  }
}

function addToLocaleStorage(post) {
    let p = localStorage.getItem('posts') || '[]'
    let pp = JSON.parse(p)
    pp.push(post)
  //const all = getPostsFromLocaleStorage();
  //console.log('addToLocaleStorage', all)
 // all.push(post);
  localStorage.setItem('posts', JSON.stringify(pp));
}

function getTokenFromLocaleStorage() {
  return JSON.parse(localStorage.getItem('token') || '[]');
}
function getPostsFromLocaleStorage() {
    return JSON.parse(localStorage.getItem('posts') || '[]');
  }
function toCard(post) {
  return `
    <div>
        <div>
        <b>
        ${new Date(post.date).toLocaleDateString()}
        ${new Date(post.date).toLocaleTimeString()}
        </b>
        </div>
        <div>
        ${post.text}
        </div>
    </div>
    `
}
