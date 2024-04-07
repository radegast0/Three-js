import React from 'react'

const Test = ({x=1,y=1,z=1}) => {
  return (
    <mesh position={[x,y,z]}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
    </mesh>
  )
}

export default Test