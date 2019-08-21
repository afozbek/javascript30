const panels = document.querySelectorAll(".panel");

function panelClickHandler() {
    panels.forEach(panel => {
        if (panel === this) {
            return;
        }
        panel.classList.remove("open");
    });

    this.classList.toggle("open");
}

/* Safari transitionend event.propertyName === flex */
/* Chrome + FF transitionend event.propertyName === flex-grow */
function toggleActiveHandler(e) {
    if (e.propertyName.includes("flex")) {
        this.classList.toggle("open-active");
    }
}

panels.forEach(panel => panel.addEventListener("click", panelClickHandler));
panels.forEach(panel =>
    panel.addEventListener("transitionend", toggleActiveHandler)
);
