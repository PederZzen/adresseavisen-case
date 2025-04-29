const paragraphs = document.querySelectorAll("article p");
const contentWrapper = document.querySelector(".content-wrapper");
const body = document.querySelector("body");
let isLocked = false;
let isMember = false;

let product = {
  name: "Digital",
  price_firstmonth: "1",
  price_full: "149",
};

function fetchData() {
  fetch("https://brukermarkedtest-5a3d.restdb.io/rest/products", {
    method: "GET",
    headers: {
      "x-api-key": "680b5f8972702c5e96b3d2a4",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      product = data[0];
      onScroll();
    })
    .catch((error) => {
      console.error("Feil ved henting av API, bruker fallback");
      onScroll();
    });
}

function onScroll() {
  window.addEventListener("scroll", () => {
    if (isLocked) return;
    if (paragraphs[3].getBoundingClientRect().top < window.innerHeight) {
      createSalesposter(product);
      body.style.overflow = "hidden";
      contentWrapper.style.filter = "blur(0.2rem)";
      isLocked = true;
    }
  });
}

fetchData();

function createSalesposter(product) {
  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);
  const salesposter = document.createElement("div");
  salesposter.id = "salesposter";
  salesposter.innerHTML = `
    <img src="../assets/illustration.png" alt="Trønder med bærbar pc"/>  
    <h3><span>${productName}: </span> Les med Pluss-tilgang</h3>
    <button class="btn btn-primary">${product.price_firstmonth} kr første måned</button>
    <small>Ordinær pris ${product.price_full},-/mnd</small>
    <ul>
      <li>Fri tilgang til Skinnvestpodden</li>
      <li>50% avslag på Inderøysodd</li>
      <li>Pluss mye, mye mer!</li>
    </ul>
    <div id="sign-in_container">
      <p>Allerede medlem?</p>
      <button class="btn btn-secondary" onClick="signIn()">Logg in</button>
    </div>
  `;
  document.body.appendChild(salesposter);
}

function signIn() {
  body.style.overflow = "visible";
  isMember = true;
  contentWrapper.style.filter = "blur(0)";
  document.querySelector("#salesposter").style.display = "none";
}
