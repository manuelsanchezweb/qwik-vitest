import { $, component$, useSignal } from '@builder.io/qwik'

export const HexaToRGBConverter = component$(() => {
  const hexaColor = useSignal('#ffce00')
  const rgbColor = useSignal('rgb(255, 206, 0)')

  const transformHexaIntoRGB = $(() => {
    const sanitizedHexaColor = hexaColor.value.replace('#', '')

    const r = parseInt(sanitizedHexaColor.substring(0, 2), 16)
    const g = parseInt(sanitizedHexaColor.substring(2, 4), 16)
    const b = parseInt(sanitizedHexaColor.substring(4, 6), 16)

    rgbColor.value = `rgb(${r}, ${g}, ${b})`
  })

  return (
    <div class="rgb-converter">
      <h1 class="text-4xl">Hexa To RGB Converter</h1>
      <div class="flex flex-col gap-2 items-start my-4">
        <input
          name="inputHex"
          value={hexaColor.value}
          onChange$={(e) => (hexaColor.value = e.target.value)}
          data-test="inputHex"
          class="my-4 border p-4"
          type="text"
        />
        <button
          onClick$={transformHexaIntoRGB}
          data-test="btnConverter"
          class="border bg-gray-500 text-white p-2"
        >
          Convert into RGB
        </button>
      </div>
      <p data-test="resultRGB">
        RGB: {rgbColor.value}{' '}
        <span
          class="w-2 h-2 inline-flex"
          style={{ backgroundColor: rgbColor.value }}
        ></span>
      </p>
    </div>
  )
})
