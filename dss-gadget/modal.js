// Get the modal and buttons
const categoryModal = document.getElementById("categoryModal");
const categoryBtn = document.getElementById("categoryBtn");
const closeModal = document.getElementById("closeModal");
const laptopCategory = document.getElementById("laptopCategory");

// Show the modal when "Category" is clicked
categoryBtn.addEventListener("click", function (event) {
  event.preventDefault();
  categoryModal.style.display = "block";
});

// Close the modal when the "close" button is clicked
closeModal.addEventListener("click", function () {
  categoryModal.style.display = "none";
});

// Close the modal when clicking outside of the modal content
window.addEventListener("click", function (event) {
  if (event.target === categoryModal) {
    categoryModal.style.display = "none";
  }
});
