import React from 'react';

const BackToTop = () => {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="back-to-top hidden btn btn-outline-primary border-2 btn-lg-square flex items-center justify-center"
      title="Back to top"
      aria-label="Back to top"
    >
      <i className="bi bi-arrow-up"></i>
    </button>
  );
};

export default BackToTop;
