const paragraphs = document.querySelectorAll("article p");
const contentWrapper = document.querySelector(".content-wrapper");
const body = document.querySelector("body");
const product = null;

let isLocked = false;

window.addEventListener("scroll", () => {
  if (isLocked) return;

  if (paragraphs[3].getBoundingClientRect().top < window.innerHeight) {
    createSalesposter();
    body.style.overflow = "hidden";
    contentWrapper.style.filter = "blur(0.2rem)";
    isLocked = true;
  }
});

function fetchData() {
  fetch(" https://brukermarkedtest-5a3d.restdb.io/rest/products", {
    method: "GET",
    headers: {
      "x-api-key": "680b5f8972702c5e96b3d2a4",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      product = data[0];
    });
}

if (!isLocked) {
  fetchData();
}

function createSalesposter(product) {
  const salesposter = document.createElement("div");
  salesposter.id = "salesposter";
  salesposter.innerHTML = `
    <img src="../assets/illustration.png" alt="Trønder med bærbar pc"/>  
    <h3><strong>${product}: </strong> Pluss medlem for tilgang</h3>
    <p>Allerede medlem?</p>
    <button class="btn btn-secondary" onClick="signIn()">Logg in</button>
  `;
  document.body.appendChild(salesposter);
}

function signIn() {
  body.style.overflow = "visible";
  contentWrapper.style.filter = "blur(0)";
  document.querySelector("#salesposter").style.display = "none";
}
