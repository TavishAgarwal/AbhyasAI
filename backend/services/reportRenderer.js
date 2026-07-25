// backend/services/reportRenderer.js
// Renders JSON report data into specific HTML formats

const fs = require('fs');
const path = require('path');

function getTemplate(format) {
  const templatePath = path.join(__dirname, '..', 'templates', `report-${format}.html`);
  if (fs.existsSync(templatePath)) {
    return fs.readFileSync(templatePath, 'utf8');
  }
  return fs.readFileSync(path.join(__dirname, '..', 'templates', 'report-standard.html'), 'utf8');
}

function formatDelta(delta) {
  if (delta > 0) return `<span class="positive">▲ +${delta}</span>`;
  if (delta < 0) return `<span class="negative">▼ ${delta}</span>`;
  return `<span class="neutral">- 0</span>`;
}

function formatForDyslexia(text) {
  if (!text) return '';
  // Wrap text in dyslexia-para to match CSS and replace some common hard words if needed
  return `<div class="dyslexia-para">${text}</div>`;
}

function renderSkillTable(skillProgression, format) {
  if (!skillProgression || skillProgression.length === 0) return 'No skill data available.';

  if (format === 'standard') {
    return skillProgression.map(s => `
      <tr>
        <td>${s.skill_name}</td>
        <td>${s.category}</td>
        <td>${s.starting_rating}</td>
        <td>${s.ending_rating}</td>
        <td>${formatDelta(s.delta)}</td>
      </tr>
    `).join('');
  }

  if (format === 'dyslexia') {
    return skillProgression.map(s => {
      const direction = s.delta > 0 ? 'improved' : (s.delta < 0 ? 'dropped' : 'stayed the same');
      return `
      <div class="skill-block">
        <span class="skill-title">${s.skill_name}</span>
        Rating changed from ${s.starting_rating} to ${s.ending_rating}. 
        It ${direction} by ${formatDelta(s.delta)}.
      </div>
      `;
    }).join('');
  }

  if (format === 'adhd') {
    return skillProgression.map(s => `
      <div class="skill-card">
        <span class="name">${s.skill_name}</span>
        <div class="rating">${s.ending_rating}</div>
        <div class="delta ${s.delta >= 0 ? 'positive' : 'negative'}">${s.delta >= 0 ? '+' : ''}${s.delta}</div>
      </div>
    `).join('');
  }
}

function renderList(items, format, type) {
  if (!items || items.length === 0) return '';

  if (format === 'standard') {
    return items.map(item => `<li>${item}</li>`).join('');
  }

  if (format === 'dyslexia') {
    return items.map(item => `<div class="list-item">${item}</div>`).join('');
  }

  if (format === 'adhd') {
    if (type === 'action') {
      return items.map(item => `
        <div class="card action">
          <div class="checkbox"></div>
          <div>${item}</div>
        </div>
      `).join('');
    }
    
    // Progressive disclosure for strengths/gaps
    return items.map((item, i) => {
      // Extract the first few words as a summary title
      const words = item.split(' ');
      const title = words.slice(0, 5).join(' ') + (words.length > 5 ? '...' : '');
      return `
        <div class="card ${type}">
          <details ${i === 0 ? 'open' : ''}>
            <summary>${title}</summary>
            <p>${item}</p>
          </details>
        </div>
      `;
    }).join('');
  }
}

/**
 * Renders a report JSON into HTML based on the specified format.
 * @param {Object} reportJson 
 * @param {string} topicContext 
 * @param {string} format 'standard', 'dyslexia', or 'adhd'
 * @returns {string} Populated HTML
 */
function renderReport(reportJson, topicContext, format = 'standard') {
  let template = getTemplate(format);

  const skillProgressionHTML = renderSkillTable(reportJson.skill_progression, format);
  const strengthsHTML = renderList(reportJson.top_strengths, format, 'strength');
  const gapsHTML = renderList(reportJson.top_gaps, format, 'gap');
  const recommendationsHTML = renderList(reportJson.recommendations, format, 'action');

  let summary = reportJson.summary || '';
  if (format === 'dyslexia') {
    summary = formatForDyslexia(summary);
  }

  template = template.replace('{{topicContext}}', topicContext || 'Practice Session');
  template = template.replace('{{summary}}', summary);
  template = template.replace('{{overall_score}}', (reportJson.overall_score || 0).toFixed(2));
  template = template.replace('{{skillProgressionHTML}}', skillProgressionHTML);
  template = template.replace('{{strengthsHTML}}', strengthsHTML);
  template = template.replace('{{gapsHTML}}', gapsHTML);
  template = template.replace('{{recommendationsHTML}}', recommendationsHTML);

  return template;
}

module.exports = { renderReport };
