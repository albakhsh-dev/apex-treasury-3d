const fs = require('fs');
const path = require('path');

function checkCars() {
  const carsPath = path.join(__dirname, '..', 'data', 'cars.json');
  const publicDir = path.join(__dirname, '..', 'public');

  if (!fs.existsSync(carsPath)) {
    console.error('❌ cars.json not found at:', carsPath);
    process.exit(1);
  }

  const cars = JSON.parse(fs.readFileSync(carsPath, 'utf8'));
  console.log(`\n🔍 Validating cars.json (${cars.length} vehicles)...\n`);

  let hasErrors = false;
  const urlOwners = new Map(); // url -> array of carIds
  const duplicateIssues = [];
  const missingArrayIssues = [];
  const missingFileIssues = [];
  const underThreeImagesIssues = [];

  cars.forEach((car) => {
    // 1. Check thumbnail
    if (!car.thumbnail) {
      missingArrayIssues.push(`Car ${car.id} (${car.brand} ${car.model}): Missing thumbnail.`);
      hasErrors = true;
    } else {
      trackUrl(car.thumbnail, car.id);
      checkLocalFile(car.thumbnail, car.id, 'thumbnail');
    }

    // 2. Check images array
    if (!car.images || !Array.isArray(car.images) || car.images.length === 0) {
      missingArrayIssues.push(`Car ${car.id} (${car.brand} ${car.model}): Missing or empty images array.`);
      hasErrors = true;
    } else {
      if (car.images.length < 3) {
        underThreeImagesIssues.push(`Car ${car.id} (${car.brand} ${car.model}): Has only ${car.images.length} images (expected at least 3).`);
      }
      car.images.forEach((img, idx) => {
        trackUrl(img, car.id);
        checkLocalFile(img, car.id, `images[${idx}]`);
      });
    }

    // 3. Check 360 images if provided
    if (car.images360 && Array.isArray(car.images360)) {
      car.images360.forEach((img, idx) => {
        trackUrl(img, car.id);
        checkLocalFile(img, car.id, `images360[${idx}]`);
      });
    }
  });

  function trackUrl(url, carId) {
    if (!url) return;
    const base = url.split('?')[0];
    if (!urlOwners.has(base)) {
      urlOwners.set(base, new Set());
    }
    urlOwners.get(base).add(carId);
  }

  function checkLocalFile(urlPath, carId, field) {
    if (!urlPath || typeof urlPath !== 'string') return;
    // Check if it is a local relative URL starting with /
    if (urlPath.startsWith('/') && !urlPath.startsWith('//')) {
      const cleanPath = urlPath.split('?')[0];
      const fullPath = path.join(publicDir, cleanPath.replace(/^\//, ''));
      if (!fs.existsSync(fullPath)) {
        missingFileIssues.push(`Car ${carId} ${field}: Local file not found -> ${cleanPath}`);
        hasErrors = true;
      }
    }
  }

  // Evaluate duplicate cross-car URLs
  for (const [url, carIdsSet] of urlOwners.entries()) {
    const carIds = Array.from(carIdsSet);
    if (carIds.length > 1) {
      duplicateIssues.push(`Duplicate URL shared across ${carIds.length} cars: ${url}\n   Affected cars: ${carIds.join(', ')}`);
      hasErrors = true;
    }
  }

  // Report results
  if (missingArrayIssues.length > 0) {
    console.log('❌ Missing/Empty Image Arrays:');
    missingArrayIssues.forEach(msg => console.log('   •', msg));
    console.log('');
  }

  if (underThreeImagesIssues.length > 0) {
    console.log('⚠️ Cars with fewer than 3 images:');
    underThreeImagesIssues.forEach(msg => console.log('   •', msg));
    console.log('');
  }

  if (duplicateIssues.length > 0) {
    console.log('❌ Duplicate Image URLs shared across different cars:');
    duplicateIssues.forEach(msg => console.log('   •', msg));
    console.log('');
  }

  if (missingFileIssues.length > 0) {
    console.log('❌ Local image files that do not exist:');
    missingFileIssues.forEach(msg => console.log('   •', msg));
    console.log('');
  }

  if (hasErrors) {
    console.log('💥 Validation FAILED with errors above.\n');
    process.exit(1);
  } else {
    console.log('✅ Validation PASSED! All cars have unique images, valid paths, and no shared cross-car URLs.\n');
    process.exit(0);
  }
}

checkCars();
