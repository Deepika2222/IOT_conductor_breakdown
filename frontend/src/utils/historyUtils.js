/**
 * Converts an array of objects to a CSV string.
 * @param {Array} data - Array of objects to convert.
 * @returns {string} - CSV formatted string.
 */
export const convertToCSV = (data) => {
  if (!data || !data.length) return '';
  
  const headers = Object.keys(data[0]);
  const csvRows = [];
  
  // Add headers
  csvRows.push(headers.join(','));
  
  // Add data rows
  for (const row of data) {
    const values = headers.map(header => {
      const val = row[header];
      return `"${val}"`; // wrap in quotes to handle commas
    });
    csvRows.push(values.join(','));
  }
  
  return csvRows.join('\n');
};

/**
 * Triggers a browser download for a specific content.
 * @param {string} content - The file content.
 * @param {string} fileName - The name of the file to save.
 * @param {string} contentType - The MIME type of the file.
 */
export const triggerDownload = (content, fileName, contentType = 'text/csv;charset=utf-8;') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
