import React from 'react';
import { CV_PDF_FILENAME, CV_PDF_PATH } from '../constants/cv';

/**
 * Opens the CV PDF in a new tab and suggests a filename when the browser supports download.
 */
const CvDownloadLink = ({
  children,
  className = '',
  showIcon = true,
  label = 'Download CV',
  ...rest
}) => (
  <a
    href={CV_PDF_PATH}
    download={CV_PDF_FILENAME}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    aria-label={`${label} (PDF, opens in a new tab)`}
    {...rest}
  >
    {showIcon && <i className="fas fa-download" aria-hidden="true"></i>}
    {children ?? label}
  </a>
);

export default CvDownloadLink;
