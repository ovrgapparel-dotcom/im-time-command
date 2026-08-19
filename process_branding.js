const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcImage = `C:\\Users\\User\\.gemini\\antigravity\\brain\\e25c254f-7b03-422c-ade7-6e58cfecdd4e\\.user_uploaded\\media_1787102995157.jpg`;

async function generateAllBrandingIcons() {
  console.log('Processing source image:', srcImage);

  const targets = [
    // Web icons
    { path: 'favicon.png', size: 64, format: 'png' },
    { path: 'apple-touch-icon.png', size: 180, format: 'png' },
    { path: 'icons/icon-192.png', size: 192, format: 'png' },
    { path: 'icons/icon-512.png', size: 512, format: 'png' },
    { path: 'icons/icon-512.jpg', size: 512, format: 'jpeg' },
    
    // Assets
    { path: 'assets/im_logo_blue.png', size: 1024, format: 'png' },
    { path: 'assets/im_logo_gold.jpg', size: 512, format: 'jpeg' },
    { path: 'assets/im_logo_dark.png', size: 512, format: 'png' },
    { path: 'assets/im_logo_silver.png', size: 512, format: 'png' },

    // Android TWA store icon
    { path: 'android-twa/store_icon.png', size: 512, format: 'png' },

    // Android Mipmaps (Launcher)
    { path: 'android-twa/app/src/main/res/mipmap-mdpi/ic_launcher.png', size: 48, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-mdpi/ic_maskable.png', size: 48, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-hdpi/ic_launcher.png', size: 72, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-hdpi/ic_maskable.png', size: 72, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xhdpi/ic_launcher.png', size: 96, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xhdpi/ic_maskable.png', size: 96, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xxhdpi/ic_launcher.png', size: 144, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xxhdpi/ic_maskable.png', size: 144, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png', size: 192, format: 'png' },
    { path: 'android-twa/app/src/main/res/mipmap-xxxhdpi/ic_maskable.png', size: 192, format: 'png' },

    // Android Splash screens
    { path: 'android-twa/app/src/main/res/drawable-mdpi/splash.png', size: 320, format: 'png' },
    { path: 'android-twa/app/src/main/res/drawable-hdpi/splash.png', size: 480, format: 'png' },
    { path: 'android-twa/app/src/main/res/drawable-xhdpi/splash.png', size: 640, format: 'png' },
    { path: 'android-twa/app/src/main/res/drawable-xxhdpi/splash.png', size: 960, format: 'png' },
    { path: 'android-twa/app/src/main/res/drawable-xxxhdpi/splash.png', size: 1280, format: 'png' },
  ];

  for (const item of targets) {
    const destPath = path.resolve(__dirname, item.path);
    const dir = path.dirname(destPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let pipeline = sharp(srcImage).resize(item.size, item.size, { fit: 'cover' });
    if (item.format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: 95 });
    } else {
      pipeline = pipeline.png({ compressionLevel: 9 });
    }

    await pipeline.toFile(destPath);
    console.log(`✓ Generated ${item.path} (${item.size}x${item.size})`);
  }

  // Generate favicon.ico as a copy of favicon.png
  fs.copyFileSync(
    path.resolve(__dirname, 'favicon.png'),
    path.resolve(__dirname, 'favicon.ico')
  );
  console.log('✓ Generated favicon.ico');
}

generateAllBrandingIcons().catch(err => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
