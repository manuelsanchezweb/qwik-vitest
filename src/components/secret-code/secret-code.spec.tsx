import { createDOM } from '@builder.io/qwik/testing'
import { describe, test, expect } from 'vitest'
import { SecretCode, rightPassword } from './secret-code';


describe('Secret Code', () => {

    test("should render the secret code element", async () => {
        const { render } = await createDOM();
        await render(<SecretCode />);
    });

    test("should render the title element", async () => {
        const { render, screen } = await createDOM();
        await render(<SecretCode />);
        const secretCode = screen.querySelector('[data-test="secretCode"]');
        expect(secretCode?.outerHTML).toContain('Secret Code')
    });

    // test("should render the input for the password", async () => {
    //     const { render, screen } = await createDOM();
    //     await render(<SecretCode />);
    //     const inputPassword = screen.querySelector('[data-test="inputPassword"]') as HTMLInputElement;
    //     expect(inputPassword?.type).toBe('number')
    // });
    
    test("should render the numbers for the password", async () => {
        const { render, screen } = await createDOM();
        await render(<SecretCode />);
        const numberRows = screen.querySelectorAll('[data-test="numberRow"]');
        expect(numberRows).toHaveLength(4);
    });

    test("should render 1 in the input after click", async () => {
        const { render, screen, userEvent } = await createDOM();
        await render(<SecretCode />);

        const buttonOne = screen.querySelector('[data-test="1"]');
        await userEvent(buttonOne, 'click');

        const inputPassword = screen.querySelector('[data-test="inputPassword"]') as HTMLInputElement;
        expect(inputPassword?.value).toBe('1')
    });

    test("should render buttons for delete last digit and submit", async () => {
        const { render, screen, userEvent } = await createDOM();
        await render(<SecretCode />);

        const buttonSubmit = screen.querySelector('[data-test="btnSubmit"]');
        expect(buttonSubmit?.outerHTML).toContain('Submit')

        const buttonDelete = screen.querySelector('[data-test="btnDelete"]');
        expect(buttonDelete?.outerHTML).toContain('Delete')
    });

    test("should delete last digit", async () => {
        const { render, screen, userEvent } = await createDOM();
        await render(<SecretCode />);

        const buttonDelete = screen.querySelector('[data-test="btnDelete"]');
        expect(buttonDelete?.outerHTML).toContain('Delete')

        const buttonTwo = screen.querySelector('[data-test="2"]');
        await userEvent(buttonTwo, 'click');

        const buttonOne = screen.querySelector('[data-test="1"]');
        await userEvent(buttonOne, 'click');

        // 21 -> 2

        await userEvent(buttonDelete, 'click');
        const inputPassword = screen.querySelector('[data-test="inputPassword"]') as HTMLInputElement;
        expect(inputPassword?.value).toBe('2')
    });

    test("should check if right password", async () => {
        const { render, screen, userEvent } = await createDOM();
        await render(<SecretCode />);

        const buttonSubmit = screen.querySelector('[data-test="btnSubmit"]');

        const buttonOne = screen.querySelector('[data-test="1"]');
        await userEvent(buttonOne, 'click');

        const buttonTwo = screen.querySelector('[data-test="2"]');
        await userEvent(buttonTwo, 'click');

        const buttonThree = screen.querySelector('[data-test="3"]');
        await userEvent(buttonThree, 'click');

        const buttonFour = screen.querySelector('[data-test="4"]');
        await userEvent(buttonFour, 'click');

        await userEvent(buttonSubmit, 'click');
        const inputPassword = screen.querySelector('[data-test="inputPassword"]') as HTMLInputElement;

        // Last check 
        expect(inputPassword?.value).toBe(rightPassword)
    });

});