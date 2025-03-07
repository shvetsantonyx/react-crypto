# Crypto app

Приложение для отслеживания кейса покупок крипты. Оображает текущий актуальный курс популярных криптовалют, разницу покупки с текущим курсом, строит диаграмму и таблицу.

## Содержание

-   [Технологии](#технологии)
-   [Начало работы](#начало-работы)
-   [To do](#to-do)

## Технологии

-   [React](https://react.dev/)
-   [TypeScript](https://www.typescriptlang.org/)
-   [Ant Design](https://ant.design/)
-   [react-chartjs-2](https://react-chartjs-2.js.org/)
-   [Express.js](https://expressjs.com/)

### Требования

Для установки и запуска проекта, необходим [NodeJS](https://nodejs.org/) v22+.
Также необходим ts-node для запуска backend-сервера.

### Начало работы

### Установка зависимостей

Для установки ts-node и зависимостей, выполните команды:

```sh
npm install -g ts-node
cd .\server\
npm i
cd ..
cd .\frontend\
npm i
```

### Создание билда

Чтобы выполнить production сборку, выполните команду:

```sh
npm run build
```

### Запуск Development сервера

Чтобы запустить сервер для разработки, выполните команду:

```sh
cd ..
cd .\server\
npx ts-node .\src\index.ts
```

## To do

-   [ ] Добавить реальные запросы к серверу
