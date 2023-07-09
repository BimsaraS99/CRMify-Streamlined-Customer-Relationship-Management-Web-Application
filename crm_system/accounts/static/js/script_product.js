document.getElementById("create_pro").addEventListener("click", function(){
    document.querySelector(".popup_product").style.display = "flex";

    var inputElement = document.getElementById("id_name");
    inputElement.placeholder = "Product Name";

    var inputElement = document.getElementById("id_price");
    inputElement.placeholder = "Price";

    var inputElement = document.getElementById("id_description");
    inputElement.placeholder = "Product Description";
});

document.getElementById("close_bt_pro").addEventListener("click", function(){
    document.querySelector(".popup_product").style.display = "none";
});
