import { Signal, component$ } from '@builder.io/qwik'
import { ELEMENTS } from '~/routes'

export const Navigation = component$(
  ({ selectedElement }: { selectedElement: Signal<string> }) => {
    return (
      <nav class="fixed min-h-24 w-full top-0 flex items-center justify-center py-8 px-4">
        <ul class="flex flex-wrap items-center gap-4">
          {Object.entries(ELEMENTS).map(([key, value]) => (
            <li key={key}>
              <button
                class="border p-2 min-w-[50px] hover:bg-gray-200 focus:bg-gray-200"
                onClick$={() => (selectedElement.value = value)}
              >
                {key.charAt(0) + key.slice(1).toLowerCase().replace(/_/g, ' ')}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
)
