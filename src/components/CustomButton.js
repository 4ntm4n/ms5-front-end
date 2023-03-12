import React from 'react'
import { Button } from 'react-bootstrap'

/**
 * Custom button component that supports the following variants from Bootstrap:
 * primary, secondary, success, danger, warning, info, light, dark, link
 *
 * Props:
 * - variant: string (one of the supported Bootstrap variants)
 * - text: string (the text to display on the button)
 */

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