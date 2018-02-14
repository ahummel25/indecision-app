import React from 'react';

export const Action = (props) => (
  <div>
    <button 
      className="big-button"
      disabled={!props.hasOptions} 
      onClick={props.handlePick}>
      What should I do?
    </button>
  </div>
);
   