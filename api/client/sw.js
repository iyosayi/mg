self.addEventListener('push', event => {
    const data = event.data.json();
    console.log('Got push', data);
    self.registration.showNotification(data.title, {
      body: 'Yay it works!',
    });
  });