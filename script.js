// =========================
// DATA PRODUK
// =========================

const products = [
    {
        id: 1,
        nama: "Gentle Facial Wash",
        kategori: "cleanser",
        harga: 35000,
        icon: "fa-face-smile"
    },
    {
        id: 2,
        nama: "Low pH Cleanser",
        kategori: "cleanser",
        harga: 45000,
        icon: "fa-pump-soap"
    },
    {
        id: 3,
        nama: "Niacinamide Serum",
        kategori: "serum",
        harga: 65000,
        icon: "fa-droplet"
    },
    {
        id: 4,
        nama: "Hyaluronic Acid Serum",
        kategori: "serum",
        harga: 70000,
        icon: "fa-eye-dropper"
    },
    {
        id: 5,
        nama: "Ceramide Moisturizer",
        kategori: "moisturizer",
        harga: 55000,
        icon: "fa-jar"
    },
    {
        id: 6,
        nama: "Gel Moisturizer",
        kategori: "moisturizer",
        harga: 48000,
        icon: "fa-bottle-droplet"
    },
    {
        id: 7,
        nama: "Sunscreen SPF 50",
        kategori: "sunscreen",
        harga: 60000,
        icon: "fa-sun"
    },
    {
        id: 8,
        nama: "Sunscreen Gel",
        kategori: "sunscreen",
        harga: 52000,
        icon: "fa-cloud-sun"
    }
];


// =========================
// CART
// =========================

let cart = [];


// =========================
// FORMAT RUPIAH
// =========================

function formatRupiah(angka) {

    return "Rp " + angka.toLocaleString("id-ID");

}


// =========================
// TAMPILKAN PRODUK
// =========================

function tampilkanProduk(data) {

    $("#productGrid").empty();

    if (data.length === 0) {

        $("#productGrid").html(`
            <p style="grid-column: 1 / -1; text-align:center;">
                Produk tidak ditemukan.
            </p>
        `);

        return;
    }


    data.forEach(function(product) {

        $("#productGrid").append(`

            <div class="product-card">

                <div class="product-icon">
                    <i class="fa-solid ${product.icon}"></i>
                </div>

                <h3>${product.nama}</h3>

                <p class="product-category">
                    ${product.kategori}
                </p>

                <p class="product-price">
                    ${formatRupiah(product.harga)}
                </p>

                <button
                    class="add-cart-btn"
                    data-id="${product.id}">
                    <i class="fa-solid fa-cart-plus"></i>
                    Tambah ke Keranjang
                </button>

            </div>

        `);

    });

}


// =========================
// TAMBAH KE CART
// =========================

$(document).on("click", ".add-cart-btn", function() {

    const id = Number($(this).data("id"));

    const product = products.find(function(item) {
        return item.id === id;
    });


    const existingProduct = cart.find(function(item) {
        return item.id === id;
    });


    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            id: product.id,
            nama: product.nama,
            harga: product.harga,
            quantity: 1
        });

    }


    updateCartUI();

    showToast(product.nama + " ditambahkan ke keranjang");

});


// =========================
// UPDATE CART UI
// =========================

function updateCartUI() {

    $("#cartItems").empty();


    if (cart.length === 0) {

        $("#cartItems").html(`
            <p class="empty-cart">
                Keranjang masih kosong
            </p>
        `);

    } else {

        cart.forEach(function(item) {

            const subtotal = item.harga * item.quantity;

            $("#cartItems").append(`

                <div class="cart-item">

                    <div class="cart-item-info">

                        <h4>
                            ${item.nama}
                        </h4>

                        <p>
                            ${item.quantity} x
                            ${formatRupiah(item.harga)}
                        </p>

                    </div>

                    <div class="cart-item-right">

                        <strong>
                            ${formatRupiah(subtotal)}
                        </strong>

                        <br>

                        <button
                            class="remove-cart"
                            data-id="${item.id}">
                            Hapus
                        </button>

                    </div>

                </div>

            `);

        });

    }


    // =========================
    // HITUNG TOTAL JUMLAH
    // =========================

    const totalQuantity = cart.reduce(function(total, item) {

        return total + item.quantity;

    }, 0);


    $("#cartCount").text(totalQuantity);


    // =========================
    // HITUNG TOTAL HARGA
    // =========================

    let totalHarga = cart.reduce(function(total, item) {

        return total + (item.harga * item.quantity);

    }, 0);


    const totalSebelumDiskon = totalHarga;


    // =========================
    // DISKON 10%
    // =========================

    if (totalHarga > 100000) {

        const diskon = totalHarga * 0.1;

        totalHarga -= diskon;


        $("#cartTotal").html(`

            <small style="
                text-decoration: line-through;
                color: #999;
                display: block;
                margin-bottom: 3px;
            ">
                ${formatRupiah(totalSebelumDiskon)}
            </small>

            ${formatRupiah(totalHarga)}

        `);

    } else {

        $("#cartTotal").text(
            formatRupiah(totalHarga)
        );

    }

}


// =========================
// HAPUS PRODUK DARI CART
// =========================

$(document).on("click", ".remove-cart", function() {

    const id = Number($(this).data("id"));

    cart = cart.filter(function(item) {

        return item.id !== id;

    });


    updateCartUI();

    showToast("Produk dihapus dari keranjang");

});


// =========================
// BUKA CART
// =========================

$("#cartBtn").on("click", function() {

    $("#cartSidebar").addClass("active");

    $("#cartOverlay").addClass("active");

});


// =========================
// TUTUP CART
// =========================

$("#closeCart").on("click", function() {

    $("#cartSidebar").removeClass("active");

    $("#cartOverlay").removeClass("active");

});


$("#cartOverlay").on("click", function() {

    $("#cartSidebar").removeClass("active");

    $("#cartOverlay").removeClass("active");

});


// =========================
// FILTER KATEGORI
// =========================

$(".filter-btn").on("click", function() {

    $(".filter-btn").removeClass("active");

    $(this).addClass("active");


    const category = $(this).data("category");


    if (category === "all") {

        tampilkanProduk(products);

    } else {

        const filteredProducts = products.filter(function(product) {

            return product.kategori === category;

        });


        tampilkanProduk(filteredProducts);

    }

});


// =========================
// SEARCH PRODUK
// =========================

$("#searchInput").on("keyup", function() {

    const keyword = $(this).val().toLowerCase();


    const hasilPencarian = products.filter(function(product) {

        return product.nama.toLowerCase().includes(keyword);

    });


    tampilkanProduk(hasilPencarian);

});


// =========================
// CHECKOUT
// =========================

$("#checkoutBtn").on("click", function() {

    if (cart.length === 0) {

        showToast("Keranjang masih kosong");

        return;
    }


    $("#buyerModal").addClass("active");

});


// =========================
// TUTUP FORM PEMBELI
// =========================

$("#closeBuyerModal").on("click", function() {

    $("#buyerModal").removeClass("active");

});


// =========================
// VALIDASI DATA PEMBELI
// =========================

$("#buyerForm").on("submit", function(e) {

    e.preventDefault();


    const nama = $("#buyerName").val().trim();

    const alamat = $("#buyerAddress").val().trim();

    const noHP = $("#buyerPhone").val().trim();


    if (nama === "") {

        showToast("Nama harus diisi");

        return;
    }


    if (alamat === "") {

        showToast("Alamat harus diisi");

        return;
    }


    if (noHP === "") {

        showToast("No HP harus diisi");

        return;
    }


    // =========================
    // HITUNG JUMLAH BARANG
    // =========================

    const qty = cart.reduce(function(total, item) {

        return total + item.quantity;

    }, 0);


    // =========================
    // HITUNG TOTAL HARGA
    // =========================

    let totalHarga = cart.reduce(function(total, item) {

        return total + (item.harga * item.quantity);

    }, 0);


    // =========================
    // DISKON 10%
    // =========================

    if (totalHarga > 100000) {

        totalHarga -= totalHarga * 0.1;

    }


    // =========================
    // SIMPAN RIWAYAT
    // =========================

    simpanRiwayat(totalHarga, qty);


    // =========================
    // SELESAIKAN CHECKOUT
    // =========================

    $("#buyerModal").removeClass("active");

    $("#buyerForm")[0].reset();


    cart = [];

    updateCartUI();


    $("#cartSidebar").removeClass("active");

    $("#cartOverlay").removeClass("active");


    showToast(
        "Checkout berhasil! Terima kasih " + nama
    );

});


// =========================
// SIMPAN RIWAYAT
// =========================

function simpanRiwayat(total, qty) {

    const riwayat =
        JSON.parse(
            localStorage.getItem("riwayat")
        ) || [];


    riwayat.push({

        tanggal: new Date().toISOString(),

        total: total,

        qty: qty

    });


    localStorage.setItem(
        "riwayat",
        JSON.stringify(riwayat)
    );

}


// =========================
// TOAST
// =========================

function showToast(message) {

    $("#toast").text(message);

    $("#toast").addClass("show");


    setTimeout(function() {

        $("#toast").removeClass("show");

    }, 2500);

}

// =========================
// INISIALISASI
// =========================

$(document).ready(function() {

    tampilkanProduk(products);

    updateCartUI();

});