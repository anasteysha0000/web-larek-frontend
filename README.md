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
это абстрактный класс, который предоставляет базовый функционал для управления элементами DOM. Он содержит методы для работы с классами, текстом, состоянием элементов и изображениями. Класс также имеет метод для рендеринга данных.

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
