// Data penjualan Glowies
const penjualan = [120000, 180000, 150000, 220000, 190000, 250000, 210000];

// Menampilkan tanggal hari ini
const tanggal = document.getElementById("tanggal");

if (tanggal) {
    tanggal.textContent = new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}

// Format angka menjadi Rupiah
function formatRupiah(angka) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(angka);
}

// Menghitung total penjualan
const totalPenjualan = penjualan.reduce((total, nilai) => total + nilai, 0);

const totalElement = document.getElementById("total-penjualan");

if (totalElement) {
    totalElement.textContent = formatRupiah(totalPenjualan);
}

// Menu sidebar
const menuItems = document.querySelectorAll(".sidebar a");

menuItems.forEach(function(menu) {
    menu.addEventListener("click", function() {
        menuItems.forEach(function(item) {
            item.classList.remove("active");
        });

        menu.classList.add("active");
    });
});

// Tombol notifikasi
const notifButton = document.getElementById("notif-button");

if (notifButton) {
    notifButton.addEventListener("click", function() {
        alert("Belum ada notifikasi baru dari Glowies!");
    });
}

// Tombol pencarian produk
const searchInput = document.getElementById("search-produk");

if (searchInput) {
    searchInput.addEventListener("input", function() {
        const kataKunci = searchInput.value.toLowerCase();
        const produk = document.querySelectorAll(".product-row");

        produk.forEach(function(item) {
            const namaProduk = item.textContent.toLowerCase();

            if (namaProduk.includes(kataKunci)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }
        });
    });
}