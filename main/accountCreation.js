document.addEventListener("DOMContentLoaded", function () {
    let current_fs, next_fs; // Fieldsets
    let animating; // Flag to prevent quick multi-click glitches
  
    const form = document.getElementById("msform");
  
    // Store user data
    const userData = {
      account: {},
      personal: {},
      social: {}
    };
  
    // Button actions for "Next"
    document.querySelectorAll(".next").forEach(button => {
      button.addEventListener("click", function () {
        if (animating) return false;
        animating = true;
  
        current_fs = this.closest("fieldset");
        next_fs = current_fs.nextElementSibling;
  
        if (validateInputs(current_fs)) {
          // Save data from the current fieldset
          saveData(current_fs);
  
          // Show next fieldset
          current_fs.style.display = "none";
          next_fs.style.display = "block";
  
          animating = false;
        } else {
          alert("Please fill in all fields before proceeding!");
          animating = false;
        }
      });
    });
  
    // Save data to the `userData` object
    function saveData(fieldset) {
      const inputs = fieldset.querySelectorAll("input");
      inputs.forEach(input => {
        if (input.name) {
          if (fieldset.querySelector("h2").textContent === "Create your account") {
            userData.account[input.name] = input.value;
          } else if (fieldset.querySelector("h2").textContent === "Personal Details") {
            userData.personal[input.name] = input.value;
          } else if (fieldset.querySelector("h2").textContent === "Social Profiles") {
            userData.social[input.placeholder.toLowerCase()] = input.value;
          }
        }
      });
      // Store userData in localStorage
      localStorage.setItem("userData", JSON.stringify(userData));
    }
  
    // Validate inputs before moving to the next step
    function validateInputs(fieldset) {
      const inputs = fieldset.querySelectorAll("input");
      return Array.from(inputs).every(input => input.value.trim() !== "");
    }
  
    // Handle login action
    document.querySelector("input[value='Login']").addEventListener("click", function () {
      const email = form.querySelector("input[name='email']").value.trim();
      const password = form.querySelector("input[name='pass']").value.trim();
  
      const storedData = JSON.parse(localStorage.getItem("userData"));
  
      if (storedData && storedData.account.email === email && storedData.account.pass === password) {
        alert("Login successful!");
  
        // Redirect to dashboard or another page
        window.location.href = "./dss-gadget/dss-AI.html"; // Replace with your desired page
      } else {
        alert("Invalid email or password!");
      }
    });
  });
  