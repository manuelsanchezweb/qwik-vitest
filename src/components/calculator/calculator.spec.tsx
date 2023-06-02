import { createDOM } from '@builder.io/qwik/testing'
import { describe, expect, test, it, vi, beforeAll } from 'vitest'
import { Calculator, numbers, operations } from './calculator';

// beforeAll(() => {
//     // mock useStore to start with count of 1 instead of 0
//     vi.mock("@builder.io/qwik", async () => {
//       const qwik = await vi.importActual<typeof import("@builder.io/qwik")>(
//         "@builder.io/qwik"
//       );
//       return {
//         ...qwik, // return most of the module unchanged
//         // leverage bind to set the initial state of useStore
//         useSignal: qwik.useSignal.bind("currentValue", ''),
//       };
//     });
//   });


describe('Calculator', () => {

    test("should render the calculator", async () => {
        const { render } = await createDOM();
        await render(<Calculator />);
    });

    test("should render the calculator with word Calculator inside", async () => {
        const { screen, render } = await createDOM();
        await render(<Calculator />);
        const calculator = screen.querySelector('.calculator') as HTMLElement;
        expect(calculator.outerHTML).toContain('Calculator');
    });

    test("should render numbers", async () => {
        const { screen, render } = await createDOM();
        await render(<Calculator />);
        const calculator = screen.querySelector('.calculator') as HTMLElement;

        numbers.forEach(number => {
            expect(calculator.outerHTML).toContain(number);
        })
    });

    it('should render 4 rows', async () => {
        const { screen, render } = await createDOM();
        await render(<Calculator />)
    
        // Los selectores pueden cambiar, por eso es mejor usar roles
        const rows = screen.querySelectorAll('[data-testid="row"]')
        expect(rows).toHaveLength(4)
    })

    it('should render operations', async () => {
        const { screen, render } = await createDOM();
        await render(<Calculator />)
        const calculator = screen.querySelector('.calculator') as HTMLElement;
    
        operations.forEach((operation) => {
            expect(calculator.outerHTML).toContain(operation)
        })
    })

    it('should render an input type text', async () => {
        const { screen, render } = await createDOM();
        await render(<Calculator />)
        const input = screen.querySelector('[data-testid="number"]') as HTMLInputElement;

        expect(input?.type).toBe('text')
    })

    it('should take user input after clicking a number', async () => {
        const { screen, render, userEvent } = await createDOM();
        await render(<Calculator />)
        const input = screen.querySelector('[data-testid="number"]') as HTMLInputElement;
        const number = screen.querySelector('[data-testid="4"]') as HTMLButtonElement;

        await userEvent(number, "click");
        
        expect(input?.value).toBe(number.textContent);
    })

    it('should take user input after clicking several numbers', async () => {
        const { screen, render, userEvent } = await createDOM();
        await render(<Calculator />)
        
        const input = screen.querySelector('[data-testid="number"]') as HTMLInputElement;

        const number1 = screen.querySelector('[data-testid="1"]') as HTMLButtonElement;
        await userEvent(number1, "click");
        const number2 = screen.querySelector('[data-testid="2"]') as HTMLButtonElement;
        await userEvent(number2, "click");
        const number3 = screen.querySelector('[data-testid="3"]') as HTMLButtonElement;
        await userEvent(number3, "click");
        
        expect(input?.value).toBe('123')
    })

    it('should show user input after clicking numbers and operations', async () => {
        const { screen, render, userEvent } = await createDOM();
        await render(<Calculator />)
        
        const input = screen.querySelector('[data-testid="number"]') as HTMLInputElement;

        const number1 = screen.querySelector('[data-testid="1"]') as HTMLButtonElement;
        await userEvent(number1, "click");

        const plus = screen.querySelector('[data-testid="operation+"]') as HTMLButtonElement;
        await userEvent(plus, "click");

        const number3 = screen.querySelector('[data-testid="3"]') as HTMLButtonElement;
        await userEvent(number3, "click");
        
        expect(input?.value).toBe('1+3')
    })

    it('should calculate based on user input and show the result', async () => {
        const { screen, render, userEvent } = await createDOM();
        await render(<Calculator />)
        
        const input = screen.querySelector('[data-testid="number"]') as HTMLInputElement;

        const number1 = screen.querySelector('[data-testid="1"]') as HTMLButtonElement;
        await userEvent(number1, "click");

        const plus = screen.querySelector('[data-testid="operation+"]') as HTMLButtonElement;
        await userEvent(plus, "click");

        const number3 = screen.querySelector('[data-testid="3"]') as HTMLButtonElement;
        await userEvent(number3, "click");

        const equal = screen.querySelector('[data-testid="operation="]') as HTMLButtonElement;
        await userEvent(equal, "click");
        
        expect(input?.value).toBe('4')
    })


})
