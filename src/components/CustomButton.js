import React from 'react'
import { Button } from 'react-bootstrap'

function CustomButton({variant='primary', text}) {
  return (
    <>
        <Button variant={variant}>
            {text}
        </Button>
    </>
  )
}

export default CustomButton