// Initialize search functionality
function initializeSearch() {
  console.log('Initializing global search...');
  
  // Create new SearchManager if it doesn't exist
  if (!window.searchManager) {
    window.searchManager = new SearchManager();
    window.searchManager.init().catch(err => {
      console.error('Error initializing search:', err);
    });
  }
  
  // Try to open search modal
  if (window.searchManager.openSearchModal) {
    window.searchManager.openSearchModal();
  } else {
    console.error('Search modal not available');
  }
}

// Add global search styles
const searchStyles = document.createElement('style');
searchStyles.textContent = `
  .search-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    z-index: 1000;
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .search-modal.active {
    display: block;
    opacity: 1;
  }
  
  .search-container {
    max-width: 800px;
    margin: 80px auto 0;
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
    max-height: 80vh;
    display: flex;
    flex-direction: column;
  }
  
  .search-header {
    padding: 20px;
    border-bottom: 1px solid var(--border-color);
    background: white;
  }
  
  .search-input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .search-icon-input {
    position: absolute;
    left: 15px;
    color: var(--accent-color);
    font-size: 16px;
  }
  
  #globalSearchInput {
    width: 100%;
    padding: 15px 20px 15px 45px;
    border: 1px solid var(--border-color);
    border-radius: 50px;
    font-size: 16px;
    outline: none;
    transition: all 0.3s ease;
  }
  
  #globalSearchInput:focus {
    border-color: var(--accent-color);
    box-shadow: 0 0 0 3px rgba(30,144,255,0.2);
  }
  
  .search-close {
    position: absolute;
    right: 15px;
    color: var(--text-secondary);
    font-size: 16px;
    cursor: pointer;
    padding: 10px;
  }
  
  .search-results {
    padding: 0;
    overflow-y: auto;
    max-height: calc(80vh - 77px);
  }
  
  .search-result-item {
    padding: 15px 20px;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    align-items: center;
    gap: 15px;
    transition: background 0.2s ease;
    text-decoration: none;
    color: var(--text-color);
  }
  
  .search-result-item:hover {
    background: #f9fbfd;
  }
  
  .search-result-image {
    width: 60px;
    height: 60px;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    border-radius: 8px;
    background-color: #f9f9f9;
    flex-shrink: 0;
  }
  
  .search-result-content {
    flex-grow: 1;
  }
  
  .search-result-title {
    font-weight: 600;
    margin-bottom: 5px;
  }
  
  .search-result-category {
    font-size: 13px;
    color: var(--accent-color);
  }
  
  .search-result-rating {
    display: flex;
    align-items: center;
    font-size: 13px;
    margin-top: 4px;
  }
  
  .search-result-stars {
    color: #FFB900;
    margin-right: 5px;
  }
  
  .search-empty-state,
  .search-loading-state,
  .search-no-results {
    padding: 40px;
    text-align: center;
    color: var(--text-secondary);
  }
  
  .search-empty-icon {
    font-size: 48px;
    margin-bottom: 15px;
    opacity: 0.2;
  }
  
  @media (max-width: 768px) {
    .search-container {
      margin: 0;
      max-width: 100%;
      height: 100vh;
      max-height: 100vh;
      border-radius: 0;
    }
    
    .search-results {
      max-height: calc(100vh - 77px);
    }
  }
`;

document.head.appendChild(searchStyles);
