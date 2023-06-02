// 1. important: add test: {} in the vite.config.js
// "it" is an alias for test
import { evaluate } from 'mathjs'
import { $, component$, useSignal } from '@builder.io/qwik'

export const operations = ['/', '*', '-', '+']
export const equalSign = '='
export const numbers = [...Array(10).keys()]
export const rows = [['7', '8', '9'], ['4', '5', '6'], ['1', '2', '3'], ['0']]

export const Calculator = component$(() => {
  const currentValue = useSignal('')

  const createHandleClick = $((op: string) => {
    currentValue.value = currentValue.value + op
  })

  return (
    <section class="calculator">
      <h1>Calculator</h1>
      <input
        value={currentValue.value}
        readOnly
        data-testid="number"
        type="text"
        name="number"
        id="number"
      />
      <div role="grid">
        {rows.map((row, index) => (
          <div key={index} data-testid="row" role="row">
            {row.map((number) => (
              <button
                data-testid={number}
                onClick$={() => createHandleClick(number)}
                key={number}
                role="gridcell"
              >
                {number}
              </button>
            ))}
          </div>
        ))}
        {operations.map((operation) => (
          <button
            data-testid={`operation${operation}`}
            onClick$={() => createHandleClick(operation)}
            key={operation}
            role="gridcell"
          >
            {operation}
          </button>
        ))}
        <button
          data-testid={`operation=`}
          onClick$={() =>
            (currentValue.value = evaluate(currentValue.value).toString())
          }
        >
          {equalSign}
        </button>
      </div>
    </section>
  )
})
