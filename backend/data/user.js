import bcrypt from 'bcryptjs'


const users = [

{
   name:"Admin User",
    email:"admin@example.com",
    password: bcrypt.hashSync('1234',10),
    isAdmin :true,
},

{
    name:"Aizaz",
     email:"Aizaz@example.com",
     password: bcrypt.hashSync('1234',10),
     
 },
 

 {
    name:"Jhon",
     email:"jhon@example.com",
     password: bcrypt.hashSync('1234',10),
   
 },
 

]

export default users