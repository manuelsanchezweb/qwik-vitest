import { createDOM } from '@builder.io/qwik/testing'
import { describe, it, test, expect } from 'vitest'
import { HexaToRGBConverter } from './hexa-to-rgb-converter';


describe('Hexa To RGB Converter', () => {

    test("should render the hexa to rgb converter element", async () => {
        const { render } = await createDOM();
        await render(<HexaToRGBConverter />);
    });

    it("rgb converter should have title called Hexa to RGB Converter", async () => {
        const { render, screen } = await createDOM();
        await render(<HexaToRGBConverter />);
        const rgbConverter = screen.querySelector('.rgb-converter');
        expect(rgbConverter?.outerHTML).toContain('Hexa To RGB Converter');
    });

    it("rgb converter should have input", async () => {
        const { render, screen } = await createDOM();
        await render(<HexaToRGBConverter />);
        const inputHexa = screen.querySelector('[data-test="inputHex"]') as HTMLInputElement;
        expect(inputHexa?.type).toBe('text');
    });

    it("rgb converter should have button to transform hexa into rgb", async () => {
        const { render, screen } = await createDOM();
        await render(<HexaToRGBConverter />);
        const button = screen.querySelector('[data-test="btnConverter"]') as HTMLButtonElement;
        expect(button).toBeTruthy();
    });

    it("rgb converter should have input with static color #ffce00", async () => {
        const { render, screen } = await createDOM();
        await render(<HexaToRGBConverter />);
        const inputHexa = screen.querySelector('[data-test="inputHex"]') as HTMLInputElement;
        expect(inputHexa?.value).toBe('#ffce00');
    });

    it("rgb converter should transform the color when clicking the button", async () => {
        const { render, screen, userEvent } = await createDOM();
        await render(<HexaToRGBConverter />);

        const button = screen.querySelector('[data-test="btnConverter"]') as HTMLButtonElement;
        await userEvent(button, 'click');

        const result = screen.querySelector('[data-test="resultRGB"]');
        expect(result?.outerHTML).toContain('rgb(255, 206, 0)');
    });

});