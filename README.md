## Фронтенд задания
[Демо-страница](https://thenech.github.io/shri-2018_1/index.html)

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
- [Ссылка](https://thenech.github.io/shri-2018_1/pages/video.html) на демо.
- Запустить тестовые потоки по [инструкции](https://github.com/mad-gooze/shri-2018-2-multimedia-homework/blob/master/streams/README.md).
- Видео разворачиваются по клику на расстояние между хедером и футером.
- Соответствующие input'ы управляют яркостью и контрастностью видео.
- Анализатор звука отображает максимальное значение из получаемого массива.

#### Архитектура
- Реализованная [библиотека](https://github.com/TheNech/shri-2018-flux) применена на странице ["Видеонаблюдение"](./pages/video.html)
- Порядок запуска:
    1. Клонировать репозиотрий с подмодулями `git clone --recursive https://github.com/TheNech/shri-2018_1/tree/flux`
    2. Установка модулей `npm install`
    3. Сборка JS-файлов `npm run build`
    4. Запуск тестовых потоков по [инструкции](https://github.com/mad-gooze/shri-2018-2-multimedia-homework/blob/master/streams/README.md)
    5. [Страница "Видеонаблюдение"](./pages/video.html)
