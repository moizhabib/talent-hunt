// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAUmPC6iUlWySgRIEfAZdsWRsHs89y9q-A",
    authDomain: "quizproject-1f5a7.firebaseapp.com",
    projectId: "quizproject-1f5a7",
    storageBucket: "quizproject-1f5a7.appspot.com",
    messagingSenderId: "485580459164",
    appId: "1:485580459164:web:38e407e1ab43b287a5b159"
};
    // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const token = localStorage.getItem('qtoken');
const tokenData = JSON.parse(token);

if(tokenData){
    document.querySelector('.Logout').classList.remove('Logout')
}

firebaseLogout =()=>{
    localStorage.removeItem('qtoken');
    firebase.auth().signOut().then(() => {
      alert('You are now Logged out!')
      window.location.href= 'index.html';
    }).catch((error) => {
        alert(error)
    });
}
    