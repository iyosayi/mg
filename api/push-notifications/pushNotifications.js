import webpush from 'web-push';
import app from '../server/app';

// const vapidKeys = webpush.generateVAPIDKeys();

// Prints 2 URL Safe Base64 Encoded Strings
const publicKey = process.env.PUBLIC_VAPID_KEY;
const privateKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
    'mailto:example@yourdomain.org',
    publicKey,
    privateKey
)

app.post('/subscribe', (req, res) => {
    // get push subcription object
    const subscription = req.body;

    // send a 201
    res.status(201).json({})

    // create payload 
    const payload = JSON.stringify({
        title: 'Push test'
    })

    // pass object into sendNotification
    webpush.sendNotification(subscription, payload).catch(err => console.error(err))

})



// non persistent

// if (Notification.permission === 'granted') {
//     showNotification();
//     // return;
// }

// if (Notification.permission === 'denied') {
//     Notification.requestPermission().then(permission => {
//         if (permission === 'granted') {
//             showNotification()
//         }
//     })
// }

// Notification.maxActions

// const notification = new Notification('title', {
//     body: 'Body text',
//     /* body text */
//     badge: '',
//     icon: '',
//     image: '',
//     /* images */
//     tag: '',
//     /* same name tags collapses, only latest will be shown on top */
//     renotify: false,
//     data: {

//     },
//     requireInteraction: false,
//     actions: [{
//         action: 'id',
//         /* actions is used in persistent notifications */
//         title: 'notif',
//         icon: '',

//     }]
// })

// notification.addEventListener('error', (evt) => {
//     console.log('There was a problem', evt)
// })

// notification.addEventListener('click', () => {
//     console.log('Notification clicked')
// })

// const showNotification = () => {
//     console.log("Show notification");
//     navigator.serviceWorker.getRegistration().then(function (reg) {
//         reg.showNotification(notification);
//     });
//     notification();
// }