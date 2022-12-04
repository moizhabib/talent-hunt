const display = document.querySelector('.ifLogged');
const notLogged = document.querySelector('.notLogged');
const displayName = document.querySelector('.userName');

const authToken = localStorage.getItem('qtoken');
const data = JSON.parse(authToken);

let resExists = false;

if(authToken && data){
    display.classList.remove('ifLogged');
    db.collection('Users').doc(data.uid).get().then((snapshot)=>{
        const user = snapshot.data();
        return  user;
    }).then((user)=>{
        displayName.innerHTML=user.userName;
        quizApp.user = user;
    })
}
else{
    display.classList.add('ifLogged')
    notLogged.innerHTML=`
        <div class="text-center my-3">
            <h1 class="text-danger">Please login, inorder to take quiz!</h1>
        </div>
    `;
}


