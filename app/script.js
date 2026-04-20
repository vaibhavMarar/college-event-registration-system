const form = document.getElementById("registrationForm");
const message = document.getElementById("message");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let event = document.getElementById("event").value;

    // Basic validation
    if (name === "" || email === "" || event === "") {
        message.style.color = "red";
        message.textContent = "All fields are required!";
        return;
    }

    // Simple email validation
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        message.style.color = "red";
        message.textContent = "Invalid email format!";
        return;
    }

    // Prevent XSS (basic sanitization)
    name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;");

    // Success message
    message.style.color = "green";
    message.textContent = `Registered successfully for ${event}!`;

    // Reset form
    form.reset();
});