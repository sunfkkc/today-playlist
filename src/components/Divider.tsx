import React from 'react';

function Divider(props: Props) {
  const { backgroundColor = 'white', opacity = 1 } = props;
  return (
    <div
      style={{
        width: '100%',
        height: 1,
        backgroundColor,
        opacity,
      }}
    />
  );
}

export default Divider;

interface Props {
  backgroundColor?: string;
  opacity?: number;
}
