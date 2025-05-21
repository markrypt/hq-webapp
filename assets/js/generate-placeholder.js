// This is a base64-encoded version of a placeholder image - a blank gray square with the Markrypt logo
// The actual image data is quite long, so this is just a representation
const placeholderImageData = 
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyND' +
  'AyNDAiPjxyZWN0IHdpZHRoPSIyNDAiIGhlaWdodD0iMjQwIiBmaWxsPSIjZjJmMmYyIi8+PHRleHQgeD0iNTAl' +
  'IiB5PSI1MCUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQt' +
  'ZmFtaWx5PSJzYW5zLXNlcmlmIiBmb250LXdlaWdodD0iYm9sZCIgZm9udC1zaXplPSIyNHB4IiBmaWxsPSIj' +
  'MWU5MGZmIj5NYXJrcnlwdDwvdGV4dD48L3N2Zz4=';

// Create a placeholder image file
document.addEventListener('DOMContentLoaded', () => {
  // Convert the base64 data to a Blob
  const byteString = atob(placeholderImageData.split(',')[1]);
  const mimeString = placeholderImageData.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  
  const blob = new Blob([ab], { type: mimeString });
  
  // Create a URL from the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a download link
  const link = document.createElement('a');
  link.href = url;
  link.download = 'placeholder-image.jpg';
  
  // Append to the document, click it, and remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  // Clean up the URL object
  URL.revokeObjectURL(url);
});
