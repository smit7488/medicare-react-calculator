import React from 'react';
import Calculator from './components/Calculator.jsx'; // Import the Calculator component
import './App.css'; // Import Tailwind styles (global styles)

function App() {
  return (
    <div className="App bg-background min-h-screen text-output-text dark:bg-dark-background dark:text-dark-output-text">
      <header className="p-4 bg-heading-bg text-white text-center">
      
      </header>
      <main className="container mx-auto p-4">
        <Calculator />
      </main>
      <footer className="p-4 bg-gray-100 dark:bg-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
       
      </footer>
    </div>
  );
}

export default Calculator;
