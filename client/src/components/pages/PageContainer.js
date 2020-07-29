
import React from 'react';

export default function PageContainer(props) {
  return (
    <div className={props.pageStyle} style={props.style}>
      <div className={props.filter}>
        {props.children}
      </div>
    </div>
  );
}