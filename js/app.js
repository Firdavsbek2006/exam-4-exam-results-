"use strict";


// -------------------BASE_URL--------------------------
const BASE_URL = "http://localhost:8080";


// -------------------Get All Data START--------------------------
const getAllData = async () => {
    const response = await fetch(`${BASE_URL}/students`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const data = await response.json();

    renderData(data);
};
getAllData();
// -------------------Get All Data END--------------------------


// -------------------RENDER DATA START--------------------------
function renderData(data = []) {
    data.forEach((e) => {
        const date = new Date();
        const tr = createElement(
            "tr",
            "tr",
            `
        <td>
            <strong>${e.id}</strong>
        </td>
        <td>${e.name} ${e.lastname}</td>
        <td>${date.getDate()}.${date.getMonth()}.${date.getFullYear()}y</td>
        <td>${e.mark}</td>
        <td>
        ${e.mark >= 150 ? `<button class="btn btn-success" data-set="${e.id}"><i class="bi bi-check2-square"></i></button>` : `<button class="btn btn-danger" data-set="${e.id}"><i class="bi bi-patch-exclamation-fill"></i></button>`}
        </td> 
        <td>
            <button class="btn-addd btn btn-primary" data-edit="${e.id}"><i class="bi bi-pencil-square" data-edit="${e.id}"></i></button>
        </td>
        <td>
            <button class="btn btn-warning" data-del="${e.id}"><i class="bi bi-trash3-fill" data-del="${e.id}"></i></button>
        </td>
        `
        );
        $(".wrapper").appendChild(tr);
    });
}
// -------------------RENDER DATA END--------------------------





// -------------------POST DATA START--------------------------
$("#btn-ad").addEventListener("click", (e) => {
    postData();
    hideModal();
});
// -------------------POST DATA END--------------------------



// -------------------POST DATA START--------------------------
function postData() {
    const date = new Date();

    const isName = $("#name").value.trim();
    const isLastName = $("#lastName").value.trim();
    const isMark = $("#mark").value;

    const parametrs = {
        name: isName,
        lastname: isLastName,
        mark: isMark,
        date: date.getDate()
    }

    fetch(`${BASE_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(parametrs)
    })
}
// -------------------POST DATA END--------------------------




// -------------------DELETE DATA START--------------------------
$(".wrapper").addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-warning") || e.target.classList.contains("bi-trash3-fill")) {
        const id = e.target.getAttribute("data-del");

        fetch(`${BASE_URL}/students/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({}),
        })
    }
})
// -------------------DELETE DATA END--------------------------





// -------------------UPDATE FUNCTION START--------------------------
// function updateData() {

//     const id = localStorage.getItem('editID');

//     const isName = $("#namee").value.trim();
//     const isLastName = $("#lastNamee").value;
//     const isMark = $("#markk").value;

//     fetch(`${BASE_URL}/students/${id}`, {
//         method: "PUT",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: isName,
//             lastname: isLastName,
//             mark: isMark,
//         }),
//     });
// }
// -------------------UPDATE FUNCTION END--------------------------


// -------------------OPEN MODAL WHEN CLICK UPDATE BTN START--------------------------
$(".wrapper").addEventListener('click', (e) => {
    if (e.target.classList.contains("btn-primary") || e.target.classList.contains("bi-pencil-square")) {
        const id = e.target.getAttribute("data-edit");

        localStorage.setItem("editID", id)

        $(".modall-window").classList.remove("d-none");
    }
})
// -------------------OPEN MODAL WHEN CLICK UPDATE BTN END--------------------------

const productItem = async function (id) {
    const response = await fetch(`${BASE_URL}/students/${id}`);
    const {
        name,
        lastname,
        mark
    } = await response.json();

    return {
        name,
        lastname,
        mark
    };
};


// -------------------UPDATE DATA START--------------------------
$("#btn-a").addEventListener('click', (e) => {
    const id = e.target.getAttribute("data-edit");



    hideModall()
})
// -------------------UPDATE DATA END--------------------------





// -------------------BTN ADD START--------------------------
$("#btn-add").addEventListener("click", () => {
    $(".modal-window").classList.remove("d-none");
});
// -------------------BTN ADD END--------------------------


// -------------------BTN CLOSE START--------------------------
$("#btn-close").addEventListener("click", () => {
    hideModal();
});
$("#btn-closee").addEventListener("click", () => {
    hideModall();
});
// -------------------BTN CLOSE END--------------------------







// -------------------FUNCTION HIDE MODAL START--------------------------
function hideModal() {
    $(".modal-window").classList.add("d-none");
}
function hideModall() {
    $(".modall-window").classList.add("d-none");
}
// -------------------FUNCTION HIDE MODAL END--------------------------


fetch(`${BASE_URL}/students`)
.then(data=>data.json())
.then((data)=>{
    getCount(data);
    console.log(data)
})

async function getCount(data) {
    // $(".count").innerHTML = "";

    
 
    let s = 0;
    data.forEach((e)=>{
        s++;
    })
    console.log(s);

    $(".count").innerText = s;

    let k = 0;
    data.forEach((e)=>{
        k = k + JSON.parse(e.mark);
    })
    let p = Math.floor((k / s)/150*100);
    console.log(p);
    console.log(k);

    $(".count-procent").innerText = `${p}%`;
}




$(".form-bir").addEventListener('submit', ()=>{
    fetch(`${BASE_URL}/students`)
    .then(data=>data.json())
    .then((data)=>{
        sort(data)
    })

    $("#select").addEventListener("onchange", ()=>{
        function sort(data){
            data.sort();
        }
    })
})