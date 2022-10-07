import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'

function ThemeSwitcher() {
    const {toggleColorMode} = useColorMode()
  return (
    <Button onClick={toggleColorMode}>ThemeSwitcher</Button>
  )
}

export default ThemeSwitcher