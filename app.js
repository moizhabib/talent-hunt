let employee=[];
let questions = [];
const db = firebase.firestore();
const btn = document.getElementById('btn');
const openModal = document.querySelector('.pop-Wrapper');
const popup = document.querySelector('.popup');
const empForm = document.querySelector('.employeeForm');
const tableBody = document.querySelector('tbody');
// const icon = document.querySelector('.icon');
btn.addEventListener('click',()=>{
    openModal.classList.toggle('Hide')
});
popup.addEventListener('click',(event)=>{
    event.stopPropagation()
});
openModal.addEventListener('click',(e)=>{
    e.stopPropagation();
    openModal.classList.add('Hide');
});


db.collection('Questions').onSnapshot((snapshot)=>{
    questions=[]
    resetTable();
    snapshot.docs.forEach((el,index)=>{
        const data = el.data();
        console.log(data)
        questions.push(data)
    })
    if(questions && questions.length!=0){
        questions.map((el,index)=>{
            display(el,index)
        })
    }
},(err=>{
    console.error(err)
}))

const resetTable=()=>{
    console.log(questions,'questions size')
    tableBody.innerHTML=''
}

const display = (obj, index) =>{
    if(obj){
        const innerRow=document.createElement('tr');
        innerRow.innerHTML=
         `
                <td class="tdHidden" rules=none><i class="fas fa-times-circle icon"></i></td>
                <td scope="row">${index+1}</td>
                <td>${obj.question}</td>
                <td>${obj.correct}</td>
                <td>${obj.options[0]}</td>
                <td>${obj.options[1]}</td>
                <td>${obj.options[2]}</td>
            `;
        const icon = innerRow.querySelector('.icon');
        icon.addEventListener('click',()=>{
            const id = obj.id;
            db.collection('Questions').doc(id).delete().then(() => {
                console.log("Document successfully deleted!");
                innerRow.remove()
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
            //delete the question from database
            
        })
        tableBody.appendChild(innerRow)
    }else{
        console.log('No elements in array!')
    }
}
