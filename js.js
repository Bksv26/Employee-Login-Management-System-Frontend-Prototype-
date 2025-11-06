let departments = [
    { depId: 1, name: "HR" },
    { depId: 2, name: "IT" },
    { depId: 3, name: "Admin" }
];

if (!localStorage.getItem("employees")) {
    let employees = [
       { uid: "emp1", pwd: "emp1", depId: 2 },
  { uid: "emp2", pwd: "emp2", depId: 3 },
  { uid: "emp3", pwd: "emp3", depId: 1 },
  { uid: "emp4", pwd: "emp4", depId: 3 },
  { uid: "emp5", pwd: "emp5", depId: 1 },
  { uid: "emp6", pwd: "emp6", depId: 2 },
  { uid: "emp7", pwd: "emp7", depId: 1 },
  { uid: "emp8", pwd: "emp8", depId: 2 },
  { uid: "emp9", pwd: "emp9", depId: 3 },
  { uid: "emp10", pwd: "emp10", depId: 1 },
  { uid: "emp11", pwd: "emp11", depId: 2 },
  { uid: "emp12", pwd: "emp12", depId: 3 },
  { uid: "emp13", pwd: "emp13", depId: 1 },
  { uid: "emp14", pwd: "emp14", depId: 3 },
  { uid: "emp15", pwd: "emp15", depId: 2 },
  { uid: "emp16", pwd: "emp16", depId: 2 },
  { uid: "emp17", pwd: "emp17", depId: 1 },
  { uid: "emp18", pwd: "emp18", depId: 3 },
  { uid: "emp19", pwd: "emp19", depId: 1 },
  { uid: "emp20", pwd: "emp20", depId: 2 },
  { uid: "emp21", pwd: "emp21", depId: 1 },
  { uid: "emp22", pwd: "emp22", depId: 2 },
  { uid: "emp23", pwd: "emp23", depId: 3 },
  { uid: "emp24", pwd: "emp24", depId: 1 },
  { uid: "emp25", pwd: "emp25", depId: 3 },
  { uid: "emp26", pwd: "emp26", depId: 1 },
  { uid: "emp27", pwd: "emp27", depId: 2 },
  { uid: "emp28", pwd: "emp28", depId: 1 },
  { uid: "emp29", pwd: "emp29", depId: 3 },
  { uid: "emp30", pwd: "emp30", depId: 2 },
  { uid: "emp31", pwd: "emp31", depId: 1 },
  { uid: "emp32", pwd: "emp32", depId: 3 },
  { uid: "emp33", pwd: "emp33", depId: 2 },
  { uid: "emp34", pwd: "emp34", depId: 1 },
  { uid: "emp35", pwd: "emp35", depId: 3 },
  { uid: "emp36", pwd: "emp36", depId: 1 },
  { uid: "emp37", pwd: "emp37", depId: 2 },
  { uid: "emp38", pwd: "emp38", depId: 3 },
  { uid: "emp39", pwd: "emp39", depId: 2 },
  { uid: "emp40", pwd: "emp40", depId: 1 },
  { uid: "emp41", pwd: "emp41", depId: 3 },
  { uid: "emp42", pwd: "emp42", depId: 2 },
  { uid: "emp43", pwd: "emp43", depId: 1 },
  { uid: "emp44", pwd: "emp44", depId: 3 },
  { uid: "emp45", pwd: "emp45", depId: 2 },
  { uid: "emp46", pwd: "emp46", depId: 1 },
  { uid: "emp47", pwd: "emp47", depId: 2 },
  { uid: "emp48", pwd: "emp48", depId: 3 },
  { uid: "emp49", pwd: "emp49", depId: 1 },
  { uid: "emp50", pwd: "emp50", depId: 2 }
    ];
    localStorage.setItem("employees", JSON.stringify(employees));
}

let employees = JSON.parse(localStorage.getItem("employees")) || [];
let filteredEmployees = null;
let currentPage = 1;
let pageSize = 10;

window.onload = () => {
    if (employees.filter(emp => emp.uid && emp.pwd).length >= 4) {
        document.getElementById("create").disabled = true;
    }
    displayEmployees();
};

function Login() {
    const uidInput = document.getElementById("uid").value.trim();
    const pwdInput = document.getElementById("pwd").value.trim();
    const result = document.getElementById("result");

    const validEmployees = employees.filter(emp => emp.uid && emp.pwd);
    if (validEmployees.length >= 4) {
        const exists = validEmployees.some(emp => emp.uid === uidInput);
        if (!exists) {
            result.innerHTML = `<p>Employee limit reached. Cannot login</p>`;
            return;
        }
    }

    const user = employees.find(emp => emp.uid === uidInput);
    if (!user) {
        result.innerHTML = `<p>Employee not found. Please click Create.</p>`;
        return;
    }

    if (user.pwd !== pwdInput) {
        result.innerHTML = `<p>Wrong password</p>`;
        return;
    }

    const savedAddress = localStorage.getItem(`${uidInput}_address`);
    if (!savedAddress) {
        const address = {
            city: document.getElementById("city").value.trim(),
            state: document.getElementById("state").value.trim(),
            pincode: document.getElementById("pincode").value.trim()
        };

        for (let key in address) {
            if (!address[key]) {
                result.innerHTML = `<p>Fill the details.</p>`;
                return;
            }
        }

        localStorage.setItem(`${uidInput}_address`, JSON.stringify(address));

        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
        document.getElementById("pincode").value = "";
    }

    localStorage.setItem("currentemployee", uidInput);
    window.location.href = "bpage.html";
}

function createEmployee() {
    const uidInput = document.getElementById("uid").value.trim();
    const pwdInput = document.getElementById("pwd").value.trim();
    const result = document.getElementById("result");

    if (!uidInput || !pwdInput) {
        result.innerHTML = `<p> enter User ID and Password.</p>`;
        return;
    }

    const validEmployees = employees.filter(emp => emp.uid && emp.pwd);
    if (validEmployees.length >= 4) {
        result.innerHTML = `max reached`;
        return;
    }

    const exists = validEmployees.some(emp => emp.uid === uidInput);
    if (exists) {
        result.innerHTML = `<p>employee already exists.</p>`;
        return;
    }

    const randomDep = departments[Math.floor(Math.random() * departments.length)];
    employees.push({ uid: uidInput, pwd: pwdInput, depId: randomDep.depId });

    localStorage.setItem("employees", JSON.stringify(employees));
    result.innerHTML = `<p>New employee created. fill the fields.</p>`;
    displayEmployees();
}

function displayEmployees(list = null) {
    const userList = document.getElementById("user");
    userList.innerHTML = "";

    const showList = list || employees;

    const pagedList = showList.slice(0, pageSize);

    if (pagedList.length === 0) {
        userList.innerHTML = "<li>No employee found.</li>";
        return;
    }

    pagedList.forEach(emp => {
        const dep = departments.find(d => d.depId === emp.depId)?.name || "Unknown";
        let address = "";
        const addrData = localStorage.getItem(`${emp.uid}_address`);
        if (addrData) {
            const addr = JSON.parse(addrData);
            address = ` | Address: ${addr.city}, ${addr.state} - ${addr.pincode}`;
        }
        const li = document.createElement("li");
        li.textContent = `User: ${emp.uid} | Department: ${dep}${address}`;
        userList.appendChild(li);
    });

    }


function setPageSize() {
    const input = document.getElementById("pageSizeInput");
    let val = parseInt(input.value, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > employees.length) val = employees.length;
    pageSize = val;
    currentPage = 1;
    displayEmployees(filteredEmployees || null);
}

function sortEmployees(order) {
    let list = filteredEmployees || [...employees];

    list.sort((a, b) => {
        const aPrefix = a.uid.replace(/[0-9]/g, "");
        const bPrefix = b.uid.replace(/[0-9]/g, "");

        if (aPrefix < bPrefix) return order === "asc" ? -1 : 1;
        if (aPrefix > bPrefix) return order === "asc" ? 1 : -1;

        const aNum = parseInt(a.uid.replace(/\D/g, ""));
        const bNum = parseInt(b.uid.replace(/\D/g, ""));

        return order === "asc" ? aNum - bNum : bNum - aNum;
    });

    displayEmployees(list);

    const status = document.getElementById("sortStatus");
    if (status) {
        status.textContent = order === "asc" ? "Sorted: Ascending ↑" : "Sorted: Descending ↓";
    }
}
