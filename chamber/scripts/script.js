// Hamburger 
const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector("nav ul");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

//Footer 
document.getElementById("year").textContent = new Date().getFullYear();


document.getElementById("lastModified").textContent = document.lastModified;

// Fetch members.json
async function loadMembers() {
    try {
       const response = await fetch("data/members.json");
        const members = await response.json();
          displayMembers(members);
    } catch (err) {
          console.error("error loading:", err);
    }
}

function displayMembers(members) {
    const container = document.getElementById("members-container");
    container.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("member-card");

        card.innerHTML =
            `<img src="images/${member.image}" alt="${member.name}">
                <h2>${member.name}</h2>
                <p>${member.address}</p>
                <p>${member.phone}</p>
                <a href="${member.website}" target="_blank">Visit Website</a>
                <p class="membership">Membership: ${member.membership == 3 ? "Gold" : member.membership == 2 ? "Silver" : "Member"}</p>
                `;

                container.appendChild(card);
  });
}

// Toggle grid/list view
   document.getElementById("grid-view").addEventListener("click", () => {
       document.getElementById("members-container").classList.add("grid-view");
        document.getElementById("members-container").classList.remove("list-view");
});

document.getElementById("list-view").addEventListener("click", () => {
     document.getElementById("members-container").classList.add("list-view");
     document.getElementById("members-container").classList.remove("grid-view");
});

    loadMembers();