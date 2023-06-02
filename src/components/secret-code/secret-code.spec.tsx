import { createDOM } from '@builder.io/qwik/testing'
import { describe, test } from 'vitest'
import { SecretCode } from './secret-code';


describe('Calculator', () => {

    test("should render the secret code element", async () => {
        const { render } = await createDOM();
        await render(<SecretCode />);
    });

});