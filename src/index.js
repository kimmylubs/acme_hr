const ul = document.querySelector('ul');
const init = async () => {
    const response = await axios.get('/api/employees').data;
    const html = employees.map(employee => {
        return
        `<li> ${employee.name} </li>`;
    }).join('');
    ul.innerHTML = html;
};

init();s