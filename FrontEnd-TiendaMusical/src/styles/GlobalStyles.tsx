import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f8f9fa;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #0d6efd;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #0056b3;
  }

  /* Focus styles */
  .btn:focus,
  .form-control:focus,
  .form-select:focus {
    box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
  }

  /* Animations */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  /* Utility classes */
  .fade-in {
    animation: fadeIn 0.6s ease-out;
  }

  .slide-in {
    animation: slideIn 0.6s ease-out;
  }

  .pulse {
    animation: pulse 2s infinite;
  }

  /* Bootstrap overrides */
  .btn {
    font-weight: 500;
    transition: all 0.3s ease;
  }

  .card {
    border: none;
    transition: all 0.3s ease;
  }

  .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }

  /* Responsive typography */
  @media (max-width: 576px) {
    .display-5 {
      font-size: 2rem;
    }
    
    .lead {
      font-size: 1rem;
    }
  }

  /* Loading states */
  .loading {
    opacity: 0.7;
    pointer-events: none;
  }

  /* Accessibility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  /* Print styles */
  @media print {
    .no-print {
      display: none !important;
    }
  }
`;

export default GlobalStyles;