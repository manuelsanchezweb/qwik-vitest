<div align="center">

<img src="./public/test.png" width="500" alt="Home Collabender" />

# 💪 Qwik & Vitest: practicando

</div>

## Cómo funciona

Como ya sabéis, la idea es escribir los unit test antes/mientras estás haciendo el componente, y hacer que vaya pasando distintos tests para intentar abarcar todos los posibles casos de uso posibles. En este repo tengo varios ejercicios en los que vemos cómo hacer unit test de algunos componentes.

- ➕ [Calculadora](/src/components/calculator/calculator.spec.tsx)
- 🖍️ [Hexa to RGB Converter - In Progress](/src/components/hexa-to-rgb-converter/hexa-to-rgb-converter.spec.tsx)
- 🕵️‍♂️ [Secret Code - In Progress](/src/components/secret-code/secret-code.spec.tsx)

## Usar el test environment

Tenemos un montón de scripts en el `package.json` para probar el testing de qwik con vitest. En lo personal me he encontrado que da un poco de fallo todavía (cuando actualizas el componente, los tests se quedan con el resultado anterior y hace falta interrumpir el test y volverlo a correr), pero el comando `test.unit` debería funcionar para lo que queremos hacer. Para mirar el porcentaje cubierto con todos los tests, podemos correr `vitest run --coverage`. Así que para empezar con el repo puedes hacer lo siguiente después de clonar / fork el repo.

- `npm i`
- `npm run dev`
- `npm run test.unit`
