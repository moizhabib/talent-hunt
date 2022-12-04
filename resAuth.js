const authToken = localStorage.getItem('qtoken');
const data = JSON.parse(authToken);
const display = document.querySelector('.display');
const notLogged = document.querySelector('.notLogged')
const db = firebase.firestore()

const displayResult=(res)=>{
    document.querySelector('.resName').textContent = res.userName;
    document.querySelector('.resCorrect').textContent = res.points
    
    document.querySelector('.resRoll').textContent = res.rollNumber
    
    document.querySelector('.resQuestions').textContent = res.Total
    document.querySelector('.resScore').textContent = res.result
}

if(authToken && data){
    db.collection('Users').doc(data.uid).get().then((snapshot)=>{
        
        const user = snapshot.data();
        let rollNumber = user.rollNumber;
        return  rollNumber;
    }).then((rno)=>{
        var docRef = db.collection('Results').doc(rno);

        docRef.get().then((doc) => {
            if (doc.exists) {
                const resData = doc.data();
                displayResult(resData)
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    })
}
else{
    display.classList.add('ifLogged')
    notLogged.innerHTML=`
        <div class="text-center my-3">
            <h1 class="text-danger">Please login, to View Result!</h1>
        </div>
    `;
}

