const express = require("express");
const app = express();

// parse form data
app.use(express.urlencoded({ extended: true }));

// ✅ helper to prevent XSS
function escapeHTML(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// serve the HTML file directly
app.get("/", (req, res) => {
    res.sendFile("/var/www/html/index.html");
});

// handle form submission
app.post("/register", (req, res) => {
    console.log("🔥 DATA RECEIVED:", req.body);

    const { name, email, event } = req.body;

    // ✅ Validation
    if (!name || !email || !event) {
        return res.send(`<script>alert("All fields are required!"); window.history.back();</script>`);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.send(`<script>alert("Invalid email format!"); window.history.back();</script>`);
    }

    if (name.length < 2) {
        return res.send(`<script>alert("Name must be at least 2 characters long!"); window.history.back();</script>`);
    }

    // ✅ XSS detection (basic)
    const xssPattern = /<script.*?>.*?<\/script>|<.*?on\w+=.*?>/i;
    if (xssPattern.test(name) || xssPattern.test(email) || xssPattern.test(event)) {
        return res.send(`<script>alert("XSS attempt detected!"); window.history.back();</script>`);
    }

    // ✅ If everything is valid → proceed normally
    res.send(`
        <h2>Registration Successful</h2>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Event: ${event}</p>
    `);
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});

