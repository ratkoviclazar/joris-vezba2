const hoteli = document.getElementById("hoteli");

async function ucitajHotele() {
  const response = await fetch(
    "https://joris.testmaster.fon.bg.ac.rs/api/hoteli"
  );
  const hotel = await response.json();

  hoteli.innerHTML = "";

  hotel.forEach((hotels) => {
    hoteli.innerHTML += `<option value="${hotels.id}">${hotels.naziv}</option>`;
  });
}
ucitajHotele();
async function ucitajSobe() {
  if (!hoteli.value) {
    sobeDiv.innerHTML = "";
    return;
  }
  const response = await fetch(
    `https://joris.testmaster.fon.bg.ac.rs/api/hoteli/${hoteli.value}`
  );

  const detaljiSobe = await response.json();

  console.log(detaljiSobe);

  const sobeDiv = document.getElementById("sobe");

  sobeDiv.innerHTML = "";

  detaljiSobe.sobe.forEach((soba) => {
    sobeDiv.innerHTML += `<option value="${soba.id}">${soba.naziv}</option>`;
  });
}
hoteli.addEventListener("change", ucitajSobe);

const rezervisi = document.getElementById("submit");

function proveraDugme(e) {
  e.preventDefault();

  const selectHotel = document.querySelector("#hoteli");

  const hotel = selectHotel.options[selectHotel.selectedIndex].text;

  const selectSobe = document.querySelector("#sobe");

  if (selectSobe.options.length == 0) {
    alert("Nema soba u izabranom hotelu");
    return;
  }

  const soba = selectSobe.options[selectSobe.selectedIndex].text;

  const datumOd = document.querySelector("#datumOd").value;

  const datumDo = document.querySelector("#datumDo").value;

  if (datumOd == "" || datumDo == "" || hotel == "" || soba == "") {
    alert("Morate popuniti sva polja");
    return false;
  }

  if (datumOd > datumDo) {
    alert("Datum od ne moze biti veci od datuma do");
    return false;
  }

  const tbody = document.querySelector(".t-body");

  let noviRed = tbody.insertRow();
  let celija1 = noviRed.insertCell(0);
  let celija2 = noviRed.insertCell(1);
  let celija3 = noviRed.insertCell(2);
  let celija4 = noviRed.insertCell(3);

  celija1.textContent = hotel;
  celija2.textContent = soba;
  celija3.textContent = datumOd;
  celija4.textContent = datumDo;

  return true;
}
rezervisi.addEventListener("click", proveraDugme);
