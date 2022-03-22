import * as React from 'react'
import { AccordionButton } from '@chakra-ui/react'
import { Title } from '@components'
import { BdsIcon } from 'blip-ds/dist/blip-ds-react'

export type BlipAccordionButtonProps = {
  title: string
}

const ARROW_RIGHT = 'arrow-right'
const ARROW_DOWN = 'arrow-down'

export const BlipAccordionButton = ({ title }: BlipAccordionButtonProps) => {
  const [arrowState, setArrowState] = React.useState(ARROW_RIGHT)

  const switchArrowState = () => {
    if (arrowState === ARROW_RIGHT) {
      setArrowState(ARROW_DOWN)
    } else {
      setArrowState(ARROW_RIGHT)
    }
  }

  return (
    <>
      <AccordionButton
        _focus={{ outline: 'none' }}
        _hover={{ bgColor: 'none' }}
        onClick={switchArrowState}
        paddingY={10.1}
        paddingX={5.1}
      >
        <BdsIcon name={arrowState} size="x-large" theme="outline" />
        <Title>{title}</Title>
      </AccordionButton>
    </>
  )
}