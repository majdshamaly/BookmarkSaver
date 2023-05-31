/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
const myDropdown = document.getElementById("myDropdown");
const dropbtn = document.querySelector(".dropbtn");
const bookmarksContainer = document.querySelector(".bookmarksContainer");
const noBookmark = document.querySelector(".noBookmark");
const addBookmark = document.querySelector(".addBookmark");
const bookmarkes = document.querySelector(".bookmarkes");
const bookmarkForm = document.querySelector(".bookmarkForm");
const form = document.querySelector(".form");
const close = document.querySelector(".close");
console.log("hi");
let bookmarkDetails;
if (localStorage.getItem("bookmarkDetails")) {
  bookmarkDetails = JSON.parse(localStorage.getItem("bookmarkDetails"));
  noBookmark.style.display = "none";
} else {
  bookmarkDetails = [];
}

console.log(bookmarkDetails);
dropbtn.addEventListener("click", () => {
  if (myDropdown.style.display === "none") {
    myDropdown.style.display = "block";
  } else {
    myDropdown.style.display = "none";
  }
});
const getData = () => {
  bookmarkDetails.forEach((element, index) => {
    const a = document.createElement("a");
    a.setAttribute("href", `https://${element.url}`);
    a.setAttribute("target", `_blank`);
    const bookmark = document.createElement("div");
    bookmark.classList.add("bookmark");
    const img = document.createElement("img");
    img.setAttribute("src", `${element.imgUrl}`);
    // img.setAttribute("alt", `NI`);
    const paragraph = document.createElement("p");
    paragraph.innerText = element.websiteName;
    const deleteIcon = document.createElement("span");
    deleteIcon.classList.add("material-symbols-outlined");
    deleteIcon.innerText = "delete";
    a.appendChild(paragraph);
    bookmark.setAttribute("id", index);
    bookmark.appendChild(deleteIcon);
    bookmark.appendChild(img);
    bookmark.appendChild(a);
    bookmarkes.appendChild(bookmark);
  });
};
addBookmark.addEventListener("click", () => {
  bookmarkes.style.display = "none";
  noBookmark.style.display = "none";
  bookmarkForm.style.display = "grid";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  bookmarkDetails = [
    ...bookmarkDetails,
    {
      id: Math.random(),
      websiteName: e.target[0].value,
      url: e.target[1].value,
      imgUrl: `https://${e.target[1].value}/favicon.ico`,
    },
  ];
  localStorage.setItem(`bookmarkDetails`, JSON.stringify(bookmarkDetails));
  bookmarkes.style.display = "grid";
  bookmarkForm.style.display = "none";
  location.reload();
});
close.addEventListener("click", () => {
  bookmarkes.style.display = "grid";
  bookmarkForm.style.display = "none";
});
bookmarkes.addEventListener("click", (e) => {
  if (e.target.tagName === "SPAN") {
    console.log('heeelo')
    const elementId = Array.from(e.target.parentElement.attributes[1].value);
    bookmarkDetails = bookmarkDetails.splice(elementId[0]);
    localStorage.setItem(`bookmarkDetails`, JSON.stringify(bookmarkDetails));
    location.reload();
  }
});

getData();



