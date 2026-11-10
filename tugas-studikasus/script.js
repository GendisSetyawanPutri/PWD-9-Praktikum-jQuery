const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    if (nama === "" || email === "" || pesan === "") {
        formMessage.textContent = "Semua kolom harus diisi terlebih dahulu.";
        formMessage.style.color = "#B54747";
        return;
    }

    formMessage.textContent = "Terima kasih, " + nama + "! Pesan kamu berhasil diperiksa.";
    formMessage.style.color = "#62845B";

    contactForm.reset();
});