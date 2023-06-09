import { createDOM } from '@builder.io/qwik/testing'
import { describe, test } from 'vitest'
import { HexaToRGBConverter } from './hexa-to-rgb-converter';


describe('Hexa To RGB Converter', () => {

    test("should render the hexa to rgb converter element", async () => {
        const { render } = await createDOM();
        await render(<HexaToRGBConverter />);
    });

});