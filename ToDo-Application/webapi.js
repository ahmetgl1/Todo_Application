const express = require('express')

const http = express()

http.use(express.json())

const cors = require('cors')

http.use(cors())

const {v4: uuidv4} = require('uuid')


const mongoose = require('mongoose')

const port = process.env.PORT || 8080

http.listen(port)

const uri = "mongodb+srv://ahmetgl:1234@cluster0.4pyq4vg.mongodb.net/"

mongoose.connect(uri)


const TodoSchema = new mongoose.Schema({


  _id: {
    type: String,
    default: uuidv4()
  },
  title: String

})

const Todo = mongoose.model('todo', TodoSchema)


http.get('/api/todos/getAll' , async(request,response) =>{

 
  try{

    const result = await Todo.find()
    
response.json(result)



  }catch(error){

    response.status(500).json({message: "Server Hatası !"})
  }
 
})

http.get('/api/todo/get/:value' , async(request, response) =>{

  try{
    const id = request.params.value

const taskData = await Todo.findOne({_id: id})

if (taskData) {
  response.status(200).json(taskData);
} else {
  response.status(404).json({ message: 'Görev bulunamadı' });
}


  }catch(error ) {
    response.status(500).json({message: "Server Hatası !"})
  } 

})




http.post('/api/todo/create', async(request, response)=>{


  try{

 const {title} = request.body

let todo = new Todo({
  title
})

await todo.save(todo)


response.json({message: "Kayıt Başarılı !"})
  }catch(error){
  
    response.status(500)
   
  }

       })

   
       
  http.delete(`/api/todo/delete/:id` , async(request , response)=>{

   try{

    const id = request.params.id

    await Todo.findByIdAndDelete( id)
    

    response.json({message: "Kayıt Silindi !"})
   }catch(error){
    response.status(500).json({message:"Silinirken bir hata oluştu"})
   }


  })     


  http.get('/api/todo/getById/:id' ,async(request , response) =>{

    try{
      const id = request.params.id

      const result = await Todo.findById(id)
          
      response.json(result)
    }catch(error){
      response.status(500).json({message : "Server Hatası !"})
    }
  })





http.put(`/api/todos/update/:id` , async(request, response) =>{

  try{

const id = request.params.id
const updateTodo  = request.body

const result = await Todo.findByIdAndUpdate(id , updateTodo ,{new: true})


if(result){
  response.json({message: "Güncelleme Başarılı !"})
}
else{
  response.status(500).json({ message: 'Kayıt bulunamadı.' })
}

  }catch (error) {
    res.status(500).json({ message: 'Güncelleme sırasında bir hata oluştu.' });
  }
})