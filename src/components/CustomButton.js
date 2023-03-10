import React from 'react'
import { Button } from 'react-bootstrap'

function CustomButton({variant='primary', text, className='btn'}) {
  return (
    <>
        <Button className={className} variant={variant}>
            {text}
        </Button>
    </>
  )
}

export default CustomButton