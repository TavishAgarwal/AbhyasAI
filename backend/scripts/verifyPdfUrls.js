// backend/scripts/verifyPdfUrls.js
// Verifies that PDF URLs in ncertManifest.json are accessible

const axios = require('axios');
const fs = require('fs');
const path = require('path');

async function verifyUrls() {
  const manifestPath = path.join(__dirname, '../data/ncertManifest.json');
  if (!fs.existsSync(manifestPath)) {
    console.error('ncertManifest.json not found. Run scrapeNcert.js first.');
    process.exit(1);
  }

  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const results = { working: [], broken: [] };
  let checked = 0;

  console.log('═══════════════════════════════════════════════════');
  console.log('  AbhyasAI — PDF URL Verification');
  console.log('═══════════════════════════════════════════════════\n');

  for (const book of manifest) {
    for (const chapter of book.chapters) {
      checked++;
      try {
        const response = await axios.head(chapter.pdfUrl, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; educational-tool)',
            'Referer': 'https://ncert.nic.in/'
          },
          maxRedirects: 5
        });

        if (response.status === 200) {
          results.working.push({
            class: book.class,
            subject: book.subjectDb,
            book: book.subjectDisplay,
            chapter: chapter.num,
            title: chapter.title,
            url: chapter.pdfUrl
          });
          console.log(`✓ [${checked}] Class ${book.class} ${book.subjectDb} Ch${chapter.num} — ${chapter.title.substring(0, 50)}`);
        } else {
          results.broken.push({
            class: book.class, subject: book.subjectDb,
            book: book.subjectDisplay, chapter: chapter.num,
            title: chapter.title, url: chapter.pdfUrl,
            status: response.status
          });
          console.log(`✗ [${checked}] Class ${book.class} ${book.subjectDb} Ch${chapter.num} — HTTP ${response.status}`);
        }
      } catch (err) {
        results.broken.push({
          class: book.class, subject: book.subjectDb,
          book: book.subjectDisplay, chapter: chapter.num,
          title: chapter.title, url: chapter.pdfUrl,
          error: err.message
        });
        console.log(`✗ [${checked}] Class ${book.class} ${book.subjectDb} Ch${chapter.num} — ${err.message.substring(0, 80)}`);
      }

      // Polite delay
      await new Promise(r => setTimeout(r, 300));
    }
  }

  const outputPath = path.join(__dirname, '../data/urlVerification.json');
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));

  console.log(`\n═══════════════════════════════════════════════════`);
  console.log(`  VERIFICATION COMPLETE`);
  console.log(`  Working URLs: ${results.working.length}`);
  console.log(`  Broken URLs: ${results.broken.length}`);
  console.log(`  Success rate: ${((results.working.length / checked) * 100).toFixed(1)}%`);
  console.log(`  Results saved to: ${outputPath}`);
  console.log(`═══════════════════════════════════════════════════`);

  if (results.broken.length > 0 && results.broken.length <= 20) {
    console.log('\nBroken URLs:');
    results.broken.forEach(b => {
      console.log(`  Class ${b.class} ${b.subject} Ch${b.chapter}: ${b.url}`);
      console.log(`    ${b.error || `HTTP ${b.status}`}`);
    });
  }
}

verifyUrls().catch(console.error);
