// összes felhasználó lekérdezése és táblázatba rendezése
async function getUsers() {
    const res = await fetch('/getUsers');
    const users = await res.json();

    tableRow(users);
}

// keresés a felhasználók között egy megadott feltétel alapján
document.getElementById('searchingForm').onsubmit = async function(event) {
    event.preventDefault();

    const columnNames = {
        1: 'email',
        2: 'username',
        3: 'role'
    };

    let searching = event.target.elements.searching.value;
    const searchingType = columnNames[event.target.elements.searchType.value];

    // ha a szerepkörre keresünk, akkor csak user vagy 0 vagy admin vagy 1-et adhatunk meg a kereső mezőben
    if (searchingType === 'role') {
        if (searching === 'user' || searching === "0") {
            searching = 0;
        } else if (searching == 'admin' || searching === "1") {
            searching = 1;
        } else {
            alert('Csak 0-t, 1-et vagy admin vagy user kulcsszót adhatsz meg!');
            return;
        }
    }

    const res = await fetch('/searchingUser', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ searching, searchingType })
    });
    const users = await res.json();

    if (users.length === 0) {
        document.getElementById('users').innerHTML = '<tr><td colspan=6>Nincs találat</td></tr>';
    } else {
        tableRow(users);
    }
}

// a felhasználók adatainak táblázatba rajzolása
function tableRow(users) {
    let usersHTML = '';

    for (let user of users) {
        usersHTML += `
            <tr>
                <td>${user.userID}</td>
                <td>${user.email}</td>
                <td>${user.username}</td>
                <td>${user.role === 0 ? 'user' : 'admin'}</td>
                <td>
                    <button type="button" class="btn btn-outline-warning" onclick="editRole(${user.userID})">
                        <i class="fa-solid fa-user-pen"></i>
                    </button>
                </td>
                <td>
                    <button type="button" class="btn btn-outline-danger" onclick="deleteUser(${user.userID})">
                        <i class="fa-solid fa-user-xmark"></i>
                    </button>
                </td>
            </tr>
        `;
    }

    document.getElementById('users').innerHTML = usersHTML;
}

// szerepkör módosítás modal ablakának megjelnítése
function editRole(userID) {
    const modal = new bootstrap.Modal(document.getElementById('editRoleModal'));
    const id = document.getElementById('editRoleModal');
    id.setAttribute('data-userID', userID);
    modal.show();
}

// szerepkör módosítása
async function changeRole() {
    const modalElements = document.getElementById('editRoleModal');
    const id = modalElements.getAttribute('data-userID');
    const modal = bootstrap.Modal.getInstance(modalElements);

    const editRole = document.getElementById('editRole').value;

    const res = await fetch(`/editRole/${id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ editRole })
    });

    const data = await res.json();

    if (data.success) {
        modal.hide();
        alert('Sikeres szerepkör módosítás!');
        getUsers();
    } else {
        alert('Valami hiba történt!');
    }
}

// felhasználó törlése
async function deleteUser(userID) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {
        return;
    }

    const res = await fetch(`/deleteUser/${userID}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json"
        }
    });

    const data = await res.json();

    if (data.success) {
        alert('Sikeres törlés!');
        getUsers();
    } else {
        alert('Valami hiba történt!');
    }
}