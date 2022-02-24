const ul = document.querySelector('ul');

ul.addEventListener('click', async(event) => {
    if (event.target.tagName === 'LI') {
        const id = event.target.getAttribute('data-id');
        await axios.delete(`/api/employees/${id}`);
        // console.log(id)
        // init();
        
    }
});

const init = async() => { 
    const employees = (await axios.get('/api/employees')).data;
    const html = employees.map(employee => {
        return `<li data-id='${employee.id}'> ${employee.name} </li>`}).join('');
    ul.innerHTML = html;

};

init();