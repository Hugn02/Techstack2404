let users = [
	{
		id: 1,
		first_name: 'Lorilee',
		last_name: 'Adame',
		email: 'ladame0@guardian.co.uk',
		password: '12345678',
	},
	{
		id: 2,
		first_name: 'Gannon',
		last_name: 'Manwell',
		email: 'gmanwell1@naver.com',
		password: '12345678',
	},
	{
		id: 3,
		first_name: 'Christiana',
		last_name: 'Dowtry',
		email: 'cdowtry2@mapy.cz',
		password: '12345678',
	},
	{
		id: 4,
		first_name: 'Warden',
		last_name: 'Ansteys',
		email: 'wansteys3@yahoo.com',
		password: '12345678',
	},
	{
		id: 5,
		first_name: 'Claybourne',
		last_name: 'Barbosa',
		email: 'cbarbosa4@si.edu',
		password: '12345678',
	},
	{
		id: 6,
		first_name: 'Zita',
		last_name: 'Triner',
		email: 'ztriner5@youku.com',
		password: '12345678',
	},
	{
		id: 7,
		first_name: 'Orsa',
		last_name: 'Pilcher',
		email: 'opilcher6@surveymonkey.com',
		password: '12345678',
	},
	{
		id: 8,
		first_name: 'Lyn',
		last_name: 'Fockes',
		email: 'lfockes7@answers.com',
		password: '12345678',
	},
	{
		id: 9,
		first_name: 'Harv',
		last_name: 'Olifaunt',
		email: 'holifaunt8@jalbum.net',
		password: '12345678',
	},
	{
		id: 10,
		first_name: 'Nikita',
		last_name: 'Duncanson',
		email: 'nduncanson9@harvard.edu',
		password: '12345678',
	},
];
function login() {
            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (!email || !password) {
                document.getElementById("loginMessage").innerText = "Hãy nhập đầy đủ thông tin";
                return;
            }

            const user = users.find(user => user.email === email && user.password === password);

            if (user) {
                document.getElementById("loginMessage").innerText = `Xin chào ${user.first_name} ${user.last_name}`;
            } else {
                document.getElementById("loginMessage").innerText = "Thông tin tài khoản không chính xác";
            }
        }

function register() {
           
            const firstName = document.getElementById("firstName").value.trim();
            const lastName = document.getElementById("lastName").value.trim();
            const email = document.getElementById("registerEmail").value.trim();
            const password = document.getElementById("registerPassword").value.trim();

            if (!firstName || !lastName || !email || !password) {
                document.getElementById("registerMessage").innerText = "Hãy nhập đầy đủ thông tin";
                return;
            }

            const existingUser = users.find(user => user.email === email);

            if (existingUser) {
                document.getElementById("registerMessage").innerText = "Email này đã có tài khoản";
                return;
            }

            const newUser = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            };
      
            users.push(newUser);

            document.getElementById("registerMessage").innerText = `Đăng ký thành công! Xin chào ${newUser.first_name} ${newUser.last_name}`;
        }
        function searchUsers() {
            const keyword = document.getElementById("keyword").value.trim().toLowerCase();
            const userList = document.getElementById("userList");

            userList.innerHTML = "";

            const filteredUsers = users.filter(user => 
                user.first_name.toLowerCase().includes(keyword) ||
                user.last_name.toLowerCase().includes(keyword) ||
                user.email.toLowerCase().includes(keyword)
            );

            const usersToDisplay = keyword === "" ? users : filteredUsers;

            usersToDisplay.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.id}</td>
                    <td>${user.first_name} ${user.last_name}</td>
                    <td>${user.email}</td>
                `;
                userList.appendChild(row);
            });
        }



