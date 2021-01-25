export class Post {
  static sendPost(post) {
    return fetch('https://sn-blog-js-default-rtdb.europe-west1.firebasedatabase.app/posts.json', {
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
    const posts = getPostsFromLocaleStorage();
    // make string which we add to div ih our index.html
    const html = posts.map((p) => toCard(p));
    const list = document.getElementById('list');
    list.innerHTML = html;
  }
}

function addToLocaleStorage(post) {
  const all = getPostsFromLocaleStorage();
  all.push(post);
  localStorage.setItem('posts', JSON.stringify(all));
}

function getPostsFromLocaleStorage() {
  return JSON.parse(localStorage.getItem('posts') || '[]');
}
function toCard(post) {
  return `
    <div class="mui-container-fluid">
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
    `;
}
