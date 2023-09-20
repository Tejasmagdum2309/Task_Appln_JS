
// Backup Storage (Local- Storage)
let state = {
    tasklist : [],
};

let card = document.querySelector(".task__card");



// Template for the card on screen
const htmltaskcard = ({id,imgurl,title,price,desc})=> `
<div class="col-md-3 col-sm-6 id=${id}>
<div class="card text-dark bg-light border-light h-100">
  <div class="card-header d-flex justify-content-end gap-2">
     <button class="btn btn-outline-primary"><i class="fa-regular fa-pen-to-square"></i></button>
     <button class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div class="card-body">
    ${     
         (imgurl) ?
           `<img src=${imgurl} class="card-img-top" alt="...">`
           :`<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" class="card-img-top" alt="...">`
}
     <h5 class="card-title">${title}</h5>
     <h5 class="card-text text-muted">${price}$</h5>
     <p class="card-text " >${desc}</p>

  </div>

  <div class="card-footer">
          <button class="btn btn-primary">Open It</button>
  </div>
</div>
</div>   
`;

function updateStorage(){
       localStorage.setItem(
        "listTask",
        JSON.stringify({
            "tasks" : state.tasklist,
        })
       )
}

const LoadData = ()=>{
    const localstore = JSON.parse(localStorage.listTask);
     if(localstore) state.tasklist = localstore.tasks;

     state.tasklist.map((each)=>{
        card.insertAdjacentHTML("afterbegin",htmltaskcard(each));
     })
}

const addItem = ()=>{
    let id = Date.now();
    let imgurl = document.querySelector(".modal_img").value;
    let title = document.querySelector(".modal_title").value;
    let price = document.querySelector(".modal_price").value;
    let desc = document.querySelector(".modal_desc").value;

    // console.log(imgurl.value + " " + title.value + " " +price.value + " " +desc.value );

    state.tasklist.push({id,imgurl,title,price,desc});
    
    updateStorage();
    card.innerHTML = " ";
    LoadData();

    document.querySelector(".modal_img").value = " ";
    document.querySelector(".modal_title").value =" ";
    document.querySelector(".modal_price").value = " ";
    document.querySelector(".modal_desc").value = " ";
    state.tasklist.pop();

}

const del = ()=>{
    
}