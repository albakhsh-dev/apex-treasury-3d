const fs = require('fs');
const sharp = require('sharp');

async function optimizeGlb() {
  console.log('Reading public/models/hero-car.glb...');
  const data = fs.readFileSync('public/models/hero-car.glb');

  const magic = data.readUInt32LE(0);
  const version = data.readUInt32LE(4);
  const totalLength = data.readUInt32LE(8);

  const jsonChunkLen = data.readUInt32LE(12);
  const jsonChunkType = data.readUInt32LE(16);
  const jsonBuf = data.subarray(20, 20 + jsonChunkLen);
  const gltf = JSON.parse(jsonBuf.toString('utf8'));

  const binHeaderOffset = 20 + jsonChunkLen;
  const binChunkLen = data.readUInt32LE(binHeaderOffset);
  const binChunkData = data.subarray(binHeaderOffset + 8, binHeaderOffset + 8 + binChunkLen);

  console.log(`Original GLB: ${(data.length / (1024*1024)).toFixed(2)} MB`);
  console.log(`Total images: ${gltf.images ? gltf.images.length : 0}`);

  // Create mapping of bufferViews used by images
  const imageBufferViewIndices = new Set();
  const imageReplacements = new Map();

  if (gltf.images) {
    for (let i = 0; i < gltf.images.length; i++) {
      const img = gltf.images[i];
      if (img.bufferView !== undefined) {
        imageBufferViewIndices.add(img.bufferView);
        const bv = gltf.bufferViews[img.bufferView];
        const offset = bv.byteOffset || 0;
        const length = bv.byteLength;
        const imgBuffer = binChunkData.subarray(offset, offset + length);

        try {
          // Resize large textures to max 1024x1024 and compress to jpeg
          const metadata = await sharp(imgBuffer).metadata();
          let pipeline = sharp(imgBuffer);
          if (metadata.width > 1024 || metadata.height > 1024) {
            pipeline = pipeline.resize(1024, 1024, { fit: 'inside' });
          }

          // Use jpeg quality 80
          const compressed = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
          imageReplacements.set(img.bufferView, {
            buffer: compressed,
            mimeType: 'image/jpeg',
            imageIndex: i,
          });
          img.mimeType = 'image/jpeg';
          console.log(`Image ${i} (${img.name || 'unnamed'}): ${length} -> ${compressed.length} bytes`);
        } catch (err) {
          console.warn(`Could not compress image ${i}:`, err.message);
        }
      }
    }
  }

  // Now rebuild the binary buffer and update all bufferViews
  const newChunks = [];
  let currentOffset = 0;

  for (let i = 0; i < gltf.bufferViews.length; i++) {
    const bv = gltf.bufferViews[i];
    let chunkData;

    if (imageReplacements.has(i)) {
      chunkData = imageReplacements.get(i).buffer;
    } else {
      const offset = bv.byteOffset || 0;
      const length = bv.byteLength;
      chunkData = binChunkData.subarray(offset, offset + length);
    }

    // 4-byte alignment
    const padding = (4 - (chunkData.length % 4)) % 4;
    const paddedChunk = padding > 0 
      ? Buffer.concat([chunkData, Buffer.alloc(padding)]) 
      : chunkData;

    bv.byteOffset = currentOffset;
    bv.byteLength = chunkData.length;

    newChunks.push(paddedChunk);
    currentOffset += paddedChunk.length;
  }

  const newBinBuffer = Buffer.concat(newChunks);
  gltf.buffers[0].byteLength = newBinBuffer.length;

  // Encode JSON
  let newJsonString = JSON.stringify(gltf);
  let jsonPadding = (4 - (Buffer.byteLength(newJsonString) % 4)) % 4;
  if (jsonPadding > 0) {
    newJsonString += ' '.repeat(jsonPadding);
  }
  const newJsonBuf = Buffer.from(newJsonString, 'utf8');

  // Build final GLB
  const newTotalLen = 12 + 8 + newJsonBuf.length + 8 + newBinBuffer.length;
  const outBuf = Buffer.alloc(newTotalLen);

  // Header
  outBuf.writeUInt32LE(0x46546C67, 0); // glTF
  outBuf.writeUInt32LE(2, 4);          // version 2
  outBuf.writeUInt32LE(newTotalLen, 8);

  // JSON Chunk
  outBuf.writeUInt32LE(newJsonBuf.length, 12);
  outBuf.writeUInt32LE(0x4E4F534A, 16); // JSON
  newJsonBuf.copy(outBuf, 20);

  // BIN Chunk
  const newBinOffset = 20 + newJsonBuf.length;
  outBuf.writeUInt32LE(newBinBuffer.length, newBinOffset);
  outBuf.writeUInt32LE(0x004E4942, newBinOffset + 4); // BIN\0
  newBinBuffer.copy(outBuf, newBinOffset + 8);

  fs.writeFileSync('public/models/hero-car-optimized.glb', outBuf);
  console.log(`Success! Optimized GLB saved to public/models/hero-car-optimized.glb: ${(outBuf.length / (1024*1024)).toFixed(2)} MB`);
}

optimizeGlb().catch(err => console.error(err));
