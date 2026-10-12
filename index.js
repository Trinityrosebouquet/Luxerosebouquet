/* =====================================================
  PHONE NUMBER 555-555-5555
===================================================== */
const phoneInput = document.getElementById("contact-phone");

phoneInput.addEventListener("input", function () {
    let numbers = this.value.replace(/\D/g, "").slice(0, 10);

    if (numbers.length > 6) {
        this.value =
            numbers.slice(0, 3) + "-" +
            numbers.slice(3, 6) + "-" +
            numbers.slice(6);
    } else if (numbers.length > 3) {
        this.value =
            numbers.slice(0, 3) + "-" +
            numbers.slice(3);
    } else {
        this.value = numbers;
    }
});

/* =====================================================
   ZELLE POP UP
===================================================== */
function openZelleQR() {
    const modal = document.getElementById("zelle-qr-modal");

    if (modal) {
        modal.classList.add("active");
    }
}

function closeZelleQR() {
    const modal = document.getElementById("zelle-qr-modal");

    if (modal) {
        modal.classList.remove("active");
    }
}

/* =====================================================
   CASH APP POP UP
===================================================== */
function openCashAppQR() {
    const modal = document.getElementById("cashapp-qr-modal");

    if (modal) {
        modal.classList.add("active");
    }
}

function closeCashAppQR() {
    const modal = document.getElementById("cashapp-qr-modal");

    if (modal) {
        modal.classList.remove("active");
    }
}