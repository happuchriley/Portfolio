import React from 'react';

const Spinner = () => {
  return (
    <div id="spinner" className="show fixed inset-0 z-[99999] bg-cream dark:bg-charcoal flex items-center justify-center transition-opacity duration-500 ease-out opacity-0 invisible">
      <div className="spinner-size bg-primary animate-pulse" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
