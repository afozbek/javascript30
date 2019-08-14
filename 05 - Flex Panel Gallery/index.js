const panels = document.querySelectorAll(".panel");

function panelClickHandler() {
    this.classList.toggle("open");
}

function toggleActiveHandler(e) {
    if (e.propertyName.includes("flex")) {
        this.classList.toggle("open-active");
    }
}

panels.forEach(panel => panel.addEventListener("click", panelClickHandler));
panels.forEach(panel =>
    panel.addEventListener("transitionend", toggleActiveHandler)
);
