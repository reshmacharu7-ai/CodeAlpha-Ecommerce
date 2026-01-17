const loginBtn = document.getElementById('loginBtn');

loginBtn.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      alert('Logged in as: ' + result.user.displayName);
      window.location.href = "index.html"; // redirect to home page
    })
    .catch((error) => {
      console.error(error);
    });
});
