async function hashEmail(email) {
    const msg = new TextEncoder().encode(email.trim().toLowerCase());
    const hashBuffer = await crypto.subtle.digest("SHA-256", msg);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function postMessage() {
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    if (!email || !message) return;

    const hash = await hashEmail(email);
    const gravatarUrl = `https://www.gravatar.com/avatar/${hash}?s=50&d=identicon`;

    const container = document.createElement('div');
    container.className = 'link-block dark-block message';

    container.innerHTML = `
        <a>
            <div class="icon">
                <img src="${gravatarUrl}" alt="Gravatar">
            </div>
            <div class="text message-content">
                <p class="main">${email}</p>
                <p class="sub">${message}</p>
            </div>
        </a>
    `;

    document.getElementById('board').prepend(container);
    document.getElementById('email').value = '';
    document.getElementById('message').value = '';
}