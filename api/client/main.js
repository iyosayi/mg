function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

const vapidPublicKey = 'BHT6yKvj5f4LUUa5-0ZGs6DP3gc3Ui5WVyLBZyBGp0Y6Q7fDGh77NjIPtORvyptH-fAxRE915yLgVqwOkaTlStw';
const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
// const triggerPush = document.querySelector('.trigger-push');

if ('serviceWorker' in navigator && 'PushManager' in window) {
    console.log('Service Worker and Push are supported');
    triggerPushNotification().catch(err => console.error(err))
}

async function triggerPushNotification() {

    const register = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
    });

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedVapidKey,
    });

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json',
        },
    });

}