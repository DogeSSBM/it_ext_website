
console.log('Running index.js...');

let url = 'http://localhost:3000/employees';

function insertIntoDirectory() {

	fetch(url)
		.then(response => response.json())
		.then(data => {
			let table = document.getElementById("directory");

			data.forEach(employee => {
				let row = table.insertRow(-1);

				let id = row.insertCell(0);
				let firstName = row.insertCell(1);
				let lastName = row.insertCell(2);
				let ext = row.insertCell(3);
				let department = row.insertCell(4);
				let email = row.insertCell(5);

				id.innerHTML = employee.id;
				firstName.innerHTML = employee.firstName;
				lastName.innerHTML = employee.lastName;
				ext.innerHTML = employee.ext;
				department.innerHTML = employee.department;
				email.innerHTML = employee.email;
			});
		})
		.catch(err => console.error(err));
}

insertIntoDirectory();
