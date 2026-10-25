$(document).ready(function () {

    // DATA PRODUK
    const products = [
        { id: 1, nama: "Gentle Facial Wash", kategori: "cleanser", harga: 35000, icon: "fa-face-smile" },
        { id: 2, nama: "Low pH Cleanser", kategori: "cleanser", harga: 45000, icon: "fa-pump-soap" },
        { id: 3, nama: "Niacinamide Serum", kategori: "serum", harga: 65000, icon: "fa-droplet" },
        { id: 4, nama: "Hyaluronic Acid Serum", kategori: "serum", harga: 70000, icon: "fa-eye-dropper" },
        { id: 5, nama: "Ceramide Moisturizer", kategori: "moisturizer", harga: 55000, icon: "fa-jar" },
        { id: 6, nama: "Gel Moisturizer", kategori: "moisturizer", harga: 48000, icon: "fa-bottle-droplet" },
        { id: 7, nama: "Sunscreen SPF 50", kategori: "sunscreen", harga: 60000, icon: "fa-sun" },
        { id: 8, nama: "Sunscreen Gel", kategori: "sunscreen", harga: 52000, icon: "fa-cloud-sun" }
    ];

    let cart = [];
    let activeCategory = "semua";
    let toastTimeout;

    // FORMAT HARGA RUPIAH
    function formatRupiah(angka) {
        return "Rp " + angka.toLocaleString("id-ID");
    }
    // MENAMPILKAN PRODUK
    // EFEK JQUERY 1: fadeIn()
    function tampilkanProduk(data) {
        $("#productGrid").stop(true, true).hide().empty();

        if (data.length === 0) {
            $("#productGrid")
                .html('<p class="no-products">Produk tidak ditemukan.</p>')
                .fadeIn(300);
            return;
        }

        data.forEach(function (product) {
            const card = `
                <article class="product-card">
                    <div class="product-icon">
                        <i class="fa-solid ${product.icon}"></i>
                    </div>
                    <h3>${product.nama}</h3>
                    <p class="product-category">${product.kategori}</p>
                    <p class="product-price">${formatRupiah(product.harga)}</p>
                    <button class="add-cart-btn" type="button" data-id="${product.id}">
                        <i class="fa-solid fa-cart-plus"></i>
                        Tambah ke Keranjang
                    </button>
                </article>
            `;
            $("#productGrid").append(card);
        });
        $("#productGrid").fadeIn(350);
    }

    // FILTER KATEGORI DAN PENCARIAN
    function filterProduk() {
        const keyword = $("#searchInput").val().trim().toLowerCase();

        const hasil = products.filter(function (product) {
            const sesuaiKategori =
                activeCategory === "semua" ||
                product.kategori === activeCategory;
            const sesuaiNama =
                product.nama.toLowerCase().includes(keyword);
            return sesuaiKategori && sesuaiNama;
        });
        tampilkanProduk(hasil);
    }

    $(".filter-btn").on("click", function () {
        $(".filter-btn").removeClass("active");
        $(this).addClass("active");

        activeCategory = $(this).data("category");
        filterProduk();
    });

    $("#searchInput").on("input", function () {
        filterProduk();
    });

    // NAVIGASI TAB
    $(".tab-btn").on("click", function () {
        const tab = $(this).data("tab");

        $(".tab-btn")
            .removeClass("active")
            .attr("aria-selected", "false");

        $(this)
            .addClass("active")
            .attr("aria-selected", "true");

        $(".tab-panel").stop(true, true).hide().prop("hidden", true);

        $("#panel-" + tab)
            .prop("hidden", false)
            .fadeIn(250);
    });

    // KERANJANG
    function updateCartUI() {
        const container = $("#cartItems");
        container.empty();

        if (cart.length === 0) {
            container.html(
                '<p class="empty-message">Keranjang masih kosong.</p>'
            );
        } else {
            cart.forEach(function (item) {
                container.append(`
                    <div class="cart-item">
                        <div>
                            <h3>${item.nama}</h3>
                            <p>${formatRupiah(item.harga)} × ${item.quantity}</p>
                        </div>
                        <div class="cart-item-actions">
                            <button class="qty-btn decrease-qty"
                                type="button" data-id="${item.id}">−</button>
                            <strong>${item.quantity}</strong>
                            <button class="qty-btn increase-qty"
                                type="button" data-id="${item.id}">+</button>
                            <button class="remove-cart"
                                type="button" data-id="${item.id}">
                                <i class="fa-solid fa-trash"></i>
                            </button>
                        </div>
                    </div>
                `);
            });
        }

        const jumlah = cart.reduce(
            (total, item) => total + item.quantity, 0
        );
        const subtotal = cart.reduce(
            (total, item) => total + item.harga * item.quantity, 0
        );
        const diskon = subtotal > 100000 ? subtotal * 0.10 : 0;
        const total = subtotal - diskon;

        $("#cartCount").text(jumlah);
        $("#cartQty").text(jumlah);
        $("#cartSubtotal").text(formatRupiah(subtotal));
        $("#cartDiscount").text(formatRupiah(diskon));
        $("#cartTotal").text(formatRupiah(total));
    }

    // TAMBAH PRODUK KE KERANJANG
    $(document).on("click", ".add-cart-btn", function () {
        const id = Number($(this).data("id"));
        const product = products.find(item => item.id === id);
        const existing = cart.find(item => item.id === id);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push({
                id: product.id,
                nama: product.nama,
                harga: product.harga,
                quantity: 1
            });
        }
        updateCartUI();
        showToast(product.nama + " ditambahkan ke keranjang.");
    });

    // MENAMBAH DAN MENGURANGI JUMLAH
    $(document).on("click", ".increase-qty", function () {
        const id = Number($(this).data("id"));
        const item = cart.find(product => product.id === id);

        if (item) item.quantity++;
        updateCartUI();
    });

    $(document).on("click", ".decrease-qty", function () {
        const id = Number($(this).data("id"));
        const item = cart.find(product => product.id === id);

        if (!item) return;
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(product => product.id !== id);
        }
        updateCartUI();
    });

    // MENGHAPUS PRODUK
    $(document).on("click", ".remove-cart", function () {
        const id = Number($(this).data("id"));
        cart = cart.filter(item => item.id !== id);
        updateCartUI();
        showToast("Produk dihapus dari keranjang.");
    });

    // EFEK JQUERY 2: slideToggle()
    $("#cartBtn").on("click", function () {
        $("#overlay").stop(true, true).fadeIn(200);
        $("#cartPanel").stop(true, true).slideToggle(250);
        const sedangTerbuka =
            $("#cartPanel").attr("aria-hidden") === "false";
        $("#cartPanel").attr(
            "aria-hidden",
            sedangTerbuka ? "true" : "false"
        );
        $("body").toggleClass("no-scroll");
    });

    function tutupKeranjang() {
        $("#cartPanel").stop(true, true).slideUp(220);
        $("#overlay").stop(true, true).fadeOut(200);
        $("#cartPanel").attr("aria-hidden", "true");
        $("body").removeClass("no-scroll");
    }
    $("#closeCart, #overlay").on("click", tutupKeranjang);

    // CHECKOUT
    $("#checkoutBtn").on("click", function () {
        if (cart.length === 0) {
            showToast("Keranjang masih kosong.");
            return;
        }
        tutupKeranjang();
        $("#buyerModal")
            .css("display", "flex")
            .hide()
            .fadeIn(250)
            .attr("aria-hidden", "false");
        $("body").addClass("no-scroll");
    });

    function tutupForm() {
        $("#buyerModal").stop(true, true).fadeOut(200, function () {
            $(this).attr("aria-hidden", "true");
        });
        $("body").removeClass("no-scroll");
    }
    $("#closeBuyerModal").on("click", tutupForm);
    $("#buyerModal").on("click", function (event) {
        if (event.target === this) {
            tutupForm();
        }
    });

    // VALIDASI DENGAN JQUERY VALIDATION PLUGIN
    $("#buyerForm").validate({
        rules: {
            buyerName: {
                required: true,
                minlength: 3
            },
            buyerEmail: {
                required: true,
                email: true
            },
            buyerPhone: {
                required: true,
                digits: true,
                minlength: 10,
                maxlength: 15
            },
            buyerAddress: {
                required: true,
                minlength: 8
            },
            buyerCity: {
                required: true,
                minlength: 2
            },
            paymentMethod: {
                required: true
            }
        },
        messages: {
            buyerName: {
                required: "Nama lengkap wajib diisi.",
                minlength: "Nama minimal 3 karakter."
            },
            buyerEmail: {
                required: "Email wajib diisi.",
                email: "Masukkan alamat email yang valid."
            },
            buyerPhone: {
                required: "Nomor HP wajib diisi.",
                digits: "Nomor HP harus berupa angka.",
                minlength: "Nomor HP minimal 10 angka.",
                maxlength: "Nomor HP maksimal 15 angka."
            },
            buyerAddress: {
                required: "Alamat wajib diisi.",
                minlength: "Alamat minimal 8 karakter."
            },
            buyerCity: {
                required: "Kota/kabupaten wajib diisi.",
                minlength: "Nama kota minimal 2 karakter."
            },
            paymentMethod: {
                required: "Silakan pilih metode pembayaran."
            }
        },

        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        submitHandler: function (form) {
            const jumlah = cart.reduce(
                (total, item) => total + item.quantity, 0
            );
            const subtotal = cart.reduce(
                (total, item) => total + item.harga * item.quantity, 0
            );
            const diskon = subtotal > 100000 ? subtotal * 0.10 : 0;
            const total = subtotal - diskon;
            const riwayat =
                JSON.parse(localStorage.getItem("riwayat")) || [];

            riwayat.push({
                tanggal: new Date().toLocaleString("id-ID"),
                nama: $("#buyerName").val().trim(),
                email: $("#buyerEmail").val().trim(),
                nomorHP: $("#buyerPhone").val().trim(),
                alamat: $("#buyerAddress").val().trim(),
                kota: $("#buyerCity").val().trim(),
                metodePembayaran: $("#paymentMethod").val(),
                jumlahProduk: jumlah,
                total: total
            });

            localStorage.setItem("riwayat", JSON.stringify(riwayat));
            cart = [];
            updateCartUI();
            form.reset();
            $("#buyerForm").validate().resetForm();
            tutupForm();
            showToast(
                "Checkout berhasil disimulasikan. Total: " +
                formatRupiah(total)
            );
            return false;
        }
    });

    // EFEK JQUERY 3: animate()
    $("#heroArt").css({
        opacity: 0,
        marginLeft: "25px"
    }).animate({
        opacity: 1,
        marginLeft: "0px"
    }, 700);

    // NOTIFIKASI DENGAN fadeIn() DAN fadeOut()
    function showToast(message) {
        clearTimeout(toastTimeout);

        $("#toast")
            .stop(true, true)
            .text(message)
            .fadeIn(180);
        toastTimeout = setTimeout(function () {
            $("#toast").fadeOut(250);
        }, 2600);
    }

    // MENJALANKAN TAMPILAN AWAL
    tampilkanProduk(products);
    updateCartUI();
});