# Sprint 4

Esta aplicación web recibe chistes de dos endpoints diferentes que los usuarios pueden puntuar de 1 a 3. También dispone de la información del clima actual de la ciudad de Barcelona usando otra API.

## 🛠️ Instructions

Para instalar este proyecto localmente sigue estos pasos

1. **Clonar el respositorio:**

```bash
git clone https://github.com/ezequielgdl/sprint-4
```

2. **Navegar al directorio.**

3. **Abrir el proyecto en tu editor preferido.**

4. **Abrir `index.html` en tu servidor local preferido.**

5. **Para editar el código es necesario instalar los modulos Node.js necesarios, usando el siguiente comando:**

```bash
npm i typescript --save-dev
```

6. **Para compilar el archivo TypeScript, debes usar el compilador tsc de TypeScript con el siguiente comando:**

```bash
tsc index.ts
```

7. **Utilizar el siguiente comando para guardar los cambios cada vez que haces un cambio:**

```bash
npx tsc -w
```

## 🚀 Uso

1. Abrir `index.html` en el browser.
2. Un chiste random y la información del clima de Barcelona aparecerá en pantalla.
3. Puedes puntuar el chiste con los emojis. Los resultados serán guardados en un array llamado jokeReport que puedes ver en la consola. Puedes cambiar la puntuación si te arrepientes.
4. Clickeando en "Next Joke" recibirás otro chiste.
5. Disfruta de los chistes y que tengas un buen día!

## 🔧 Features

- Utiliza los chistes de dos APIs diferentes: [icanhazdadjoke](https://icanhazdadjoke.com/) and [JokeAPI](https://v2.jokeapi.dev/).
- Permite a los usuarios puntuar con emojis.
- Utiliza la API para mostrar el clima[OpenWeatherMap](https://api.openweathermap.org/).
- Cambio dinámico de formas de fondo guardados localmente.

## 💻 Tecnologías

- HTML
- CSS
- TypeScript
