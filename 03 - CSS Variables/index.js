const inputs = document.querySelectorAll(".controls input");

function handleUpdate() {
    const suffix = this.dataset.sizing || "";

    document.documentElement.style.setProperty(
        `--${this.name}`,
        `${this.value + suffix}`
    );
}

inputs.forEach(input => {
    input.addEventListener("mousemove", handleUpdate);
    input.addEventListener("change", handleUpdate);
});

// this.dataset gets the data- attributes in html
