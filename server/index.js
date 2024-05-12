let express = require('express')
let app =express();
const port =5000
let mysql = require('mysql')
let cors= require('cors');
let bcrypt = require('bcrypt')
let bodyParser = require('body-parser')
let cookieParse=require('cookie-parser')
let session = require('express-session')
app.use(cors({
  origin:['http://localhost:3000'],
  methods: ['GET','POST'],
  credentials:true
}))
app.use(cookieParse());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
  secret: 'your_secret_here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 
  }
}));


app.use(express.json())
let saltRounds =10;

var pool =mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"Ssk@2000",
    database:"university",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});


app.get('/',(req,res)=>{

  res.status(200).send('ok');
})

app.post('/add',(req,res1)=>{  
  let id=req.body.id;
  let name = req.body.name;
  let tot_cred = req.body.credits;
  let dept_name= req.body.dept;
  

  console.log(id,name,tot_cred,dept_name)

  let z= "insert into student (id,name,dept_name,tot_cred) values(?,?,?,?)"

    pool.query(z,[id,name,dept_name,tot_cred],(err, res) => {
      if (err) {  
        console.error(err);
        res1.status(500).send('Error inserting data into MySQL'+res);
      } else {
        console.log('Data inserted into db😎');
        res1.status(200).send('Data inserted into MySQL'+`${id} ${name}  ${tot_cred}  ${dept_name}`);
      }
    })
})

app.post('/register',(req,res)=>{
  let runame = req.body.runame;
  let rpass = req.body.rpass;

  let i = "INSERT INTO cred (name,pass) values(?,?)"
  bcrypt.hash(rpass,saltRounds,(err,hash)=>{
    if(err){
      console.log(err);
    }
    pool.query(i,[runame,hash],(err,res2)=>{

      if(err){
        console.log(err);
        res.status(500).send("Error registering user ,try again later😵‍💫"+res2);
      }else{
        console.log('data inserted inot db😊')
        res.status(200).send('data inseted into mysql 😎' )
      }
    })
  })
})

app.post('/login' ,(req,res)=>{
  let uname=req.body.uname;
  let pass= req.body.pass;

  pool.query(`SELECT * FROM cred WHERE name ='${uname}'`,(err,res3)=>{
    if(err){
      console.log(err);
      res.status(500).send("server error.come again  later.😵‍💫"+ err);
    }else{
      if(res3.length >0){
        bcrypt.compare(pass,res3[0].pass,(error,response)=>{
          if(response){
            console.log(`session before :${req.session.user}`)
            req.session.user=res3[0];
            console.log(req.session.user);
            res.status(200).send(res3[0]);
            console.log('User Found 😊'+ res3[0].name +res3[0].pass)
          }else{
            res.status(500).send('wrong credentials');
          }
        });
      }else{
        res.status(500).send("user doesnt exists")
      }
    } 
  })

})


app.get('/login',(req,res)=>{
  console.log(req.session.user) 
  if(req.session.user){
    res.send({loggedIn:true,user:req.session.user})
  }else{
    res.send({loggedIn:false,'user':req.session.user}) 
  }
})

app.listen(port,()=>{
  console.log(`server is on ${port}`);
})