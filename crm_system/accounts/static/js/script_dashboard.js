document.getElementById("create_customer").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "flex";
    var inputElement = document.getElementById("id_name");
    inputElement.placeholder = "Customer Name";

    var inputElement = document.getElementById("id_phone");
    inputElement.placeholder = "Phone";

    var inputElement = document.getElementById("id_email");
    inputElement.placeholder = "Email";
});

document.getElementById("close_bt").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
});

// order form script start here

document.getElementById("create_order").addEventListener("click", function(){
    document.querySelector(".popup_2").style.display = "flex";
});

document.getElementById("close_bt_2").addEventListener("click", function(){
    document.querySelector(".popup_2").style.display = "none";
});

//remove order script

var links = document.querySelectorAll("[id^='remove_bt-']");
var confirmBtn = document.getElementById("confirmBtn");
var cancelBtn = document.getElementById("cancelBtn");

for (var i = 0; i < links.length; i++) {
  var link = links[i];

  link.addEventListener("click", function(event) {
    event.preventDefault();

    var confirmationModal = new bootstrap.Modal(document.getElementById("confirmationModal"));

    confirmationModal.show();
    var clickedButtonId = this.id;

    confirmBtn.addEventListener("click", function() {
        var relatedLink = document.getElementById(clickedButtonId);
        window.location.href = relatedLink.href;
    });

    cancelBtn.addEventListener("click", function() {
        confirmationModal.hide();
    });
  });
}

//remove order script

var links = document.querySelectorAll("[id^='update_bt-']");
var options_cus = document.getElementById("id_customer").options;
var options_pro = document.getElementById("id_product").options;
var options_sta = document.getElementById("id_status").options; 
//var primary_keyInput = document.getElementById("update_pk");

for (var i = 0; i < links.length; i++) {
    var link = links[i];
  
    link.addEventListener("click", function(event) {
      event.preventDefault();
  
      var clickedButtonId = this.id;
      var primary_key = clickedButtonId.split("-")[1];
      var djangoLink = "order/getdata/" + primary_key;
  
      fetch(djangoLink)
        .then(response => response.json())
        .then(data => {
            console.log(data["customer"]);
            for (var i = 0; i < options_cus.length; i++) {
                if (data["customer"] === null){
                    options_cus[i].selected = true;
                    break;
                }
                else{
                    if ((options_cus[i].innerText === data["customer"]) && (data["customer"] !== null)) {
                        options_cus[i].selected = true;
                        break;
                    }
                }
            }
            for (var i = 0; i < options_pro.length; i++) {
                if (options_pro[i].innerText === data["product"]) {
                    options_pro[i].selected = true;
                    break;
                }
            }
            for (var i = 0; i < options_sta.length; i++) {
                if (options_sta[i].innerText === data["status"]) {
                    options_sta[i].selected = true;
                    break;
                }
            }

            var hiddenInput = document.getElementById("update_pk");
            hiddenInput.value = primary_key;

            document.querySelector(".popup_update_order").style.display = "flex";
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  }
  

document.getElementById("close_bt_3").addEventListener("click", function(){
    document.querySelector(".popup_update_order").style.display = "none";
});

