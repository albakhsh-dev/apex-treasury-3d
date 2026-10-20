const fs = require('fs');
const path = require('path');

const carsPath = path.join(__dirname, '..', 'data', 'cars.json');
const cars = JSON.parse(fs.readFileSync(carsPath, 'utf8'));

const updated = cars.map((car) => {
  const newCar = { ...car };
  newCar.thumbnail = `/images/cars/${car.id}/1.jpg`;
  newCar.images = [
    `/images/cars/${car.id}/1.jpg`,
    `/images/cars/${car.id}/2.jpg`,
    `/images/cars/${car.id}/3.jpg`,
  ];
  // Remove mismatched 360 images so the detail view shows the car's multi-angle gallery
  delete newCar.images360;
  return newCar;
});

fs.writeFileSync(carsPath, JSON.stringify(updated, null, 2) + '\n', 'utf8');
console.log('Successfully updated data/cars.json with local dedicated image paths!');
