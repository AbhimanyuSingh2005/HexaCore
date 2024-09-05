const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});
const aos = document.querySelectorAll(".aos");
aos.forEach((element) => {
    observer.observe(element);
});

const nav_active = document.querySelector(".active");
const nav_option = document.querySelector(".nav_option").querySelectorAll("li");
let about_li = "";
nav_option.forEach((option) => {
    if (option.textContent === "About")
        about_li = option;
});
// console.log(nav_option, about_li);
const nav_observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            nav_active.className = "";
            about_li.className = "active";
        } else {
            nav_active.className = "active";
            about_li.className = "";
        }
    });
});
document.querySelectorAll(".about").forEach(section => {
    nav_observer.observe(section);
});