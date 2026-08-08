// Initialize Lucide Icons
lucide.createIcons();

// 1. Floating Petals Animation
const petalsContainer = document.getElementById('petals-container');
const petalCount = 15;

for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';
    const size = Math.random() * 15 + 10; // 10px to 25px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${Math.random() * 6 + 8}s`; // 8s to 14s
    petal.style.animationDelay = `${Math.random() * 5}s`;
    petalsContainer.appendChild(petal);
}

// 2. Countdown Timer Target: November 11, 2026
const targetDate = new Date('November 11, 2026 10:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('cd-days').innerText = days < 10 ? '0' + days : days;
        document.getElementById('cd-hours').innerText = hours < 10 ? '0' + hours : hours;
        document.getElementById('cd-minutes').innerText = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById('cd-seconds').innerText = seconds < 10 ? '0' + seconds : seconds;
    } else {
        document.getElementById('cd-days').innerText = '00';
        document.getElementById('cd-hours').innerText = '00';
        document.getElementById('cd-minutes').innerText = '00';
        document.getElementById('cd-seconds').innerText = '00';
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// 3. In-Memory RSVP Handling & Wish Board Update
function handleRSVP(e) {
    e.preventDefault();
    const name = document.getElementById('guestName').value;
    const attendance = document.getElementById('attendance').value;
    const message = document.getElementById('guestMessage').value;

    // Show success state
    document.getElementById('rsvpForm').classList.add('hidden');
    document.getElementById('rsvpSuccess').classList.remove('hidden');

    // If guest left a message, add it to wishes section live
    if (message && message.trim() !== "") {
        const wishesContainer = document.getElementById('wishesContainer');
        const wishCard = document.createElement('div');
        wishCard.className = 'glass-card p-5 rounded-2xl border border-pastel-200 shadow-sm transition-all duration-500 transform translate-y-2';
        wishCard.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-serif font-bold text-pastel-dark">${escapeHtml(name)}</h4>
                <span class="text-[10px] text-pastel-rose font-medium bg-pastel-100 px-2 py-0.5 rounded-full">${attendance === 'Joyfully Accepts' ? 'Attending' : 'Guest'}</span>
            </div>
            <p class="text-xs text-gray-600 italic">"${escapeHtml(message)}"</p>
        `;
        wishesContainer.prepend(wishCard);
    }
}

function resetRSVPForm() {
    document.getElementById('rsvpForm').reset();
    document.getElementById('rsvpForm').classList.remove('hidden');
    document.getElementById('rsvpSuccess').classList.add('hidden');
}

function escapeHtml(text) {
    return text.replace(/[&<>"']/g, function(m) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }[m];
    });
}

