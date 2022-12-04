const firebaseAuthSignIn = ( ) => {
    const email = document.querySelector('#signinEmail');
    const password = document.querySelector('#signinPass');
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        var user = userCredential.user;
        const uid = user.uid;
        const userEmail = user.email;
        const token = user.refreshToken
        localStorage.setItem('qtoken', JSON.stringify({ uid, token }))
        email.value='';
        password.value='';
        setTimeout(function(){
            window.location.replace("index.html");
        }, 1000)

    })
    .catch((error) => {
        alert(error)
    });
}

const firebaseAuthSignUp = () => {
    const email = document.querySelector('#email');
    const password = document.querySelector('#pass');
    const userName = document.querySelector('#user');
    const rollNumber = document.querySelector('#rollno');
    console.log(userName.value,rollNumber.value,email.value, password.value);
    firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then(() => {
        firebase.firestore().collection('Users').doc(firebase.auth().currentUser.uid)
        .set({
            userName: userName.value,
            rollNumber: rollNumber.value,
            email: email.value
        }).then(()=>{
            alert('You are now registered!')
            setTimeout(function(){
                window.location.replace("index.html");
            }, 1000)
        })
        .catch(error => {
            console.log('Something went wrong with added user to firestore: ', error);
        })
    })
}
