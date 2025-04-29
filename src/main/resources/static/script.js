// ======= DARK MODE TOGGLE =======
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const toggleText = document.querySelector('.toggle-text');

function setTheme(isDark) {
    if (isDark) {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        toggleText.textContent = 'Light Mode';
        localStorage.setItem('theme', 'dark');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        toggleText.textContent = 'Dark Mode';
        localStorage.setItem('theme', 'light');
    }
}

// Restore saved theme on page load
window.addEventListener('DOMContentLoaded', () => {
    const theme = localStorage.getItem('theme');
    const isDark = theme === 'dark';
    toggleSwitch.checked = isDark;
    setTheme(isDark);

    // Also initialize doctor cards and form listener
    generateDoctorCards();
    setupContactFormValidation();
});

// Toggle theme on checkbox change
toggleSwitch.addEventListener('change', function () {
    setTheme(this.checked);
});

// ======= NAVIGATION SLIDE =======
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        navLinks.forEach((link, index) => {
            link.style.animation = link.style.animation ? '' :
                `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        });
        burger.classList.toggle('toggle');
    });
};
navSlide();

// ======= DOCTOR CARD GENERATOR =======
// const doctorsContainer = document.querySelector('.doctors-container');

const indianDoctors = [
    { name: "Dr. Arjun Sharma", specialty: "Cardiologist", experience: 15, ratings: 4.9, patients: 1500 },
    { name: "Dr. Priya Patel", specialty: "Dermatologist", experience: 8, ratings: 4.7, patients: 1200 },
    { name: "Dr. Vikram Singh", specialty: "Neurologist", experience: 12, ratings: 4.8, patients: 950 },
    { name: "Dr. Neha Verma", specialty: "Pediatrician", experience: 10, ratings: 4.9, patients: 2000 }
];

// Ensure this script runs after DOM is loaded
const doctorsContainer = document.querySelector('.doctors-container');

async function generateDoctorCards() {
    if (!doctorsContainer) return;

    // Array of doctor images (ensure these images exist in your 'doctor-images' folder)
    const doctorImages = [
        'd1.jpg', 'd2.jpg', 'd3.jpg', 'd4.jpg',
        'd5.jpg', 'd6.jpg', 'd7.jpg', 'd8.jpg'
    ];

    // Shuffle the images for random but unique assignment
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    const shuffledImages = shuffleArray([...doctorImages]);

    // Clear any previous content
    doctorsContainer.innerHTML = '';

    try {

        const res = await fetch("http://localhost:9090/api/doctors");
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const doctors = await res.json();
        console.log(doctors); // Log the fetched data to check if it's correct

        // const res = await fetch("http://localhost:8080/api/doctors ");
        // if (!res.ok) {
        //     throw new Error(`HTTP error! Status: ${res.status}`);
        // }
        // const doctors = await res.json();

        if (!Array.isArray(doctors) || doctors.length === 0) {
            doctorsContainer.innerHTML = `
                <div class="error-message">
                    <p>No doctors available at the moment.</p>
                </div>
            `;
            return;
        }

        doctors.forEach((doctor, index) => {
            const imagePath = `doctor-images/${shuffledImages[index % shuffledImages.length]}`;
            const doctorCard = document.createElement('div');
            doctorCard.classList.add('doctor-card');
            doctorCard.innerHTML = `
                <img class="doctor-img" src="${imagePath}" alt="${doctor.name}">
                <div class="doctor-info">
                    <h3>${doctor.name}</h3>
                    <h4>${doctor.specialty}</h4>
                    <div class="doctor-stats">
                        <div class="stat">
                            <span>${doctor.experience}</span>
                            <small>Years</small>
                        </div>
                        <div class="stat">
                            <span>${doctor.patients}</span>
                            <small>Patients</small>
                        </div>
                        <div class="stat">
                            <span>${doctor.ratings}</span>
                            <small>Ratings</small>
                        </div>
                    </div>
                    <div class="doctor-actions">
                        <button class="btn primary-btn">Consult Now</button>
                        <button class="btn secondary-btn">View Profile</button>
                    </div>
                </div>
            `;
            doctorsContainer.appendChild(doctorCard);
        });
    } catch (error) {
        console.error("Failed to fetch doctors:", error);
        doctorsContainer.innerHTML = `
            <div class="error-message">
                <p>Unable to load doctor information. Please try again later.</p>
            </div>
        `;
    }
}



// ======= CONTACT FORM VALIDATION =======
// Contact form validation and submission
function setupContactFormValidation() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Collect the values from the contact form fields
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        // Basic validation
        if (!name || !email || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate phone number format (Indian phone number)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid Indian phone number');
            return;
        }

        // Send data to backend
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, phone, message }),
            });

            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }

            const result = await response.text();
            alert(result); // Assuming backend sends a plain message
            contactForm.reset(); // Clear form after successful submission
        } catch (error) {
            console.error("Fetch error:", error);
            alert('Failed to send message. Please try again later.');
        }
    });
}



