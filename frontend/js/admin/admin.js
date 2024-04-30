// termékek lekérdezése
async function fetchSeries() {
    const response = await fetch('/series');
    const aruhaz = await response.json();

    seriesDrawing(aruhaz);
}

// termék felvétele
document.getElementById('create-series').onsubmit = async function (event) {
    event.preventDefault();

    const name = event.target.elements.name.value;
    const price = event.target.elements.price.value;
    const stock = event.target.elements.stock.value;
    const image = event.target.elements.image.files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);
    

    const res = await fetch('/series', {
        method: "POST",
        body: formData
    });

    if (res.ok) {
        alert("Sikeres felvétel!");
        event.target.elements.name.value = null;
        event.target.elements.price.value = null;
        fetchSeries();
    } else {
        alert("Hiba a felvétel során!");
    }
}

// termék törlése
async function deleteSeries(id) {
    const confirmed = confirm("Biztosan törölni szeretnéd?");

    if (!confirmed) {
        return;
    }

    const res = await fetch(`/series/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        alert("Sikeres törlés!");
        fetchSeries();
    } else {
        alert("Hiba a törlés során!");
    }
}

// --- termék szerkesztése ---

// modal ablak mutatása, és a megfelelő id eltárolása a modal-on belül
async function editSeries(id) {
    console.log(id);
    const res = await (fetch(`/series/${id}`));
    const dataFromFetch = await res.json();

    const name = dataFromFetch[0].name;
    const price = dataFromFetch[0].price;
    const stock = dataFromFetch[0].stock;

    document.getElementById('seriesName').value = name;
    document.getElementById('seriesStock').value = stock;
    document.getElementById('seriesPrice').value = price;

    // ---
    // itt hozzáadjuk a termék id-ját a modal ablak attribútumaihoz
    // ---
    const modal = new bootstrap.Modal(document.getElementById('updateSeriesModal'));
    const seriesID = document.getElementById('updateSeriesModal');
    seriesID.setAttribute('data-seriesID', id);
    modal.show();
}

// a backend-el való kapcsolatfelvétel
async function updateSeriesData() {
    const modalElements = document.getElementById('updateSeriesModal');
    const id = modalElements.getAttribute('data-seriesID');
    const modal = bootstrap.Modal.getInstance(modalElements);

    const name = document.getElementById('seriesName').value;
    const price = document.getElementById('seriesPrice').value;
    const stock = document.getElementById('seriesStock').value;
    const image = document.getElementById('seriesImage').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('stock', stock);
    formData.append('image', image);

    const res = await fetch(`/series/${id}`, {
        method: "PUT",
        body: formData
    });

    if (res.ok) {
        modal.hide();
        alert("Sikeres módosítás!");
        fetchSeries();
        resetInput();
    }
    else {
        alert("Hiba a szerkesztés során!");
    }
}

// modal ablak beviteli mezőinek kiürítése
function resetInput() {
    document.getElementById('seriesName').value = null;
    document.getElementById('seriesPrice').value = null;
    document.getElementById('seriesStock').value = null;
}

// keresés a termékek között
document.getElementById('searchingForm').onsubmit = async function (event) {
    event.preventDefault();

    const searching = event.target.elements.searching.value;

    const res = await fetch('/searching', {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ searching })
    });

    const aruhaz = await res.json();

    if (aruhaz.length === 0) {
        document.getElementById('series-list').innerHTML = '<h3 class="text-center m-4">Nincs találat</h3>';
    } else {
        seriesDrawing(aruhaz);
    }
}

// termékek kirajzoltatása
function seriesDrawing(aruhaz) {
    let seriesHTML = '<h1 class="mt-2 mb-2">Termékek</h1>';
    for (let termek of aruhaz) {
        seriesHTML += `
            <div class="col-xl-3 col-md-4 col-sm-6 my-2">
                <div class="card bg-dark text-white my-2 h-100">
                    <div class="card-header">
                        <img src="/images/${termek.image}" alt="${termek.name}" title="${termek.name}" alt="${termek.stock}" title="${termek.stock}" class="img img-fluid img-thumbnail mx-auto d-block">
                    </div>
                    <div class="card-body">
                        <h3>${termek.name}</h3>
                        <h5>${termek.price}</h5>
                        <h5>${termek.stock}db</h5>
                    </div>
                    <div class="card-footer">
                        <button class="btn btn-outline-danger me-2" onclick="deleteSeries(${termek.seriesID})"><i class="fa-solid fa-trash"></i></button>
                        <button class="btn btn-warning" onclick="editSeries(${termek.seriesID})"><i class="fa-solid fa-pen"></i></button>
                    </div>
                </div>
            </div>
        `
    }

    document.getElementById('series-list').innerHTML = seriesHTML;
}
