/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering

Create the `showPage` function
accepts list array and page parameters
sets number of students to diplay per page dynamicly inserts student list items 
*/
const studentList = document.querySelector(".student-list");
const linkList = document.querySelector(".link-list");

function showPage(list, page) {
  let startI = page * 9 - 9;
  let endI = page * 9;
  if (endI > list.length) {
    endI = list.length;
  }
  studentList.innerHTML = "";
  let studentData = "";

  for (let i = startI; i < endI; i++) {
    studentData = `  
         <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.medium} alt="Profile Picture">
               <h3>${list[i].name.title} ${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>
      `;
    studentList.insertAdjacentHTML("beforeend", studentData);
  }
}

/*
Create the `addPagination` function
accepts list array parameter 
determines number of pages needed inserts page buttins to navigate between pages 
adds active class to current button
*/
function appendPagination(list) {
  let totalPages = Math.ceil(list.length / 9);
  linkList.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement("li");
    linkList.appendChild(li);
    const pageButton = document.createElement("button");
    pageButton.textContent = i;
    li.appendChild(pageButton);
  }
  linkList.children[0].firstElementChild.className = "active";

  linkList.addEventListener("click", (e) => {
    const button = e.target;
    if (e.target.tagName === "BUTTON") {
      activeButton(button);
      showPage(list, button.textContent);
    }
    function activeButton(button) {
      for (const btn of linkList.children) {
        btn.firstElementChild.className = "";
      }
      button.className = "active";
    }
  });
}

const header = document.querySelector(".header");
header.insertAdjacentHTML(
  "beforeend",
  `<p><label for="search" class="student-search">
  <span>Search by name</span>
  <input id="search" placeholder="Search by name...">
  <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label><p>`,
);

header.addEventListener("input", (e) => {
  const paginationDiv = document.querySelector(".pagination");
  let searchList = [];
  for (let i = 0; i < data.length; i++) {
    let firstName = data[i].name.first.toUpperCase();
    let lastName = data[i].name.last.toUpperCase();
    let searchName = e.target.value.toUpperCase();
    if (firstName.includes(searchName) || lastName.includes(searchName)) {
      searchList.push(data[i]);
    }
  }
  if (searchList.length === 0) {
    studentList.innerHTML = "";
    let studentData = `
         <li class="student-item cf">
            <h1>No Results!</h2>
         </li>
      `;
    studentList.insertAdjacentHTML("beforeend", studentData);
    paginationDiv.style.display = "none";
  } else {
    paginationDiv.style.display = "block";
    showPage(searchList, 1);
    addPagination(searchList);
  }
});

// Call functions to initiate page
showPage(data, 1);
appendPagination(data);
