import React from 'react';
import FadeLoader from 'halogen/FadeLoader';

export default ({ text }) => (
  <div className="loader">
    <FadeLoader color="#1aa9bc"/>
    <p>
      { text }
    </p>
  </div>
)
