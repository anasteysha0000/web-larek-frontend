# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Интерфейсы и типы данных, используемые в приложении

 `ProductCategory`

Тип, представляющий категории продуктов\.

```typescript
export type ProductCategory =
  | 'хард-скил'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'другое';
```

 `ProductPayment`

Тип, представляющий способы оплаты\.

```typescript
export type ProductPayment =
  | 'online' | 'cash';
```

`IProduct`

Интерфейс, описывающий продукт\.

```typescript
export interface IProduct {
  id: string;
  description: string;
  image: string;
  title: string;
  category: ProductCategory;
  price: number;
}
```

`IBasket`

Интерфейс, описывающий корзину покупок\.

```typescript
export interface IBasket {
  itemsBasket: [IProduct, string, number][];
  totalBasket: number | null;
}
```

`IContacts`

Интерфейс, описывающий контактную информацию\.

```typescript
interface IContacts {
  email: string;
  phone: string;
}
```

 `IOrder`

Интерфейс, описывающий заказ\. Наследует `IContacts`\.

```typescript
interface IOrder extends IContacts {
  payment: ProductPayment;
  address: string;
  total: number | null;
  items: string[];
}
```


 `AppStateModals`

Перечисление, описывающее возможные модальные окна в приложении\.

```typescript
enum AppStateModals {
  product = 'modal:product',
  basket = 'modal:basket',
  payment = 'modal:payment',
  contacts = 'modal:contacts',
  postOrder = 'modal:postOrder',
}
```
 `AppStateChanges`

Перечисление, описывающее возможные изменения состояния приложения\.

```typescript
export enum AppStateChanges {
  products = 'change:products',
  modal = 'change:modal',
  modalMessage = 'change:modalMessage',
  selectedProduct = 'change:selectedProduct',
  basket = 'change:basket',
  order = 'change:order',
}
```

`ApiListResponse<Type>`

Тип, представляющий ответ API со списком элементов\.

```typescript
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};
```

`ApiPostMethods`

Тип, представляющий методы HTTP\-запросов для изменения данных\.

```typescript
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

`IPostOrder`

Интерфейс, описывающий ответ API при создании заказа\.

```typescript
export interface IPostOrder {
    id: string;
    totalPrice: number|null;
}
```

`IWebLarekApi`

Интерфейс, описывающий методы API\.

```typescript
export interface IWebLarekApi {
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}
```

 Описание методов интерфейса `AppState`

- `selectProduct(id: string): void`
  
  - Метод для выбора продукта по его идентификатору\.
  
- `openBasket(): void`
  
  - Метод для открытия корзины\.
  
- `addProduct(id: string): void`
  
  - Метод для добавления продукта в корзину по его идентификатору\.
  
- `deleteProduct(id: string): void`
  
  - Метод для удаления продукта из корзины по его идентификатору\.
  
- `openModal(modal: AppStateModals): void`
  
  - Метод для открытия модального окна\.
  
- `setMessage(message: string | null, isError: boolean): void`
  
  - Метод для установки сообщения в модальном окне и флага ошибки\.

Описание методов интерфейса `IWebLarekApi`

- `getProductList(): Promise<ApiListResponse<IProduct>>`
  
  - Метод для получения списка продуктов\.
  
- `getProductItem(): Promise<IProduct>`
  
  - Метод для получения информации о конкретном продукте\.
  
- `postOrder(): Promise<IPostOrder>`
  
  - Метод для создания заказа\.

# Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:

- **слой представления, отвечает за отображение данных на странице**
- **слой данных, отвечает за хранение и изменение данных**
- **презентер, отвечает за связь представления и данных**

## Базовый код


### Класс Api

Класс Api представляет собой обертку для выполнения HTTP-запросов с использованием Fetch API. Он поддерживает методы GET и POST (а также другие методы, такие как PUT и DELETE, через метод POST).

#### Конструктор

- **Параметры:**
  - baseUrl (string): Базовый URL для всех запросов.
  - options (RequestInit, необязательный): Опции для настройки запросов.
```typescript
constructor(baseUrl: string, options: RequestInit = {}) {
    this.baseUrl = baseUrl;
    this.options = {
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers as object ?? {})
        },
        ...options
    };
}
```

#### Методы

##### protected handleResponse(response: Response): Promise<object>

Обрабатывает ответ от сервера.

- **Параметры:**
  - response (Response): Ответ от сервера.

```typescript
protected handleResponse(response: Response): Promise<object> {
    if (response.ok) return response.json();
    else return response.json()
        .then(data => Promise.reject(data.error ?? response.statusText));
}
```

##### get(uri: string): Promise<object>

Выполняет GET-запрос.

- **Параметры:**
  - uri (string): URI для запроса.

```typescript
get(uri: string) {
    return fetch(this.baseUrl + uri, {
        ...this.options,
        method: 'GET'
    }).then(this.handleResponse);
}
```

##### post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>

Выполняет POST-запрос.

- **Параметры:**
  - uri (string): URI для запроса.
  - data (object): Данные для отправки в теле запроса.
  - method (ApiPostMethods, необязательный): Метод запроса (по умолчанию 'POST').

```typescript
post(uri: string, data: object, method: ApiPostMethods = 'POST') {
    return fetch(this.baseUrl + uri, {
        ...this.options,
        method,
        body: JSON.stringify(data)
    }).then(this.handleResponse);
}
```

### Класс EventEmitter

Класс EventEmitter представляет собой брокер событий, позволяющий подписываться на события, инициировать их и управлять подписками\. Он поддерживает подписку на события по шаблону \(например, регулярные выражения\) и предоставляет возможность слушать все события\.

#### Интерфейсы и Типы

##### Типы

- **EventName**: Тип, представляющий имя события\. Может быть строкой или регулярным выражением\.
  ```typescript
  type EventName = string | RegExp;
  ```

- **Subscriber**: Тип, представляющий функцию\-обработчик события\.
  ```typescript
  type Subscriber = Function;
  ```

- **EmitterEvent**: Тип, представляющий объект события с именем и данными\.
  ```typescript
  type EmitterEvent = {
      eventName: string,
      data: unknown
  };
  ```

##### Интерфейс IEvents

Интерфейс, описывающий методы для управления событиями\.

```typescript
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

#### Конструктор

##### constructor()

Создает экземпляр класса `EventEmitter`\.

```typescript
constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

#### Методы

#### on<T extends object>(eventName: EventName, callback: (event: T) => void): void

Устанавливает обработчик на событие\.

- **Параметры:**
  - **eventName** \(EventName\): Имя события или регулярное выражение\.
  - callback \(\(event: T\) \=\> void\): Функция\-обработчик\.

```typescript
on<T extends object>(eventName: EventName, callback: (event: T) => void) {
    if (!this._events.has(eventName)) {
        this._events.set(eventName, new Set<Subscriber>());
    }
    this._events.get(eventName)?.add(callback);
}
```

##### off(eventName: EventName, callback: Subscriber): void

Снимает обработчик с события\.

- **Параметры:**
  - **eventName** \(EventName\): Имя события или регулярное выражение\.
  - callback \(Subscriber\): Функция\-обработчик\.

```typescript
off(eventName: EventName, callback: Subscriber) {
    if (this._events.has(eventName)) {
        this._events.get(eventName)!.delete(callback);
        if (this._events.get(eventName)?.size === 0) {
            this._events.delete(eventName);
        }
    }
}
```

##### emit<T extends object>(eventName: string, data?: T): void

Инициирует событие с данными\.

- **Параметры:**
  - **eventName** \(string\): Имя события\.
  - **data** \(T, необязательный\): Данные события\.

```typescript
emit<T extends object>(eventName: string, data?: T) {
    this._events.forEach((subscribers, name) => {
        if (name instanceof RegExp && name.test(eventName) || name === eventName) {
            subscribers.forEach(callback => callback(data));
        }
    });
}
```

##### onAll(callback: (event: EmitterEvent) => void): void

Подписывается на все события\.

- **Параметры:**
  - callback \(\(event: EmitterEvent\) \=\> void\): Функция\-обработчик\.

```typescript
onAll(callback: (event: EmitterEvent) => void) {
    this.on("*", callback);
}
```

##### offAll(): void

Сбрасывает все обработчики\.

```typescript
offAll() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

##### trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void

Создает триггер\-функцию, генерирующую событие при вызове\.

- **Параметры:**
  - **eventName** \(string\): Имя события\.
  - **context** \(Partial<T\>\): Контекст данных для события\.

```typescript
trigger<T extends object&g

t;(eventName: string, context?: Partial<T>) {
    return (event: object = {}) => {
        this.emit(eventName, {
            ...(event || {}),
            ...(context || {})
        });
    };
}
```
## Модель
### Класс Model
Класс Model является абстрактным базовым классом для создания моделей данных, которые могут генерировать события при изменениях. Он обеспечивает базовую функциональность для работы с данными и событиями.

Конструктор

#### constructor(data: Partial<T>, protected events: IEvents)

Конструктор принимает два параметра:

- data — частичные данные типа T, которые будут использованы для инициализации модели.
- events — экземпляр интерфейса IEvents, который будет использоваться для генерации событий.

Конструктор использует Object.assign для копирования свойств из объекта data в экземпляр модели.
### Методы

#### emitChanges(event: string, payload?: object): void

Метод для генерации событий, когда модель изменяется.

- event — строка, представляющая имя события.
- payload — необязательный объект с дополнительными данными, которые будут переданы вместе с событием.

### Класс AppData
Класс AppData предназначен для управления моделью приложения, включая управление продуктами, корзиной и заказами. Он обеспечивает методы для установки каталога продуктов, управления корзиной, проверки формы заказа и создания заказа.
 
Конструктор

constructor(events: IEvents)


Конструктор принимает один параметр:

- events: IEvents - объект, реализующий интерфейс событий, который используется для управления событиями в приложении.

### Методы

#### setCatalog

setCatalog(items: IProduct[]): void


Устанавливает каталог продуктов.

- items: IProduct[] - массив продуктов, который будет установлен в качестве каталога.

#### setPreview

setPreview(id: string | null): void


Устанавливает продукт для предварительного просмотра.

- id: string | null - идентификатор продукта для предварительного просмотра. Если значение null, предварительный просмотр сбрасывается.

#### setTotal

setTotal(): void

Вычисляет и устанавливает общую стоимость заказа на основе продуктов в корзине.

#### setContacts

setContacts(email: string, phone: string): void


Устанавливает контактные данные пользователя.

- email: string - адрес электронной почты пользователя.
- phone: string - номер телефона пользователя.

#### setPayment

setPayment(type: ProductPayment): void


Устанавливает тип оплаты для заказа.

- type: ProductPayment - тип оплаты (например, "online" или "offline").

#### getProduct

getProduct(cardId: string): IProduct | undefined


Возвращает продукт по его идентификатору.

- cardId: string - идентификатор продукта.
- Возвращает объект продукта или undefined, если продукт не найден.

#### addProduct

addProduct(product: IProduct): void


Добавляет продукт в корзину.

- product: IProduct - объект продукта, который будет добавлен в корзину.

#### removeProduct

removeProduct(product: IProduct): void


Удаляет продукт из корзины.

- product: IProduct - объект продукта, который будет удален из корзины.

#### clearBasket

clearBasket(): void


Очищает корзину, удаляя все продукты из нее.

#### isOrderValidForm

isOrderValidForm(): boolean


Проверяет, является ли форма заказа действительной.

- Возвращает true, если форма заказа действительна, иначе false.

#### isContactsValidForm

isContactsValidForm(): boolean


Проверяет, является ли форма контактных данных действительной.

- Возвращает true, если форма контактных данных действительна, иначе false.

#### setOrderField

setOrderField(field: keyof IOrder, value: string): void


Устанавливает значение поля в заказе.

- field: keyof IOrder - поле заказа, которое необходимо установить.
- value: string - значение, которое необходимо установить для указанного поля.

#### createOrder

createOrder(): void
Создает заказ на основе текущих данных в корзине и контактных данных пользователя.

## Представление
### Класс Component
это абстрактный класс, который предоставляет базовый функционал для управления элементами DOM. Он содержит методы для работы с классами, текстом, состоянием элементов и изображениями. Класс также имеет метод для рендеринга данных. Данный класс расширяет следующие классы приложения:

Page
Card
Basket
Modal
Success
Form

#### constructor(container: HTMLElement)

Конструктор принимает один параметр:

- container — HTML-элемент, который будет использоваться в качестве контейнера для компонента.
### Методы

#### toggleClass(element: HTMLElement, className: string, force?: boolean): void

Метод для добавления или удаления CSS-класса у элемента.

- element — HTML-элемент, у которого нужно добавить или удалить класс.
- className — имя CSS-класса.
- force — необязательный параметр. Если передан, то добавляет класс, если значение true, и удаляет, если значение false.

#### setText(element: HTMLElement, value: unknown): void

Метод для установки текста в элемент.

- element — HTML-элемент, в который нужно установить текст.
- value — значение текста. Может быть любого типа, но обычно строка или число.

#### setDisabled(element: HTMLElement, state: boolean): void

Метод для установки состояния "disabled" у элемента.

- element — HTML-элемент, у которого нужно установить состояние.
- state — логическое значение. Если true, элемент будет отключен; если false, элемент будет включен.

#### protected setImage(element: HTMLImageElement, src: string, alt?: string): void

Метод для установки изображения в элементе <img>.

- element — HTML-элемент <img>, в который нужно установить изображение.
- src — URL изображения.
- alt — необязательный параметр. Альтернативный текст для изображения.

### render(data?: Partial<T>): HTMLElement
метод используется для рендеринга компонента принимает в качестве параметров data - объект, содержащий данные для обновления компонента.

## Класс Basket
 Класс Basket представляет собой компонент корзины для веб-приложения. Он наследуется от базового класса Component и принимает контейнер и объект событий в конструкторе.
 
 constructor(container: HTMLElement, events: EventEmitter)

Конструктор создает экземпляр класса Basket и инициализирует его с заданным контейнером и объектом событий.

#### Параметры
- container: HTMLElement - HTML-элемент, в который будет помещен компонент корзины.
- events: EventEmitter - объект для управления событиями.

### Методы

#### set products(products: HTMLElement[])

Метод для установки списка продуктов в корзине.

#### Параметры

- products: HTMLElement[] - массив HTML-элементов, представляющих продукты.

#### set total(total: number)

Метод для установки общей стоимости товаров в корзине.

#### Параметры

- total: number - общая стоимость товаров.

### set selected(selected: number)

Метод для установки количества выбранных товаров в корзине.

#### Параметры

- selected: number - количество выбранных товаров.

Класс Basket наследует методы от базового класса Component, такие как:
- render() - метод для рендеринга компонента.


### Класс Form
Класс Form является базовым классом для работы с HTML-формами. Он предоставляет методы для обработки изменений в полях ввода, проверки валидности формы и отображения ошибок.

Конструктор

constructor(protected container: HTMLFormElement, protected events: IEvents)

**Параметры:**
- container (HTMLFormElement): HTML-элемент формы, который будет использоваться в качестве контейнера.
- events (IEvents): Объект, предоставляющий возможность генерировать и обрабатывать события.

#### Методы

#### onInputChange
Метод, который вызывается при изменении значения в поле ввода. Этот метод можно переопределить в подклассах для реализации конкретной логики обработки изменений.
protected onInputChange(field: keyof T, value: string): void


**Параметры:**
- field (keyof T): Имя поля ввода, в котором произошло изменение.
- value (string): Новое значение поля ввода.


#### valid (сеттер)
Сеттер для установки валидности формы. Может быть использован для включения или отключения кнопки отправки формы в зависимости от валидности.

set valid(value: boolean)


**Параметры:**
- value (boolean): Значение, указывающее, валидна ли форма.

#### errors (сеттер)
Сеттер для установки ошибок формы. Может быть использован для отображения ошибок пользователю.

set errors(value: string)


**Параметры:**
- value (string): Строка с ошибками.


#### render
Метод для рендеринга состояния формы. Этот метод может быть использован для обновления интерфейса в соответствии с текущим состоянием формы.

render(state: Partial<T> & IFormState): void


**Параметры:**
- state (Partial<T> & IFormState): Объект состояния формы, включающий частичные данные формы и состояние валидности и ошибок.


## Класс Modal

Класс Modal предназначен для работы с модальными окнами. Он предоставляет методы для открытия, закрытия и рендеринга содержимого модального окна.

Конструктор
Конструктор инициализирует объект класса Modal и вызывает конструктор родительского класса Component, передавая ему контейнер модального окна.

constructor(container: HTMLElement, protected events: IEvents)

**Параметры:**
- container (HTMLElement): HTML-элемент, который будет использоваться в качестве контейнера для модального окна.
- events (IEvents): Объект, предоставляющий возможность генерировать и обрабатывать события.


### Методы

#### content (сеттер)
Сеттер для установки содержимого модального окна. При вызове этого метода содержимое модального окна будет обновлено.

set content(value: HTMLElement)


**Параметры:**
- value (HTMLElement): HTML-элемент, который будет установлен как содержимое модального окна.


#### open
Метод для открытия модального окна. Этот метод делает модальное окно видимым и активным.

open(): void


#### close
Метод для закрытия модального окна. Этот метод скрывает модальное окно и делает его неактивным.

close(): void


#### render

render(data: IModalData): HTMLElement


**Параметры:**
- data (IModalData): Объект данных для рендеринга модального окна, содержащий HTML-элемент, который будет установлен как содержимое модального окна.

## Класс Success

Класс Success предназначен для отображения успешного выполнения операции и предоставляет метод для обработки клика по элементу.

### Интерфейсы

#### ISuccess

interface ISuccess {
  total: number;
}


**Описание:**
Интерфейс ISuccess описывает данные, которые будут переданы компоненту Success. 
#### ISuccessActions

interface ISuccessActions {
  onClick: () => void;
}


**Описание:**
Интерфейс ISuccessActions описывает действия, которые могут быть выполнены компонентом Success. Он содержит одно свойство:
- onClick (): Функция, которая будет вызвана при клике на определенный элемент.

Конструктор
Конструктор инициализирует объект класса Success и вызывает конструктор родительского класса Component, передавая ему контейнер для компонента. Также он принимает объект действий, который будет использоваться для обработки событий.

constructor(container: HTMLElement, actions: ISuccessActions)


**Параметры:**
- container (HTMLElement): HTML-элемент, который будет использоваться в качестве контейнера для компонента Success.
- actions (ISuccessActions): Объект, содержащий действия, которые могут быть выполнены компонентом Success.


### Методы

#### render
Метод для рендеринга содержимого компонента Success. Этот метод принимает объект данных и возвращает HTML-элемент, представляющий отрендеренный компонент.

render(data: ISuccess): HTMLElement


**Параметры:**
- data (ISuccess): Объект данных для рендеринга компонента Success, содержащий общее количество успешных операций.

## Класс Card

Класс Card предназначен для отображения карточки продукта и предоставляет методы для установки и получения различных свойств карточки, таких как заголовок, цена, изображение и описание.

### Интерфейсы

#### ICardActions
Тип ICardActions описывает действия, которые могут быть выполнены компонентом Card. Он содержит одно свойство:
- onClick (event: MouseEvent): Функция, которая будет вызвана при клике на определенный элемент.

export type ICardActions = {
  onClick: (event: MouseEvent) => void;
};

Конструктор
Конструктор инициализирует объект класса Card и вызывает конструктор родительского класса Component, передавая ему контейнер для компонента. Также он принимает объект действий, который будет использоваться для обработки событий.

constructor(element: HTMLElement, state: ICardActions)


**Параметры:**
- element (HTMLElement): HTML-элемент, который будет использоваться в качестве контейнера для компонента Card.
- state (ICardActions): Объект, содержащий действия, которые могут быть выполнены компонентом Card.

### Методы

#### set titleCard(value: string)
Метод для установки заголовка карточки.

set titleCard(value: string)


**Параметры:**
- value (string): Значение заголовка карточки.

#### get titleCard(): string
Метод для получения текущего заголовка карточки.

get titleCard(): string


#### set priceCard(value: string)
Метод для установки цены карточки.

set priceCard(value: string)


**Параметры:**
- value (string): Значение цены карточки.

#### get priceCard(): string
Метод для получения текущей цены карточки.

get priceCard(): string

#### set imageCard(value: string)
Метод для установки изображения карточки.

set imageCard(value: string)


#### set descriptionCard(value: string)
Метод для установки описания карточки.
set descriptionCard(value: string)

**Параметры:**
- value (string): Описание карточки.


#### get descriptionCard(): string
Метод для получения текущего описания карточки.

get descriptionCard(): string


#### set categoreCard(value: string)

Метод для установки категории карточки.

set categoreCard(value: string)


**Параметры:**
- value (string): Категория карточки.


#### get categoreCard(): string
Метод для получения текущей категории карточки.

get categoreCard(): string


#### protected setDescriptionCard(element: HTMLElement, value: unknown)
Защищенный метод для установки описания карточки в указанный HTML-элемент.

protected setDescriptionCard(element: HTMLElement, value: unknown)


**Параметры:**
- element (HTMLElement): HTML-элемент для описания.
- value (unknown): Значение описания.


#### protected setImageCard(element: HTMLImageElement, src: string, alt: string)
Защищенный метод для установки изображения карточки с указанным URL и альтернативным текстом в указанный HTML-элемент.
protected setImageCard(element: HTMLImageElement, src: string, alt: string)

**Параметры:**
- element (HTMLImageElement): HTML-элемент изображения.
- src (string): URL изображения.
- alt (string): Альтернативный текст изображения.

