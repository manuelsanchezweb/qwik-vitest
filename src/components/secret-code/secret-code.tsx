import { $, component$, useSignal } from '@builder.io/qwik'

export const rightPassword = '1234'

const numberRows = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['0']]

export const SecretCode = component$(() => {
  const userPassword = useSignal<string>('')

  const handleClick = $((number: string) => {
    userPassword.value = userPassword.value + number
  })

  const deleteLastDigit = $(() => {
    userPassword.value = userPassword.value.slice(0, -1)
  })

  const checkIfRightPassword = $(() => {
    if (userPassword.value === rightPassword) {
      console.log('You are logged in!')
    } else {
      console.log('Wrong password!')
    }
  })

  return (
    <div data-test="secretCode">
      <h1 class="text-3xl font-bold">Secret Code - Only 4 Digits</h1>
      <input
        class="border my-4 p-2 w-full"
        type="password"
        name="inputPassword"
        min="1"
        max="9999"
        data-test="inputPassword"
        value={userPassword.value}
      />
      <div data-test="numberGrid">
        {numberRows.map((row) => (
          <div class="flex justify-center" data-test="numberRow">
            {row.map((number) => (
              <button
                onClick$={() => handleClick(number)}
                data-test={number}
                key={number}
                class="border m-1 min-w-[55px] min-h-[55px] rounded-full hover:bg-gray-200 focus:bg-gray-200"
              >
                {number}
              </button>
            ))}
          </div>
        ))}
      </div>
      <div class="flex justify-center my-4 gap-4">
        <button
          onClick$={deleteLastDigit}
          class="border py-2 px-4 bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600"
          data-test="btnDelete"
        >
          Delete
        </button>

        <button
          onClick$={checkIfRightPassword}
          class="border py-2 px-4 bg-gray-500 text-white hover:bg-gray-600 focus:bg-gray-600"
          data-test="btnSubmit"
        >
          Submit
        </button>
      </div>
    </div>
  )
})
