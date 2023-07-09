var confirmBtn = document.getElementById("confirmBtn");
var cancelBtn = document.getElementById("cancelBtn");
var link = document.getElementById("cus_del_bt");

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

document.getElementById("cus_up_bt").addEventListener("click", function(){
    document.querySelector(".cus_update_popup").style.display = "flex";
});

document.getElementById("close_bt_4").addEventListener("click", function(){
    document.querySelector(".cus_update_popup").style.display = "none";
});