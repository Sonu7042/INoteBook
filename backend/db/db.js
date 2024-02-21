const mongoose=require('mongoose')

const link="mongodb+srv://admin:pbq25yBZCyjOmY5H@cluster0.ybhaog4.mongodb.net/"

const mongoConnect=()=>{
  mongoose.connect(link)
  .then(function(){
    console.log("db is connected")
  })
  .catch(function(error){
    console.log(error.messsage)
  })

}
 

module.exports=mongoConnect