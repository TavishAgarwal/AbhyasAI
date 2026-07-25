// backend/scripts/checkExtraction.js
// Quality-checks all extracted chapter JSON files

const fs = require('fs');
const path = require('path');

const chaptersDir = path.join(__dirname, '../data/chapters');

if (!fs.existsSync(chaptersDir)) {
  console.error('chapters directory not found. Run extractNcertText.js first.');
  process.exit(1);
}

const files = fs.readdirSync(chaptersDir).filter(f => f.endsWith('.json'));

console.log('═══════════════════════════════════════════════════');
console.log('  AbhyasAI — Extraction Quality Check');
console.log('═══════════════════════════════════════════════════\n');
console.log(`Checking ${files.length} extracted chapters...\n`);

const issues = [];
let totalWords = 0;
let totalSections = 0;

for (const file of files) {
  const data = JSON.parse(fs.readFileSync(path.join(chaptersDir, file), 'utf8'));
  const fileIssues = [];

  if (data.wordCount < 150) {
    fileIssues.push(`Very low word count: ${data.wordCount}`);
  }
  if (!data.sections || data.sections.length === 0) {
    fileIssues.push('No sections extracted');
  }
  if (data.sections && data.sections.length === 1 && data.wordCount > 500) {
    fileIssues.push('Only 1 section despite long content');
  }
  if (!data.learningObjectives || data.learningObjectives.length < 2) {
    fileIssues.push('Too few learning objectives');
  }
  if (!data.title || data.title === 'undefined' || data.title === '') {
    fileIssues.push('Missing chapter title');
  }

  totalWords += data.wordCount || 0;
  totalSections += (data.sections || []).length;

  if (fileIssues.length > 0) {
    issues.push({ file, data, issues: fileIssues });
    console.log(`⚠ ${file}`);
    fileIssues.forEach(i => console.log(`    - ${i}`));
  } else {
    console.log(`✓ ${file} — ${data.sections.length} sections, ${data.wordCount} words`);
  }
}

console.log(`\n═══════════════════════════════════════════════════`);
console.log(`  QUALITY CHECK COMPLETE`);
console.log(`  Total files: ${files.length}`);
console.log(`  Files with issues: ${issues.length}`);
console.log(`  Clean files: ${files.length - issues.length}`);
console.log(`  Average word count: ${files.length > 0 ? Math.round(totalWords / files.length) : 0}`);
console.log(`  Average sections: ${files.length > 0 ? (totalSections / files.length).toFixed(1) : 0}`);
console.log(`═══════════════════════════════════════════════════`);

if (issues.length > 0) {
  const issuesPath = path.join(__dirname, '../data/extractionIssues.json');
  fs.writeFileSync(
    issuesPath,
    JSON.stringify(issues.map(i => ({
      file: i.file,
      class: i.data.class,
      subject: i.data.subject,
      chapter: i.data.chapterNum,
      title: i.data.title,
      wordCount: i.data.wordCount,
      issues: i.issues
    })), null, 2)
  );
  console.log(`\nIssues saved to: ${issuesPath}`);
}
