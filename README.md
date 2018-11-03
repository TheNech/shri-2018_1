## Фронтенд задания

#### Адаптивная верстка
- Для удобства разработки стили разбиты на несколько файлов.
- Макет отображал ширину 1366px, поэтому не уверен, насколько удобно смотреть с 1920px.
- В разметке по максимуму использованы CSS Grid'ы (не знаю, на сколько это верный подход).
- За расположение элементов в карточке отвечает CSS Grid. Не удалось подобрать такое значение
row-gap, при котром промежутки зависили от высоты карточки.
- Большая карточка на десктопе/ноутбуке занимает минимум три строки.
- Количество строк в заголовке ограничивается через не кросс-браузерный способ.
- Не могу отловить баг отображения карточки с музыкой: название и шкала воспроизведения периодически выходят за пределы карточки.
- Попытка приименения адаптивных изображений в карточке с пылесосом.
- Пока без шаблонизатора...

#### Работа с сенсорным вводом
- Сенсорное управление реализоввано на карточке с пылесосом.
- Масштаб картинки 150% для возможности перемещения влево-вправо без увеличения.
- Зум работает от 150%.
- Полифил подключен, но нет возможности протестировать жесты на iOS.
- [Cкрипт](./scripts/index.js)

#### Мультимедиа

#### Типизация
- Добавлены файлы *scripts/index.ts* и *scripts/video.ts*
- Запуск TS компилятора в режиме *watch* `npm run tsc-dev`
- Компиляция TS-файлов `npm run tsc`
- Скомпилированные файлы находятся в директории *dist/*
