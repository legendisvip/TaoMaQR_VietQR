var imgBox = document.getElementById("imgBox");
var qrImage = document.getElementById("qrImage");
var qrText1 = document.getElementById("qrText1");
var qrText2 = document.getElementById("qrText2");
var qrText3 = document.getElementById("qrText3");
var qrText4 = document.getElementById("qrText4");
var selectBank = document.getElementById("bankName");
var rules = document.getElementById("rules");

const inputNumber = document.getElementById("qrText1");
inputNumber.addEventListener("keyup", function() {
    const length = inputNumber.value.length;
    if (length > 19) {
        inputNumber.value = inputNumber.value.substring(0, 19);
    }
});

function validateNumber(value) {
    return /^[0-9]+$/.test(value);
}
document.getElementById("qrText1").addEventListener("input", function() {
    if (!validateNumber(this.value)) {
        this.value = "";
    }
});

const inputName = document.getElementById("qrText2");
inputName.addEventListener("keyup", function() {
    const length = inputName.value.length;
    if (length > 50) {
        inputName.value = inputName.value.substring(0, 50);
    }
});

const inputMoney = document.getElementById("qrText3");
inputMoney.addEventListener("keyup", function() {
    const length = inputMoney.value.length;
    if (length > 13) {
        inputMoney.value = inputMoney.value.substring(0, 13);
    }
});

function validateNumber(value) {
    return /^[0-9]+$/.test(value);
}
document.getElementById("qrText3").addEventListener("input", function() {
    if (!validateNumber(this.value)) {
        this.value = "";
    }
});

const inputInfo = document.getElementById("qrText4");
inputInfo.addEventListener("keyup", function() {
    const length = inputInfo.value.length;
    if (length > 99) {
        inputInfo.value = inputInfo.value.substring(0, 99);
    }
});

$('.modal-footer button').click(function() {
    if (!$('#rules').prop('checked')) {
      $('#rules').prop('checked', true);
    }
    $(this).closest('.modal').modal('hide');
});

const URL = "https://api.vietqr.io/v2/banks";
async function makeAPICall(){
    const result = await fetch(URL);
    const dataBank = await result.json();
    const listBanks = dataBank.data
    for (const bank of listBanks){
        document.getElementById("bankName").options.add(new Option(bank.shortName));
    }
}

function generateQR() {
    if (!rules.checked){
        alert("Bạn cần phải đồng ý với các điều khoản và điều kiện để tạo mã QR");
        return false;
    }
    if(selectBank.selectedIndex && qrText1.value.trim().length && qrText2.value.trim().length > 0){
        const bankId = selectBank.options[selectBank.selectedIndex].value;
        const accountNo = qrText1.value.trim();
        const accountName = qrText2.value.trim();
        qrImage.src = `https://img.vietqr.io/image/${bankId}-${accountNo}-print.png?accountName=${accountName}`;
        imgBox.classList.add("show-img");
    }
    if(selectBank.selectedIndex && qrText1.value.trim().length && qrText2.value.trim().length && qrText3.value.trim().length && qrText4.value.trim().length > 0){
        const bankId = selectBank.options[selectBank.selectedIndex].value;
        const accountNo = qrText1.value.trim();
        const accountName = qrText2.value.trim();
        const amount = qrText3.value.trim();
        const addInfo = qrText4.value.trim();
        // const url = `https://img.vietqr.io/image/${bankId}-${accountNo}-print.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
        // window.location.href = url;

        // qrImage.src = `https://img.vietqr.io/image/<BANK_ID>-<ACCOUNT_NO>-<TEMPLATE>.png?amount=<AMOUNT>&addInfo=<DESCRIPTION>&accountName=<ACCOUNT_NAME>`;
        qrImage.src = `https://img.vietqr.io/image/${bankId}-${accountNo}-print.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
        imgBox.classList.add("show-img");
    }
    // else{
    //     alert("Bạn cần phải đồng ý với các điều khoản và điều kiện và nhập đầy đủ thông tin để tạo mã QR");
    //     return false;
    // }
}


let slideIndex = 1;
showSlides(slideIndex);

setInterval(changeSlides, 5000);

function changeSlides() {
    plusSlides(1);
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("Slide");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}