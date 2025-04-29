const paragraphs = document.querySelectorAll("article p");
const contentWrapper = document.querySelector(".content-wrapper");
const body = document.querySelector("body");

let isMember = false;

// Fallback-produkt hvis API-kallet feiler
let product = {
  name: "Digital",
  price_firstmonth: "1",
  price_full: "149",
};

// Henter produktdata fra eksternt API
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
      activateScrollListener();
    })
    .catch((error) => {
      console.error("Feil ved henting av API, bruker fallback");
      activateScrollListener();
    });
}

// Aktiverer scroll-lås og viser salgsplakat dersom bruker ikke er medlem
function activateScrollListener() {
  window.addEventListener("scroll", () => {
    if (isMember) return;

    const triggerParagraph = paragraphs[3];
    const isVisible =
      triggerParagraph.getBoundingClientRect().top < window.innerHeight;

    if (isVisible) {
      showSalesPoster(product);
      body.style.overflow = "hidden";
      contentWrapper.style.filter = "blur(0.2rem)";
      isMember = true;
    }
  });
}

// Funksjon som snurrer bildet 360 grader hver gang noen trykker på en knapp
let rotation = 0;

function uselessFunction() {
  rotation += 360;
  const illustration = document.getElementById("salesposter_image");
  illustration.style.transform = `rotate(${rotation}deg)`;
  illustration.style.transition = "all .3s";
}

// Viser salgsplakat med produktinfo
function showSalesPoster(product) {
  const productName =
    product.name.charAt(0).toUpperCase() + product.name.slice(1);
  const salesPoster = document.createElement("div");
  salesPoster.id = "salesposter";

  salesPoster.innerHTML = `
    <img id="salesposter_image" src="../assets/illustration.png" alt="Trønder med bærbar pc"/>  
    <h3><span>${productName}:</span> Les med Pluss-tilgang</h3>
    <button class="btn btn-primary" onClick="uselessFunction()">${product.price_firstmonth} kr første måned</button>
    <small>Ordinær pris ${product.price_full},-/mnd</small>
    <ul>
      <li>Fri tilgang til Skinnvestpodden</li>
      <li>50% avslag på Inderøysodd</li>
      <li>Pluss mye, mye mer!</li>
    </ul>
    <div id="sign-in_container">
      <p>Allerede medlem?</p>
      <button class="btn btn-secondary" onClick="signIn()">Logg inn</button>
    </div>
  `;

  document.body.appendChild(salesPoster);
}

// Fjerner salgsplakat og låser opp artikkelen ved innlogging
function signIn() {
  body.style.overflow = "visible";
  contentWrapper.style.filter = "blur(0)";
  const salesPoster = document.querySelector("#salesposter");
  if (salesPoster) salesPoster.style.display = "none";
}

fetchData();
