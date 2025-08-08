document.addEventListener('DOMContentLoaded', () => {
    const clockElement = document.getElementById('clock');
    const desktop = document.getElementById('desktop');
    const windowTemplate = document.getElementById('window-template');
    let zIndexCounter = 1;

    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        clockElement.textContent = `${hours}:${minutes}`;
    }

    updateClock();
    setInterval(updateClock, 1000);

    function createWindow(appName) {
        const windowNode = windowTemplate.content.cloneNode(true);
        const newWindow = windowNode.querySelector('.window');

        newWindow.querySelector('.title').textContent = appName;
        newWindow.style.zIndex = zIndexCounter++;

        const windowBody = newWindow.querySelector('.window-body');

        if (appName === 'CloudBrowser') {
            windowBody.innerHTML = `
                <div class="browser-controls">
                    <button class="back">◀</button>
                    <button class="forward">▶</button>
                    <button class="refresh">↻</button>
                    <input type="text" class="address-bar" value="https://www.google.com/webhp?igu=1">
                </div>
                <iframe src="https://www.google.com/webhp?igu=1" class="browser-iframe"></iframe>
            `;
            // Note: Using a Google URL that is more iframe-friendly.
            // The standard google.com often has X-Frame-Options set to SAMEORIGIN.

            const iframe = newWindow.querySelector('.browser-iframe');
            const addressBar = newWindow.querySelector('.address-bar');

            newWindow.querySelector('.back').addEventListener('click', () => iframe.contentWindow.history.back());
            newWindow.querySelector('.forward').addEventListener('click', () => iframe.contentWindow.history.forward());
            newWindow.querySelector('.refresh').addEventListener('click', () => iframe.contentWindow.location.reload());

            addressBar.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    let url = addressBar.value;
                    if (!url.startsWith('http')) {
                        url = 'https://' + url;
                    }
                    iframe.src = url;
                }
            });
        } else {
            windowBody.innerHTML = `<p style="text-align: center; margin-top: 50px;">${appName} is under construction.</p>`;
        }

        desktop.appendChild(newWindow);

        makeDraggable(newWindow);

        newWindow.addEventListener('mousedown', () => {
            newWindow.style.zIndex = zIndexCounter++;
        });

        const closeButton = newWindow.querySelector('.close');
        closeButton.addEventListener('click', () => {
            newWindow.remove();
        });
    }

    function makeDraggable(element) {
        const header = element.querySelector('.window-header');
        let isDragging = false;
        let offsetX, offsetY;

        header.addEventListener('mousedown', (e) => {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.zIndex = zIndexCounter++;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            element.style.left = `${e.clientX - offsetX}px`;
            element.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }

    const icons = document.querySelectorAll('.desktop-icon');
    icons.forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const appName = icon.getAttribute('data-app');
            createWindow(appName);
        });
    });
});
