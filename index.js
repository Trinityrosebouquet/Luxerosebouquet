/* =====================================================
   PHONE NUMBER 555-555-5555
===================================================== */

const phoneInput = document.getElementById("contact-phone");

if (phoneInput) {
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
}


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


/* =====================================================
   EMAILJS CONFIGURATION
===================================================== */

const EMAILJS_PUBLIC_KEY = "ZI27NMtd_V2aKGpi1";

const EMAILJS_SERVICE_ID = "service_iur82qk";

const EMAILJS_TEMPLATE_ID = "template_ocmtkhk";

const EMAILJS_CONFIRMATION_TEMPLATE_ID = "template_pu1iveb";


/* =====================================================
   CONTACT FORM EMAILJS
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("contact-page-form");

    const submitButton = document.getElementById(
        "contact-page-submit-btn"
    );

    if (!form || !submitButton) return;

    if (typeof emailjs === "undefined") {
        console.error("EmailJS library is not loaded.");
        return;
    }

    emailjs.init({
        publicKey: EMAILJS_PUBLIC_KEY
    });

    let isSubmitting = false;

    form.addEventListener("submit", async (event) => {

        event.preventDefault();

        if (isSubmitting) return;

        if (!form.reportValidity()) return;

        isSubmitting = true;

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const occasionSelect = document.getElementById(
            "contact-occasion"
        );

        const templateParams = {

            name: document.getElementById("contact-name").value.trim(),

            email: document.getElementById("contact-email").value.trim(),

            phone: document.getElementById("contact-phone").value.trim(),

            occasion: occasionSelect.value
                ? occasionSelect.selectedOptions[0].text
                : "Not specified",

           address: document.getElementById("contact-address").value.trim() || "Not provided",

            message: document.getElementById("contact-message").value.trim()

        };

        try {

            /* =====================================
               SEND BUSINESS NOTIFICATION
            ===================================== */

            await emailjs.send(
                EMAILJS_SERVICE_ID,
                EMAILJS_TEMPLATE_ID,
                templateParams
            );

            console.log("Business notification sent.");

            /* =====================================
               SEND CUSTOMER CONFIRMATION
            ===================================== */

            try {

                await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_CONFIRMATION_TEMPLATE_ID,
                    templateParams
                );

                console.log("Customer confirmation sent.");

            } catch (confirmationError) {

                console.error(
                    "Customer confirmation failed:",
                    confirmationError
                );

            }

            /* =====================================
               REDIRECT AFTER SUCCESS
            ===================================== */

            window.location.href = "thank-you.html";

        } catch (error) {

            console.error("EmailJS Error:", error);

            alert(
                "Your message could not be sent. Please try again."
            );

        } finally {

            isSubmitting = false;

            submitButton.disabled = false;

            submitButton.innerHTML =
                "Send Message <span>→</span>";

        }

    });

});
