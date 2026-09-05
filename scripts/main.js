initConversionModule();
initPathModule();

/* CURSOR */
const cursor = document.getElementById("cursor");
const swordNormal = "./assets/cursor/diamond-sword-cursor.png";
const swordStrong = "./assets/cursor/diamond-sword-pointer.png";

let currentImg = swordNormal;

document.addEventListener("mousemove", e => {
    const {clientX: x, clientY: y} = e;

    // Position
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";

    const buffer = 64;
    const nearRight = x > window.innerWidth - buffer;
    const nearBottom = y > window.innerHeight - buffer;

    if (nearRight && nearBottom) {
        cursor.style.transform = "translate(-100%, -100%) scale(-1, -1)";
    } else if (nearRight) {
        cursor.style.transform = "translate(-100%, 0) scaleX(-1)";
    } else if (nearBottom) {
        cursor.style.transform = "translate(0, -100%) scaleY(-1)";
    } else {
        cursor.style.transform = "translate(0, 0) rotate(0)";
    }
});

document.addEventListener("mouseleave", () => {
    cursor.style.opacity = "0";
});

document.addEventListener("mouseenter", () => {
    cursor.style.opacity = "1";
});

function setCursorImage(img) {
    if (currentImg !== img) {
        cursor.style.background = `url(${img}) no-repeat center/contain`;
        currentImg = img;
    }
}

document.querySelectorAll("a, button, input, textarea, select").forEach(el => {
    el.addEventListener("mouseenter", () => setCursorImage(swordStrong));
    el.addEventListener("mouseleave", () => setCursorImage(swordNormal));
});