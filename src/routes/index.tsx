import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calculator } from '~/components/calculator/calculator'
import { HexaToRGBConverter } from '~/components/hexa-to-rgb-converter/hexa-to-rgb-converter'
import { Navigation } from '~/layout/navigation'

export const ELEMENTS = {
  CALCULATOR: 'CALCULATOR',
  HEXA_RGB_CONVERTER: 'HEXA_RGB_CONVERTER',
  SECRET_CODE: 'SECRET_CODE',
}

export default component$(() => {
  const selectedElement = useSignal(ELEMENTS.HEXA_RGB_CONVERTER)
  return (
    <>
      <Navigation selectedElement={selectedElement} />
      {selectedElement.value === ELEMENTS.CALCULATOR && <Calculator />}
      {selectedElement.value === ELEMENTS.HEXA_RGB_CONVERTER && (
        <HexaToRGBConverter />
      )}
      {selectedElement.value === ELEMENTS.SECRET_CODE && <p>Secret Code</p>}
    </>
  )
})

export const head: DocumentHead = {
  title: 'Vitest with Qwik',
  meta: [
    {
      name: 'description',
      content: 'Unos cuantos ejemplos de prueba de cómo funciona Vitest',
    },
  ],
}
