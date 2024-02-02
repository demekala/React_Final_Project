function submitForm() {
  const form = document.getElementById("checkoutForm");

  if (form.checkValidity()) {
    alert("Order placed successfully!");
    location.href = "http://127.0.0.1:5500/View/store.html";
    //form.reset();
  } else {
    alert("Please fill in all required fields.");
  }
}
