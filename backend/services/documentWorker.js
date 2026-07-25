const { supabase } = require('./supabaseClient');
const { renderReport } = require('./reportRenderer');
const { generatePdf } = require('./documentGen');
const { generateReportDocx } = require('./docxGenerator');

async function processDocumentJob(jobData) {
  const { sessionId, format, docType, userId } = jobData;
  // docType is 'pdf' or 'docx'
  // format is 'standard', 'dyslexia', 'adhd'
  
  if (!['pdf', 'docx'].includes(docType)) throw new Error('Invalid docType');
  
  // 1. Fetch report
  const { data: report, error } = await supabase
    .from('reports')
    .select('report_json, sessions!inner(user_id, topics_or_roles(raw_input))')
    .eq('session_id', sessionId)
    .single();
    
  if (error || !report) {
    throw new Error('Report not found for this session.');
  }
  
  if (report.sessions.user_id !== userId) {
    throw new Error('Unauthorized');
  }
  
  const topicContext = report.sessions?.topics_or_roles?.raw_input || 'Practice Session';
  
  // 2. Generate buffer
  let buffer;
  let contentType;
  let extension;
  
  if (docType === 'pdf') {
    const html = renderReport(report.report_json, topicContext, format);
    buffer = await generatePdf(html, format);
    contentType = 'application/pdf';
    extension = 'pdf';
  } else {
    buffer = await generateReportDocx(report.report_json, topicContext, format);
    contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    extension = 'docx';
  }
  
  // 3. Upload to Supabase Storage
  const filePath = `${sessionId}/${format}.${extension}`;
  
  const { error: uploadError } = await supabase.storage
    .from('reports')
    .upload(filePath, buffer, {
      contentType,
      upsert: true,
    });
    
  if (uploadError) {
    throw new Error(`Upload failed: ${uploadError.message}`);
  }
  
  return { filePath, docType, format };
}

module.exports = { processDocumentJob };
