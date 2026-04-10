let express = require("express");
let app = express();
let port = 8080;
let path = require("path");
const mysql = require("mysql2");
app.set("view engine","ejs");
app.use(express.static("views"));
app.set("views",path.join(__dirname,"/views"));
const {faker} = require("@faker-js/faker");
app.use(express.urlencoded({extended:true}));  // this is used for taking post responses
// let createRandomUser = ()=>{
//     return{
//         Name : faker.person.firstName(),
//         Integer : faker.number.int({min:1,max:99}),
//     }

// }
app.listen(port,()=>{
    console.log('server started');
})

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    database : 'college',
    password : '1234'
});
connection.connect();

app.get('/count',(req,res)=>{
    let q = `select count(*) from fakeTab `;
    connection.query(q,(err,result)=>{
        if (err) throw err;
        res.send(result);
    })
})

app.get("/home",(req, res)=>{
    let q = `select * from fakeTab`;
    connection.query(q,(err,result)=>{
        if (err) throw err;
        res.render('home.ejs',{result}); 
    });
})

app.get('/edit',(req,res)=>{
    let Name_New = req.query.Name;            // 
    res.render("edit.ejs",{Name_New});
})

app.post("/HomeNew",(req, res)=>{
    let Name = req.body.Name;
    let New_Marks = req.body.Marks;   // post mai data req.body se aata h
    connection.query(`update fakeTab set Marks = ? where Name = ?`,[New_Marks,Name],(err,result)=>{
        if (err) throw err;
        connection.query(`select * from fakeTab`,(err,result)=>{
            if (err) throw err;
            // console.log(result);
            res.render('home.ejs',{result}); 
    
        });
    });
})


// let q = `insert into fakeTab (Name , Marks ) values ? `;
// let Data = [];
// for (let X = 0;X< 50;X++){
//     let Val = createRandomUser();
//     Data.push([Val.Name,Val.Integer]);

// }
// connection.query(q, [Data], (err,result)=>{
//     if (err) throw err;
//     console.log(Data);
// })
