const express = require('express');
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URl ||'postgres://localhost/acme_things')
const path = require('path');

const app = express();

const Employee = conn.define('employee', {
    name: {
        type: Sequelize.STRING,
        unique: true
    }
})

app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

// app.get('/', async(req, res, next) => {
//     try{
//         res.redirect('/api/employees');
//     }catch(e){
//         next(e);
//     }
// })

app.get('/api/employees', async(req, res, next) => {
    try{
        res.send(await Employee.findAll());
    }catch(e){
        next(e)
    }
});

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [moe, lucy, ethyl, joe, larry, tim] = await Promise.all(
        ['moe', 'lucy', 'ethy', 'joe', 'larry', 'tim']
	    .map ( name => Employee.create({ name }))
    );
};




const init = async() => {
    try{
        await syncAndSeed();
    }catch(e){
        console.log(e)
    }
};

init();

app.listen(process.env.PORT || 3000);
