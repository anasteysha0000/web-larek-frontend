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

`AppState`

Интерфейс, описывающий состояние приложения\.

```typescript
export interface AppState {
  // Загружаемые с сервера данные
  products: Map<string, IProduct>;

  // Заполняемые пользователем данные
  selectedProduct: IProduct | null;
  basket: IBasket;
  contacts: IContacts;
  order: IOrder;

  // Состояние интерфейса
  openedModal: AppStateModals;
  modalMessage: string | null;
  isError: boolean;

  // Пользовательские действия
  selectProduct(id: string): void;
  openBasket(): void;
  addProduct(id: string): void;
  deleteProduct(id: string): void;

  // Методы для работы с модальными окнами
  openModal(modal: AppStateModals): void;
  setMessage(message: string | null, isError: boolean): void;
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

## Документация по интерфейсам отображения

IView

Интерфейс описывает отображение для заданного типа данных T. Этот интерфейс включает методы и свойства, необходимые для работы с элементом DOM и его рендеринга.

```typescript
export interface IView<T, S = object> {
	// отображение для заданного типа данных
	element: HTMLElement; // корневой элемент
	copy(settings?: S): IView<T>; // копирующий конструктор
	render(data?: Partial<T>): HTMLElement; // метод рендера
}
```
IViewConstructor

Интерфейс описывает конструктор отображения. Этот интерфейс включает метод создания нового экземпляра отображения на основе переданного корневого элемента и настроек.

```typescript
export interface IViewConstructor<T, S> {
	// конструктор отображения
	// получает на вход клонированный шаблон
	// или существующий элемент,
	// а также настройки для отображения
	new (root: HTMLElement, settings: S): IView<T>;
}
```

## Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:

- **слой представления, отвечает за отображение данных на странице**
- **слой данных, отвечает за хранение и изменение данных**
- **презентер, отвечает за связь представления и данных**

## Базовый код

### Класс Api

Класс Api предоставляет методы для выполнения HTTP-запросов (GET и POST) к базовому URL. Этот класс инкапсулирует общие операции, такие как настройка заголовков и обработка ответов.

## Класс Api

Класс Api представляет собой обертку для выполнения HTTP-запросов с использованием Fetch API. Он поддерживает методы GET и POST (а также другие методы, такие как PUT и DELETE, через метод POST).

### Конструктор

#### constructor(baseUrl: string, options: RequestInit = {})

Создает экземпляр класса Api.

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

### Методы

#### protected handleResponse(response: Response): Promise<object>

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

#### get(uri: string): Promise<object>

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

#### post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>

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

## Класс EventEmitter

Класс EventEmitter представляет собой брокер событий, позволяющий подписываться на события, инициировать их и управлять подписками\. Он поддерживает подписку на события по шаблону \(например, регулярные выражения\) и предоставляет возможность слушать все события\.

### Интерфейсы и Типы

#### Типы

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

#### Интерфейс IEvents

Интерфейс, описывающий методы для управления событиями\.

```typescript
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```

### Конструктор

#### constructor()

Создает экземпляр класса `EventEmitter`\.

```typescript
constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

### Методы

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

#### off(eventName: EventName, callback: Subscriber): void

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

#### emit<T extends object>(eventName: string, data?: T): void

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

#### onAll(callback: (event: EmitterEvent) => void): void

Подписывается на все события\.

- **Параметры:**
  - callback \(\(event: EmitterEvent\) \=\> void\): Функция\-обработчик\.

```typescript
onAll(callback: (event: EmitterEvent) => void) {
    this.on("*", callback);
}
```

#### offAll(): void

Сбрасывает все обработчики\.

```typescript
offAll() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

#### trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void

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
