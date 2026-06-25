document.addEventListener("DOMContentLoaded", () => {

    const darkToggle = document.getElementById("darkToggle");

    if (!darkToggle) return;

    // load saved mode
    if (localStorage.getItem("darkMode") === "enabled") {
        document.body.classList.add("dark");
    }

    darkToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
        } else {
            localStorage.setItem("darkMode", "disabled");
        }
    });

});