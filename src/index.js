const ul = document.querySelector('ul');

ul.addEventListener('click', async(event) => {
    if (event.target.tagName === 'LI') {
        const id = event.target.getAttribute('data-id');
        axios.delete(`/api/employees/${id}`);
        console.log(id);
    }
});

const init = async() => {
    const employees = (await axios.get('/api/employees') ).data;
    const html = employees.map(employee => {
        return `
         <li data-id='${employee.id}'> ${employee.name} </li>
        `;
    }).join('');
    ul.innerHTML = html;

};

init();