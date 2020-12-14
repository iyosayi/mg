function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const vapidPublicKey = 'BCO6_Fng7fl3rOjEEOp-fJ3Q_3-qYcAMlIu0YcJB9JtLU4p5859rdNFMJ9vB3H_asfDkgcKMxgFxEvC7TlPKYm4';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
// const triggerPush = document.querySelector('.trigger-push');

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push are supported');
    triggerPushNotification().catch(err => console.error(err))
}

async function triggerPushNotification() {

    try {
        const register = await navigator.serviceWorker.register('/sw.js', {
            scope: '/'
        });

        if (register.installing) {
            console.log('Service worker installing');
            // reload
            window.location.reload();
        } else if (register.waiting) {
            console.log('Service worker installed');
        } else if (register.active) {
            console.log('Service worker active');
            const subscription = await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedVapidKey,
            });

            await fetch('/subscribe', {
                method: 'POST',
                body: JSON.stringify(subscription),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `vapid ${convertedVapidKey}`
                },
            });
        }

    } catch (err) {
        console.log("from main.js:", err.message)
    }

}