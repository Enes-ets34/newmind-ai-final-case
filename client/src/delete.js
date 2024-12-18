import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname ve __filename için gerekli
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Hedef dizin (components dizini)
const componentsDir = path.join(__dirname, 'views');

// Recursive olarak klasörlerin içindeki .js dosyalarını siler
async function deleteJsFiles(dir) {
  const files = await fs.promises.readdir(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = await fs.promises.stat(filePath);

    if (stats.isDirectory()) {
      // Eğer klasörse, recursive olarak tekrar çalıştır
      await deleteJsFiles(filePath);
    } else if (path.extname(file) === '.js') {
      // Eğer .js uzantılı dosya ise, sil
      await fs.promises.unlink(filePath);
      console.log(`Deleted: ${filePath}`);
    }
  }
}

// Scripti çalıştırıyoruz
(async () => {
  if (fs.existsSync(componentsDir)) {
    await deleteJsFiles(componentsDir);
    console.log('Tüm .js dosyaları başarıyla silindi!');
  } else {
    console.log('components dizini bulunamadı.');
  }
})();
