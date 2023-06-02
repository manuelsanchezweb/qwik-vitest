import { component$ } from '@builder.io/qwik'
import type { DocumentHead } from '@builder.io/qwik-city'
import { Calculator } from '~/components/calculator/calculator'

export default component$(() => {
  return (
    <>
      <Calculator />
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
