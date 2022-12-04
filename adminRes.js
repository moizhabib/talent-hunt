let employee=[];
let results = [];
const db = firebase.firestore();
const tableBody = document.querySelector('tbody');


db.collection('Results').onSnapshot((snapshot)=>{
    results=[]
    resetTable();
    snapshot.docs.forEach((el)=>{
        const data = el.data();
        results.push(data)
    })
    if(results && results.length!=0){
        results.map((el,index)=>{
            display(el,index)
        })
    }
},(err=>{
    console.error(err)
}))

const resetTable=()=>{
    tableBody.innerHTML=''
}

const display = (obj, index) =>{
    if(obj){
        const innerRow=document.createElement('tr');
        innerRow.innerHTML=
         `
                <td scope="row">${index+1}</td>
                <td>${obj.userName}</td>
                <td>${obj.rollNumber}</td>
                <td>${obj.email}</td>
                <td>${obj.points}</td>
                <td>${obj.Total}</td>
                <td>${obj.result}</td>
            `;
        tableBody.appendChild(innerRow)
    }else{
        console.log('No elements in array!')
    }
}
