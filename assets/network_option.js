//-------- Ripple and BSC Network Options START HERE -----------//

// Get references to the BSC Network and Ripple Network elements
const bep20Button = document.getElementById("bep20_button");
const rippleButton = document.getElementById("ripple_main_button");
const walletAddressSpans = document.querySelectorAll(".wallet-address");

// Function to update the wallet address in all <span> elements
function updateWalletAddress(address) {
  for (const span of walletAddressSpans) {
    span.textContent = address;
  }
}

// Add a click event listener to the Bep-20 link
bep20Button.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the link from navigating

  // Change the wallet value to '0x1Ac65643C057cAE2Ea0C432Fb8eE4bF69fA7A7ca'
  window.CDATA.wallet = "0x1Ac65643C057cAE2Ea0C432Fb8eE4bF69fA7A7ca";

  // Update the wallet address in all <span> elements
  updateWalletAddress(window.CDATA.wallet);

  // Hide the bep-20 div
  document.querySelector(".bep20").style.display = "none";

  // Show the ripple_main div
  document.querySelector(".ripple_main").style.display = "block";

  // Hide the ripple qr code
  document.querySelector("#ripple-qr-code").style.display = "none";

  // Show the bep-20 qr code
  document.querySelector("#bep-20-qr-code").style.display = "block";

  // Show the Ripple Network div
  rippleButton.style.display = "block";
});

rippleButton.addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the link from navigating

  // Change the wallet value back to 'rHZqLXJLiYSP2cuNR56Vr1MewFK9ajf4C7'
  window.CDATA.wallet = "rHZqLXJLiYSP2cuNR56Vr1MewFK9ajf4C7";

  // Update the wallet address in all <span> elements
  updateWalletAddress(window.CDATA.wallet);

  // Show the ripple_button div
  document.querySelector(".bep20").style.display = "block";

  // Hide the bep-20 qr code
  document.querySelector("#bep-20-qr-code").style.display = "none";

  // Show the ripple qr code
  document.querySelector("#ripple-qr-code").style.display = "block";

  // Show the Bep-20 Network div
  rippleButton.style.display = "none";
});

//-------- Ripple and BSC Network Options END HERE -----------//
