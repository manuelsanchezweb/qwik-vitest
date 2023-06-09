import { component$, useSignal } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calculator } from '~/components/calculator/calculator'
import { Navigation } from '~/layout/navigation'

export const ELEMENTS = {
  CALCULATOR: 'CALCULATOR',
  HEXA_RGB_CONVERTER: 'HEXA_RGB_CONVERTER',
  SECRET_CODE: 'SECRET_CODE',
}

export default component$(() => {
  const selectedElement = useSignal(ELEMENTS.CALCULATOR)
  return (
    <>
      <Navigation selectedElement={selectedElement} />
      {selectedElement.value === ELEMENTS.CALCULATOR && <Calculator />}
      {selectedElement.value === ELEMENTS.HEXA_RGB_CONVERTER && (
        <p>RGB Converter</p>
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
