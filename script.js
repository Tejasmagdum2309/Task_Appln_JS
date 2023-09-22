
// Backup Storage (Local- Storage)
let state = {
    tasklist : [],
};

let card = document.querySelector(".task__card");
let modal =  document.querySelector(".taskmodal");



// Template for the card on screen
const htmltaskcard = ({id,imgurl,title,price,desc})=> `
<div class="col-md-3 col-sm-6" id=${id}  >
<div class="card text-dark bg-light border-light h-100">
  <div class="card-header d-flex justify-content-end gap-2">
     <button class="btn btn-outline-primary" id=${id} onclick="updateCard(this)"><i class="fa-regular fa-pen-to-square"></i></button>
     <button class="btn btn-outline-danger" id=${id}  onclick="del(this)"><i class="fa-solid fa-trash"></i></button>
  </div>
  <div class="card-body">
    ${     
         (imgurl) ?
           `<img src=${imgurl} class="card-img-top" alt="...">`
           :`<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" class="card-img-top" alt="...">`
}
     <h5 class="card-title">${title}</h5>
     <div class="d-flex align-item-center" ><h5 class="card-text text-muted">${price}</h5></div>
     <p class="description  text-sm"  >${desc}</p>

  </div>

  <div class="card-footer">
          <button class="btn btn-primary " id=${id}   data-bs-toggle="modal" data-bs-target="#taskModal" onclick="modalop(this)"   >Open It</button>
  </div>
</div>
</div>   
`;

const htmltaskmodal = ({id,imgurl,title,price,desc})=>
      `
      <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">${title}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body" class="taskModal">
              <div>

              ${     
                (imgurl) ?
                  `<img src=${imgurl} class="card-img-top" alt="...">`
                  :`<img src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" class="card-img-top" alt="...">`
              }</div>

              <div>
              <p class="text-muted text-sm">Created on : ${Date(id).toString()}</p>

              <div class="d-flex"><p>Price : ${price}</p></div>

              <p class="text-muted">${desc}</p>
              </div>

            </div>
            <div class="modal-footer">
              
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
    // state.tasklist.pop();

}


const del = (e)=>{
      let n =state.tasklist.find(each => each.id == e.id);
      
      // console.log(state.tasklist);

      let n1 = state.tasklist.filter((each)=> each != n);
      state.tasklist = n1;
      // console.log(state.tasklist);
      updateStorage();
      card.innerHTML = " ";
      LoadData();
}


// to open a modal 
const modalop = (e)=>{
     let n = state.tasklist.find(each => each.id == e.id);
     modal.innerHTML = htmltaskmodal(n);
}


// update card

const updateCard = (e)=>{
    let parent = e.parentNode.parentNode.parentNode;
    // console.log(parent.id);
    let title = parent.childNodes[1].childNodes[3].childNodes[3];
    let price = parent.childNodes[1].childNodes[3].childNodes[5];
    let desc = parent.childNodes[1].childNodes[3].childNodes[7];
    let btn = parent.childNodes[1].childNodes[5].childNodes[1];

    // data-bs-toggle="modal" data-bs-target="#taskModal"

    btn.removeAttribute("data-bs-toggle");
    btn.removeAttribute("data-bs-target");

    btn.setAttribute("onclick","saveit(this)");

    title.setAttribute("contenteditable","true");
    price.setAttribute("contenteditable","true");
    desc.setAttribute("contenteditable","true");

    btn.innerText = "Save It";

    

}


const saveit = (e)=>{
      let id = e.id;
      let title;
      let price;
      let desc;
      let p = e.parentNode.parentNode;
      let obj = {
      title : p.childNodes[3].childNodes[3].innerText,
      price : p.childNodes[3].childNodes[5].innerText,
      desc : p.childNodes[3].childNodes[7].innerText,
    }

      let n = state.tasklist.find(each => each.id == id);
     

     
      let n1 = state.tasklist.filter((each)=> each != n);
      state.tasklist = n1;

      n = {...n,...obj};

      state.tasklist.push(n);

      updateStorage();

      e.innerHTML = "Open It";
      e.setAttribute("data-bs-toggle","modal");
      e.setAttribute("data-bs-target","#taskModal");
     
      e.setAttribute("onclick","modalop(this)");


      p.childNodes[3].childNodes[3].setAttribute("contenteditable","false");
      p.childNodes[3].childNodes[5].setAttribute("contenteditable","false");
      p.childNodes[3].childNodes[7].setAttribute("contenteditable","false");

}


const search = (e)=>{
    while(card.firstChild){
      card.removeChild(card.firstChild)
    }

    const res = state.tasklist.filter(({title}) =>
       title.toLowerCase().includes(e.value.toLowerCase()) 
    )

    res.map((each)=> card.insertAdjacentHTML("beforeend",htmltaskcard(each)));
}