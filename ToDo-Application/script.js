let isShowInput = true;
const todoUlElement = document.getElementById('todo-ul');
const todoCreateInput = document.querySelector('.todo-create-input');
const createTaskArea = document.getElementById('create-task-area');
const updateTaskArea = document.getElementById('update-task-area');
const todoUpdateInput = document.querySelector('.todo-update-input');


function clearInput() {
    todoCreateInput.value = "";
    todoCreateInput.focus();
}

function toggleInputArea(showInput) {
    isShowInput = showInput;
    createTaskArea.style.display = isShowInput ? "block" : "none";
    updateTaskArea.style.display = isShowInput ? "none" : "block";
}



function get(i) {
    toggleInputArea(false);
    
    
    axios(`http://localhost:8080/api/todo/getById/${i}`)
    .then(response =>{

        const todo = response.data
        todoUpdateInput.value = todo.title
    }).catch(error =>{
        console.error('Getirme işlemi sırasında hata oluştu:', error);
    }) 
    

}

   





function completeTask(i) {
    const taskInput = document.querySelector(`#taskInput${i}`);
    taskInput.style.transition = "all 0.5s ease"; 

    setTimeout(() => {
        taskInput.style.opacity = "0"; 
    }, 500); 

    setTimeout(() => {
        todos.splice(i, 1);
        getAllTodos();
    }, 1000); 
}

function changeBackgroundColor(color) {


    document.body.style.backgroundColor = color;
    document.getElementById('title').style.color = "#000";

}



//--------------APİLER------------------------
getAllFromApi1()


function getAllFromApi1(){

    axios('http://localhost:8080/api/todos/getAll')
    .then(response => {

        let allTodos = response.data
      
 let text = ""

 for (let i in allTodos) {
    
   text += `<li id="todo-list" data-index="${allTodos[i]._id}">
  
   <br>
   <input class="task-input" id="taskInput${i}" type="text" value="${allTodos[i].title}" readonly>
   <button id="delete-btn" onclick="deleteTodo('${allTodos[i]._id}')">
   <i class="fa-solid fa-trash-can" style="color: #ca1c1c;"></i>
         </button>
         <button id="update-btn" onclick="get('${allTodos[i]._id}')">
             <i class="fa-solid fa-pencil" style="color: #2c1060;"></i>
         </button>
   
   
       </li>`
       
 }

 todoUlElement.innerHTML = text



    })

}

 async  function addTodo(event){

    event.preventDefault()

    if(todoCreateInput.value.toString().trim() !== ""){

     const newTodo = {

       title: todoCreateInput.value

     }
     
   
try{

const response =  await axios.post('http://localhost:8080/api/todo/create' , newTodo)



if(response.status ===200){
    alert('Kayıt işlemi başarılı!');

  await  getAllFromApi1()
    
    clearInput()

}


  } catch (error) {
    console.error('Kayıt işleminde hata oluştu:', error);
}

    }
    else{
        alert('Boş Değer Girilemez !')
    }
        }

        


        function cancelUpdate() {
            toggleInputArea(true); 
            todoUpdateInput.value = ""; 
        }

       
 async function deleteTodo(i){

    const result = confirm('Silmek İstediğinizden Emin misiniz ?')

    if(result){
        
    await axios.delete(`http://localhost:8080/api/todo/delete/${i}`)
     .then(response =>{
        alert(response.data.message)
        
        getAllFromApi1()


     }) 
     
     .catch(error =>{
        console.error('Silme işlemi sırasında hata oluştu:', error)
     })


         }

  }      

  


  //UPDATE KISMI GÜNCELLENECEK !

  const updateTodoBtn = document.querySelector(".update-todoBtn");

updateTodoBtn.addEventListener("click", () => {
    const updatedValue = todoUpdateInput.value.trim();

    if (updatedValue !== "") {
        const updatedTodo = {
            title: updatedValue
        };
        
        selectedIndex = i     
        console.log(selectedIndex)
        try {

            axios.put(`http://localhost:8080/api/todos/update/${selectedIndex}`, updatedTodo)
       
                .then(response => {
                    
                    if (response.status === 200) {
                        console.log('axios.put() çağrısı yapıldı.');

                        alert(response.data.message);
                        getAllFromApi1();
                        clearInput();
                        console.log('axios.put() çağrısı yapıldı.11');

                    } else {
                        console.error('HATA !!!!' );
                    }

                })
               
        } catch (error) {
            console.error('HATA !!!!' , error);
        }
    } else {
        alert('Boş Değer Girilemez  !');
    }
});