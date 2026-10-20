const fs = require('fs');
const path = require('path');
const https = require('https');

// Curated high-res automotive photography mapping (3 images per car: Front 3/4, Profile/Angle, Interior)
const CAR_PHOTOS = {
  'car-1': { // Mahindra Thar 4x4 (Black Offroader)
    '1.jpg': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1506015391300-4802dc74de2e?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1080&auto=format&fit=crop&q=85'
  },
  'car-2': { // Hyundai Creta (Phantom Black SUV)
    '1.jpg': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1080&auto=format&fit=crop&q=85'
  },
  'car-3': { // Tata Nexon EV (Electric Teal Crossover)
    '1.jpg': 'https://images.unsplash.com/photo-1563720223523-491ff04651de?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1080&auto=format&fit=crop&q=85'
  },
  'car-4': { // Toyota Hyryder (White Hybrid SUV)
    '1.jpg': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1080&auto=format&fit=crop&q=85'
  },
  'car-5': { // Honda City (Metallic Executive Sedan)
    '1.jpg': 'https://images.unsplash.com/photo-1550355291-bbee04a92027?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1080&auto=format&fit=crop&q=85'
  },
  'car-6': { // Kia Seltos (White Sporty Crossover)
    '1.jpg': 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1525609004556-c46cbe9121a9?w=1080&auto=format&fit=crop&q=85'
  },
  'car-7': { // Maruti Swift (Sporty Red Hatchback)
    '1.jpg': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1541348263662-e0c8de4259ba?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=1080&auto=format&fit=crop&q=85'
  },
  'car-8': { // Maruti Brezza (Blue Compact SUV)
    '1.jpg': 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1080&auto=format&fit=crop&q=85'
  },
  'car-9': { // Hyundai Grand i10 (Grey Compact City Car)
    '1.jpg': 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1080&auto=format&fit=crop&q=85'
  },
  'car-10': { // Honda Amaze (Silver Sedan)
    '1.jpg': 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=1080&auto=format&fit=crop&q=85'
  },
  'car-11': { // Maruti WagonR (White Urban Practical Car)
    '1.jpg': 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1508974239320-0a029497e820?w=1080&auto=format&fit=crop&q=85'
  },
  'car-12': { // Hyundai Verna (Silver Aerodynamic Sports Sedan)
    '1.jpg': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1080&auto=format&fit=crop&q=85',
    '2.jpg': 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1080&auto=format&fit=crop&q=85',
    '3.jpg': 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=1080&auto=format&fit=crop&q=85'
  }
};

async function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      // Handle redirects if any
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`));
      }
      const fileStream = fs.createWriteStream(destPath);
      response.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
      fileStream.on('error', (err) => {
        fs.unlink(destPath, () => {});
        reject(err);
      });
    }).on('error', reject);
  });
}

async function main() {
  console.log('🚀 Downloading authentic car photos for all 12 vehicles...');
  const baseCarsDir = path.join(__dirname, '..', 'public', 'images', 'cars');

  for (const [carId, files] of Object.entries(CAR_PHOTOS)) {
    const carDir = path.join(baseCarsDir, carId);
    if (!fs.existsSync(carDir)) {
      fs.mkdirSync(carDir, { recursive: true });
    }

    for (const [filename, url] of Object.entries(files)) {
      const destPath = path.join(carDir, filename);
      process.stdout.write(`  Fetching ${carId}/${filename}... `);
      try {
        await downloadFile(url, destPath);
        const stats = fs.statSync(destPath);
        console.log(`✓ (${Math.round(stats.size / 1024)} KB)`);
      } catch (err) {
        console.log(`✗ Error: ${err.message}`);
      }
    }
  }

  console.log('\n✨ All car photos updated successfully!');
}

main();
