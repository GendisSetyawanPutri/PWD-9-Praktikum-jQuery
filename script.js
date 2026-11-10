<<<<<<< HEAD
// ===== 1. Mode gelap / terang =====

// Ambil tombol dari HTML berdasarkan id-nya
const tombolTema = document.getElementById("tombol-tema");

// Saat tombol diklik, tambah/hapus class "gelap" pada <body>
tombolTema.addEventListener("click", function () {
    document.body.classList.toggle("gelap");

    // Ubah tulisan tombol sesuai mode yang sedang aktif
    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "Mode terang";
    } else {
        tombolTema.textContent = "Mode gelap";
    }
});

// ===== 2. Pencarian proyek =====

=======
// ===== 1. Mode gelap dan terang =====

// Ambil tombol tema
const tombolTema = document.getElementById("tombol-tema");

// Periksa tema yang tersimpan
const temaTersimpan = localStorage.getItem("tema");

// Terapkan tema saat halaman dibuka
if (temaTersimpan === "gelap") {
    document.body.classList.add("gelap");
    tombolTema.textContent = "Mode terang";
} else {
    tombolTema.textContent = "Mode gelap";
}

// Fungsi mengganti tema
tombolTema.addEventListener("click", function () {

    document.body.classList.toggle("gelap");

    if (document.body.classList.contains("gelap")) {
        tombolTema.textContent = "Mode terang";
        localStorage.setItem("tema", "gelap");
    } else {
        tombolTema.textContent = "Mode gelap";
        localStorage.setItem("tema", "terang");
    }

});


// ===== 2. Pencarian proyek =====

// Ambil elemen HTML
>>>>>>> lama/main
const kotakCari = document.getElementById("cari");
const semuaKartu = document.querySelectorAll(".kartu");
const pesanKosong = document.getElementById("pesan-kosong");

<<<<<<< HEAD
// Dijalankan setiap kali pengguna mengetik di kotak pencarian
kotakCari.addEventListener("input", function () {
    const kataKunci = kotakCari.value.toLowerCase();
    let adaYangCocok = false;

    // Periksa kartu satu per satu
    semuaKartu.forEach(function (kartu) {
        const isiKartu = kartu.textContent.toLowerCase();

        if (isiKartu.includes(kataKunci)) {
            kartu.style.display = "block"; // tampilkan
            adaYangCocok = true;
        } else {
            kartu.style.display = "none"; // sembunyikan
        }
    });

    // Tampilkan pesan jika tidak ada kartu yang cocok
=======
// Jalankan pencarian ketika pengguna mengetik
kotakCari.addEventListener("input", function () {

    const kataKunci = kotakCari.value.toLowerCase().trim();
    let adaYangCocok = false;

    // Periksa setiap kartu proyek
    semuaKartu.forEach(function (kartu) {

        const isiKartu = kartu.textContent.toLowerCase();

        if (isiKartu.includes(kataKunci)) {

            kartu.style.display = "block";
            adaYangCocok = true;

        } else {

            kartu.style.display = "none";

        }

    });

    // Tampilkan pesan jika proyek tidak ditemukan
>>>>>>> lama/main
    if (adaYangCocok) {
        pesanKosong.style.display = "none";
    } else {
        pesanKosong.style.display = "block";
    }
<<<<<<< HEAD
=======

>>>>>>> lama/main
});