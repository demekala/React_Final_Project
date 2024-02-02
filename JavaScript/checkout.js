function submitForm() {
  const form = document.getElementById("checkoutForm");

  if (form.checkValidity()) {
    alert("Order placed successfully!");
    location.href = "../View/store.html";
    //form.reset();
  } else {
    alert("Please fill in all required fields.");
  }
}
