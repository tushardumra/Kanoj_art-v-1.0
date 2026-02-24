const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const menu = document.getElementById("menu_list");

function showMenu() {
  menu.style.display = "block";
  closeBtn.style.display = "block"
  menuBtn.style.display = "none";
}

function closeMenu() {
  menu.style.display = "none";
  closeBtn.style.display = "none";
  menuBtn.style.display = "block";
}