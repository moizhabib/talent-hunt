const formContainer = document.querySelector('.formContainer');
const db = firebase.firestore();
const dbAuth= firebase.auth();
const quizApp = {
    score:0,
    questions:[],
    user:{},
    userCountScore:0,
    resUser:{}
}

quizApp.resetQuestions=()=>{
    formContainer.innerHTML=''
}


quizApp.firebaseInit = ()=>{
    db.collection('Questions').onSnapshot((snapshot)=>{
        quizApp.questions=[];
        quizApp.resetQuestions();
        snapshot.docs.forEach((el,index)=>{
            const data = el.data();
            const id = `q${index+1}`;
            const question = data.question;
            let options=[...data.options, data.correct]
            options = options.sort(() => Math.random() - 0.5);
            quizApp.questions.push({question:question, options:options,id})
        })
        quizApp.loadQuestions();
    },(err=>{
        console.error(err)
    }))
}

quizApp.firebaseStoreResult = (score) => {
    db.collection('Results').doc(quizApp.user.rollNumber).set({
        userName: quizApp.user.userName,
        rollNumber: quizApp.user.rollNumber,
        email: quizApp.user.email,
        result:score,
        points: quizApp.userCountScore,
        Total: quizApp.questions.length
    }).then(()=>{
        alert('Your form is submitted successfully!');
        setTimeout(()=>{
            window.location.replace("result.html");
        },1000)
        
    })

}
quizApp.loadQuestions =()=>{
    console.log('questions Loaded',quizApp.questions)
    quizApp.questions.map((q, index )=>{
        let question = q.question;
        let options = [...q.options];
        let list = options
        list = list.sort(() => Math.random() - 0.5);
        let Child = document.createElement('div');
        Child.classList.add('my-5');
        Child.innerHTML =`<div>
                <p class="lead font-weight-normal">${index+1}) ${question}</p>
        `;
        let OptionsChild = document.createElement('div');
        OptionsChild.classList.add('Options');
        Child.appendChild(OptionsChild);
        let classOptions = Child.querySelector('.Options');
        options.forEach((option)=>{
            classOptions.innerHTML+=`
                <div class="form-check my-2 text-white-50">
                    <input class="form-check-input" type="radio" name=${q.id} value=${option}>
                        <label class="form-check-label" for=${option}> &nbsp;${option}</label>
                </div>
            `
        })
        formContainer.appendChild(Child);
    })
}

async function getCorrect(){
    let arr=[];
    var questionsRef = db.collection('Questions');
    try {
        var snapshot = await questionsRef.get();
        snapshot.docs.forEach((el,index)=>{
            const data = el.data();
            arr.push(data.correct)
        })
    }
    catch (err) {
        console.log('Error getting documents', err);
    }  
    return arr;
}

const form = document.querySelector('form');
form.addEventListener('submit',async (e)=>{
    e.preventDefault();
    quizApp.score=0;
    let answers=[];
    quizApp.questions.forEach(q=>{
        answers.push(form[q.id].value)
    })

    const correctAnswers = await getCorrect();

    answers.forEach((answer,index) => {
    if(answer===correctAnswers[index]){
        quizApp.score+=100/answers.length;
        quizApp.userCountScore+=1;
    }else{
        console.log('not correct')
    }
    });
        quizApp.firebaseStoreResult(quizApp.score.toFixed(2));
})


quizApp.firebaseInit()