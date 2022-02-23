const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL ||'postgres://localhost/acme_things');
const path = require('path');

const Employee = conn.define('employee', {
    name: {
        type: Sequelize.STRING,
    },
    employeeType: {
        type: Sequelize.ENUM('parttime', 'fulltime', 'intern'),
        defaultValue: 'fulltime',
    }
});

app.use('/src', express.static(path.join(__dirname, 'src')));

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/employees', async(req, res, next) => {
    try{
        res.send(await Employee.findAll());
    }catch(e){
        next(e)
    }
});
//curl localhost:3000/api/emploese

const syncAndSeed = async() => {
    await conn.sync({ force: true });
    const [moe, lucy, ethyl, joe, larry, tim] = await Promise.all(
        ['moe', 'lucy', 'ethyl', 'joe', 'larry', 'tim']
	    .map ( name => Employee.create({ name }))
    );
    ethyl.employeeType = 'parttime';
    await (ethyl.save());
};

syncAndSeed();

app.listen(process.env.PORT || 3000);
