const data = {
  firstName: 'Khaldoun',
  lastName: 'Test',
  email: 'info@americanlegendicecreamtruck.com',
  phone: '1234567890',
  address: '123 Test St',
  city: 'Boston',
  state: 'MA',
  zip: '02108',
  eventType: 'Birthday Party',
  eventDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days from now
  startTime: '14:00',
  guests: 50,
  packageId: null,
  packageType: 'custom',
  durationMins: 60,
  comments: 'This is an automated test booking'
};

fetch('http://localhost:3000/api/bookings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(json => {
  console.log('Booking API Response:', json);
  process.exit(0);
})
.catch(err => {
  console.error('Booking API Error:', err);
  process.exit(1);
});
