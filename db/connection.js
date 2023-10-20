const mongoose=require('mongoose')
//connection
mongoose.connect(process.env.BASE_URL,{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("___Mongodb atlas Connectd___");
}).catch(()=>{
    console.log("Mdb Atlas not Connected");
})
