import React from 'react'
import { Button, useColorMode } from '@chakra-ui/react'

function ThemeSwitcher() {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Button onClick={toggleColorMode}>{colorMode === 'light' ? "Sun" : "Moon"}</Button>
  )
}

export default ThemeSwitcher