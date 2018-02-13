function updateBarcode() {
    

    var x = document.getElementsByClassName("barcodeValue");
    var i;
    for (i = 0; i < x.length; i++) {
       
        var barcodeValue  = x[i].value;
        var orderId = x[i].getAttribute("data-orderId");
        var barcode = new bytescoutbarcode128();
        barcode.valueSet(barcodeValue);
        barcode.setMargins(5, 5, 5, 5);
        barcode.setBarWidth(2);
        var width = barcode.getMinWidth();
        barcode.setSize(width, 115);

        var barcodeImage = document.getElementById('barcodeImage_'+orderId);
        barcodeImage.src = barcode.exportToBase64(width, 115, 0);


    }
}

function saveBarcode() {
    document.frmSaveBarcode.barcodeBase64.value = document.getElementById('barcodeImage').src;
    document.frmSaveBarcode.submit();
}

function Imprimir(a) {
    var b = document.getElementById(a).innerHTML, c = document.body.innerHTML;
    document.body.innerHTML = b, window.print(), document.body.innerHTML = c
}