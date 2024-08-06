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




```typescript
export type ProductCategory =
  | 'хард-скил'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'другое';
```
Тип, представляющий категории продуктов.



```typescript
export type ProductPayment =
  | 'online' | 'cash';
```
Тип, представляющий способы оплаты.



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
Интерфейс, описывающий продукт.

```typescript
export interface IBasket {
  itemsBasket: [IProduct, string, number][];
  totalBasket: number | null;
}
```
Интерфейс, описывающий корзину покупок.

```typescript
interface IContacts {
  email: string;
  phone: string;
}
```
Интерфейс, описывающий контактную информацию.




```typescript
interface IOrder extends IContacts {
  payment: ProductPayment;
  address: string;
  total: number | null;
  items: string[];
}
```
Интерфейс, описывающий заказ. Наследует `IContacts`.


```typescript
enum AppStateModals {
  product = 'modal:product',
  basket = 'modal:basket',
  payment = 'modal:payment',
  contacts = 'modal:contacts',
  postOrder = 'modal:postOrder',
}
```
Перечисление, описывающее возможные модальные окна в приложении.




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
Перечисление, описывающее возможные изменения состояния приложения.




```typescript
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};
```
Тип, представляющий ответ API со списком элементов.




```typescript
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```
Тип, представляющий методы HTTP-запросов для изменения данных.




```typescript
export interface IPostOrder {
    id: string;
    totalPrice: number|null;
}
```
Интерфейс, описывающий ответ API при создании заказа.




```typescript
export interface IWebLarekApi {
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}
```
Интерфейс, описывающий методы API.

  ```typescript
  type EventName = string | RegExp;
  ```
Тип, представляющий имя события. Может быть строкой или регулярным выражением.


  ```typescript
  type Subscriber = Function;
  ```
Тип, представляющий функцию - обработчик события.

  ```typescript
  type EmitterEvent = {
      eventName: string,
      data: unknown
  };
  ```
  Тип, представляющий объект события с именем и данными.



```typescript
export interface IEvents {
    on<T extends object>(event: EventName, callback: (data: T) => void): void;
    emit<T extends object>(event: string, data?: T): void;
    trigger<T extends object>(event: string, context?: Partial<T>): (data: T) => void;
}
```
Интерфейс, описывающий методы для управления событиями.

```typescript
export type ICardActions = {
  onClick: (event: MouseEvent) => void;
};
```
Тип ICardActions описывает действия, которые могут быть выполнены компонентом Card. Он содержит одно свойство:

- `onClick` : (event: MouseEvent) - Функция, которая будет вызвана при клике на определенный элемент.

```typescript
interface ISuccess {
  total: number;
}
```

Интерфейс ISuccess описывает данные, которые будут переданы компоненту Success. 

```typescript
interface ISuccessActions {
  onClick: () => void;
}
```

Интерфейс ISuccessActions описывает действия, которые могут быть выполнены компонентом Success. Он содержит одно свойство:

- onClick (): Функция, которая будет вызвана при клике на определенный элемент.

# Архитектура приложения
Код приложения разделен на слои согласно парадигме MVP:

- слой представления, отвечает за отображение данных на странице.
- слой данных, отвечает за хранение и изменение данных.
- презентер, отвечает за связь представления и данных.

# Базовый код


## Класс Api

Класс Api представляет собой обертку для выполнения HTTP-запросов с использованием Fetch API. Он поддерживает методы GET и POST (а также другие методы, такие как PUT и DELETE, через метод POST).

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
  - baseUrl (string): Базовый URL для всех запросов.
  - options (RequestInit, необязательный): Опции для настройки запросов.

#### Методы

```typescript
protected handleResponse(response: Response): Promise<object>
```
Обрабатывает ответ от сервера.
  - response (Response): Ответ от сервера.

```typescript
protected handleResponse(response: Response): Promise<object> {
    if (response.ok) return response.json();
    else return response.json()
        .then(data => Promise.reject(data.error ?? response.statusText));
}
```
```typescript
get(uri: string): Promise<object>
```
Выполняет GET-запрос.
  - uri (string): URI для запроса.

```typescript
get(uri: string) {
    return fetch(this.baseUrl + uri, {
        ...this.options,
        method: 'GET'
    }).then(this.handleResponse);
}
```

```typescript
post(uri: string, data: object, method: ApiPostMethods = 'POST'): Promise<object>
```
Выполняет POST-запрос.
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
## Класс WebLarekApi
Интерфейс IWebLarekApi определяет методы для взаимодействия с API интернет-магазина. Эти методы включают получение списка продуктов, получение отдельного продукта и отправку заказа. Наследует класс Api и имплементирует интерфейс IWebLarekApi.

```typescript
constructor(baseUrl: string, options: RequestInit){
        super(baseUrl,options)
    }
```
 - baseUrl: string - Базовый URL для API.
  - options: RequestInit - Опции для настройки HTTP-запросов (например, заголовки, метод, тело запроса и т.д.).

#### Методы
```typescript
getProductList(id:string): Promise<ApiListResponse<IProduct>> {}
```
Метод для получения списка продуктов по идентификатору.

```typescript
getProductItem(): Promise<IProduct>
```
Метод для получения информации о конкретном продукте.
```typescript
postOrder(order: IPostOrder): Promise<IPostOrder>
```
Метод для отправки POST-запроса.


## Класс EventEmitter

Класс EventEmitter представляет собой брокер событий, позволяющий подписываться на события, инициировать их и управлять подписками\. Он поддерживает подписку на события по шаблону \(например, регулярные выражения\) и предоставляет возможность слушать все события\.

```typescript
constructor() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```

#### Методы
```typescript
on<T extends object>(eventName: EventName, callback: (event: T) => void): void
```
Устанавливает обработчик на событие.
  - eventName (EventName): Имя события или регулярное выражение.
  - callback ((event: T) => void ): Функция -обработчик.

```typescript
on<T extends object>(eventName: EventName, callback: (event: T) => void) {
    if (!this._events.has(eventName)) {
        this._events.set(eventName, new Set<Subscriber>());
    }
    this._events.get(eventName)?.add(callback);
}
```
```typescript
off(eventName: EventName, callback: Subscriber): void
```
Снимает обработчик с события.
  - eventName (EventName): Имя события или регулярное выражение.
  - callback (Subscriber): Функция -обработчик.

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
```typescript
emit<T extends object>(eventName: string, data?: T): void
```
Инициирует событие с данными.
  - eventName (string): Имя события.
  - data (T, необязательный): Данные события.

```typescript
emit<T extends object>(eventName: string, data?: T) {
    this._events.forEach((subscribers, name) => {
        if (name instanceof RegExp && name.test(eventName) || name === eventName) {
            subscribers.forEach(callback => callback(data));
        }
    });
}
```
```typescript
 onAll(callback: (event: EmitterEvent) => void): void
```
Подписывается на все события.
  - callback ((event: EmitterEvent) => void): Функция-обработчик.

```typescript
onAll(callback: (event: EmitterEvent) => void) {
    this.on("*", callback);
}
```

```typescript
offAll() {
    this._events = new Map<EventName, Set<Subscriber>>();
}
```
Сбрасывает все обработчики.
```typescript
trigger<T extends object>(eventName: string, context?: Partial<T>): (data: T) => void
```
Создает триггер-функцию, генерирующую событие при вызове\.

  - eventName (string): Имя события.
  - context (Partial<T>): Контекст данных для события.

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
# Модель
## Класс Model
Класс Model является абстрактным базовым классом для создания моделей данных, которые могут генерировать события при изменениях. Он обеспечивает базовую функциональность для работы с данными и событиями.

```typescript
constructor(data: Partial<T>, protected events: IEvents)
```
- data — частичные данные типа T, которые будут использованы для инициализации модели.
- events — экземпляр интерфейса IEvents, который будет использоваться для генерации событий.

Конструктор использует Object.assign для копирования свойств из объекта data в экземпляр модели.
#### Методы
```typescript
emitChanges(event: string, payload?: object): void
```
Метод для генерации событий, когда модель изменяется.

- event — строка, представляющая имя события.
- payload — необязательный объект с дополнительными данными, которые будут переданы вместе с событием.

### Класс AppData
Класс AppData предназначен для управления моделью приложения, включая управление продуктами, корзиной и заказами. Он обеспечивает методы для установки каталога продуктов, управления корзиной, проверки формы заказа и создания заказа.
 

```typescript
constructor(events: IEvents)
```
- events: IEvents - объект, реализующий интерфейс событий, который используется для управления событиями в приложении.
#### Поля
- _products: IProduct[] представляет собой массив продуктов доступных в каталоге.
- _order:IOrder представляет собой объект заказа. Оно содержит информацию о текущем заказе, включая способ оплаты, контактные данные, адрес доставки, список товаров в заказе и общую стоимость. Поле инициализируется значениями по умолчанию.
- _basket: IBasket[]  представляет собой массив товаров, добавленных в корзину.
- _preview: string | null хранит идентификатор продукта, который находится в режиме предварительного просмотра.
- _events: IEvents представляет собой объект для работы с событиями.
- _formErrors: FormErrors представляет собой объект, содержащий ошибки формы. 
#### Методы

```typescript
setCatalog(items: IProduct[]): void
```
Устанавливает каталог продуктов.

- items: IProduct[] - массив продуктов, который будет установлен в качестве каталога.

```typescript
setPreview(id: string | null): void
```
Устанавливает продукт для предварительного просмотра.

- id: string | null - идентификатор продукта для предварительного просмотра. Если значение null, предварительный просмотр сбрасывается.

```typescript
setTotal(): void
```
Вычисляет и устанавливает общую стоимость заказа на основе продуктов в корзине.

```typescript
setContacts(email: string, phone: string): void
```

Устанавливает контактные данные пользователя.


```typescript
setPayment(type: ProductPayment): void
```
Устанавливает тип оплаты для заказа.

- type: ProductPayment - тип оплаты ("online" или "cash").

```typescript
getProduct(cardId: string): IProduct | undefined
```
Возвращает продукт по его идентификатору.

- cardId: string - идентификатор продукта.
- Возвращает объект продукта или undefined, если продукт не найден.

```typescript
addProduct(product: IProduct): void
```
Добавляет продукт в корзину.

- product: IProduct - объект продукта, который будет добавлен в корзину.

```typescript
removeProduct(product: IProduct): void
```

Удаляет продукт из корзины.

- product: IProduct - объект продукта, который будет удален из корзины.

```typescript
clearBasket(): void
```

Очищает корзину, удаляя все продукты из нее.

```typescript
isOrderValidForm()
```

Проверяет, является ли форма заказа действительной.

- Возвращает true, если форма заказа действительна, иначе false.



```typescript
setOrderField(field: keyof IOrder, value: string): void
```

Устанавливает значение поля в заказе.

- field: keyof IOrder - поле заказа, которое необходимо установить.
- value: string - значение, которое необходимо установить для указанного поля.



# Отображение
## Класс Component
это абстрактный класс, который предоставляет базовый функционал для управления элементами DOM. Он содержит методы для работы с классами, текстом, состоянием элементов и изображениями. Класс также имеет метод для рендеринга данных. Данный класс расширяет следующие классы приложения:

- `Page`
- `Card`
- `Basket`
- `Modal`
- `Success`
- `Form`

```typescript
constructor(container: HTMLElement)
```
- container — HTML-элемент, который будет использоваться в качестве контейнера для компонента.
#### Методы

```typescript
toggleClass(element: HTMLElement, className: string, force?: boolean): void
```

Метод для добавления или удаления CSS-класса у элемента.

- element — HTML-элемент, у которого нужно добавить или удалить класс.
- className — имя CSS-класса.
- force — необязательный параметр. Если передан, то добавляет класс, если значение true, и удаляет, если значение false.

```typescript
setText(element: HTMLElement, value: unknown): void
```

Метод для установки текста в элемент.

- element — HTML-элемент, в который нужно установить текст.
- value — значение текста. Может быть любого типа, но обычно строка или число.
```typescript
setDisabled(element: HTMLElement, state: boolean): void
```

Метод для установки состояния "disabled" у элемента.

- element — HTML-элемент, у которого нужно установить состояние.
- state — логическое значение. Если true, элемент будет отключен; если false, элемент будет включен.

```typescript
protected setImage(element: HTMLImageElement, src: string, alt?: string): void
```

Метод для установки изображения в элементе <img>.

- element — HTML-элемент <img>, в который нужно установить изображение.
- src — URL изображения.
- alt — необязательный параметр. Альтернативный текст для изображения.

```typescript
render(data?: Partial<T>): HTMLElement
```

метод используется для рендеринга компонента принимает в качестве параметров data - объект, содержащий данные для обновления компонента.

## Класс Basket

 Класс Basket представляет собой компонент корзины для веб-приложения. Он наследуется от базового класса Component и принимает контейнер и объект событий в конструкторе.

Наследует методы от базового класса Component, такие как:

- render() - метод для рендеринга компонента.


 ```typescript
 constructor(container: HTMLElement, events: EventEmitter)
```

Конструктор создает экземпляр класса Basket и инициализирует его с заданным контейнером и объектом событий.

- `container`: HTMLElement - HTML-элемент, в который будет помещен компонент корзины.
- `events`: EventEmitter - объект для управления событиями.
#### Поля
- _list: HTMLElement представляет собой HTML-элемент, который будет использоваться для отображения списка продуктов в корзине.
- _total: HTMLElement   представляет собой HTML-элемент, который будет использоваться для отображения общей стоимости товаров в корзине.
- _button: HTMLElement  представляет собой HTML-элемент, который будет использоваться для выполнения действия, связанного с корзиной.

#### Методы

```typescript
set products(products: HTMLElement[])
```

Метод для установки списка продуктов в корзине.

- products: HTMLElement[] - массив HTML-элементов, представляющих продукты.

```typescript
set total(total: number)
```
Метод для установки общей стоимости товаров в корзине.

- total: number - общая стоимость товаров.

```typescript
set selected(selected: number)
```

Метод для установки количества выбранных товаров в корзине.

- selected: number - количество выбранных товаров.


## Класс Form
Класс Form является базовым классом для работы с HTML-формами. Он предоставляет методы для обработки изменений в полях ввода, проверки валидности формы и отображения ошибок.

```typescript
constructor(protected container: HTMLFormElement, protected events: IEvents)
```
- `container`: HTMLFormElement: HTML-элемент формы, который будет использоваться в качестве контейнера.
- `events`: IEvents: Объект, предоставляющий возможность генерировать и обрабатывать события.
#### Поля
 - _submit: HTMLButtonElement представляет собой кнопку отправки формы.
 - _errors: HTMLButtonElement  представляет собой HTML-элемент, который используется для отображения сообщений об ошибках.
#### Методы

```typescript
protected onInputChange(field: keyof T, value: string): void
```

Метод, который вызывается при изменении значения в поле ввода. Этот метод можно переопределить в подклассах для реализации конкретной логики обработки изменений.

- field: keyof T -  Имя поля ввода, в котором произошло изменение.
- value: string -  Новое значение поля ввода.

```typescript
set valid(value: boolean)
```

Сеттер для установки валидности формы. Может быть использован для включения или отключения кнопки отправки формы в зависимости от валидности.

- value: boolean - Значение, указывающее, валидна ли форма.

```typescript
set errors(value: string)
```

Сеттер для установки ошибок формы. Может быть использован для отображения ошибок пользователю.

- value: string - Строка с ошибками.

```typescript
render(state: Partial<T> & IFormState): void
```

Метод для рендеринга состояния формы. Этот метод может быть использован для обновления интерфейса в соответствии с текущим состоянием формы.

- state: Partial<T> & IFormState -  Объект состояния формы, включающий частичные данные формы и состояние валидности и ошибок.


## Класс Modal

Класс Modal предназначен для работы с модальными окнами. Он предоставляет методы для открытия, закрытия и рендеринга содержимого модального окна.

```typescript
constructor(container: HTMLElement, protected events: IEvents)
```

- container: HTMLElement -  HTML-элемент, который будет использоваться в качестве контейнера для модального окна.
- events: IEvents - Объект, предоставляющий возможность генерировать и обрабатывать события.

#### Поля 
- _closeButton: HTMLButtonElement  представляет собой кнопку для закрытия модального окна.
- _content: HTMLButtonElement  представляет собой HTML-элемент, который будет содержать основной контент модального окна.
#### Методы

```typescript
set content(value: HTMLElement)
```

Сеттер для установки содержимого модального окна. При вызове этого метода содержимое модального окна будет обновлено.


- value: HTMLElement - HTML-элемент, который будет установлен как содержимое модального окна.

```typescript
open(): void
```

Метод для открытия модального окна. Этот метод делает модальное окно видимым и активным.

```typescript
close(): void
```

Метод для закрытия модального окна. Этот метод скрывает модальное окно и делает его неактивным.

```typescript
render(data: IModalData): HTMLElement
```

- data: IModalData - Объект данных для рендеринга модального окна, содержащий HTML-элемент, который будет установлен как содержимое модального окна.

## Класс Success

Класс Success предназначен для отображения успешного выполнения операции и предоставляет метод для обработки клика по элементу.

```typescript
constructor(container: HTMLElement, actions: ISuccessActions)
```

- container: HTMLElement - HTML-элемент, который будет использоваться в качестве контейнера для компонента Success.
- actions: ISuccessActions - Объект, содержащий действия, которые могут быть выполнены компонентом Success.


#### Поля
- _close: HTMLButtonElement  представляет собой HTML-элемент, который используется для закрытия компонента.

#### Методы

```typescript
render(data: ISuccess): HTMLElement
```

Метод для рендеринга содержимого компонента Success. Этот метод принимает объект данных и возвращает HTML-элемент, представляющий отрендеренный компонент.

- data: ISuccess - Объект данных для рендеринга компонента Success, содержащий общее количество успешных операций.

## Класс Card

Класс Card предназначен для отображения карточки продукта и предоставляет методы для установки и получения различных свойств карточки, таких как заголовок, цена, изображение и описание.

```typescript
constructor(element: HTMLElement, state: ICardActions)
```

- element: HTMLElement - HTML-элемент, который будет использоваться в качестве контейнера для компонента Card.
- state: ICardActions - Объект, содержащий действия, которые могут быть выполнены компонентом Card.



#### Поля
  - _id: HTMLElement представляет собой HTML-элемент, который используется для хранения идентификатора товара или заказа. 
  - _description?: HTMLElement представляет собой HTML-элемент, который используется для хранения описания товара или заказа.
   - image: HTMLElement представляет собой HTML-элемент типа <img>, который используется для отображения изображения товара.
   
  - _title: HTMLElement представляет собой HTML-элемент, который используется для хранения названия товара. 
  - _category: HTMLElement представляет собой HTML-элемент, который используется для хранения информации о категории товара. 
  - _price: HTMLElement  представляет собой HTML-элемент, который используется для отображения цены товара.
  - _button: HTMLElement  представляет собой HTML-элемент, который используется для хранения кнопки взаимодействия с товаром. 
  - _index: HTMLElement представляет собой HTML-элемент, который используется для хранения индекса товара в списке.
  - _flagBtn: boolean представляет собой логическое значение (true или false), которое указывает на состояние кнопки взаимодействия с товаром.

#### Методы

```typescript
set titleCard(value: string)
```

Метод для установки заголовка карточки.

- value: string - Значение заголовка карточки.

```typescript
get titleCard(): string
```

Метод для получения текущего заголовка карточки.

```typescript
set priceCard(value: string)
```

Метод для установки цены карточки.

- value: string - Значение цены карточки.

```typescript
get priceCard(): string
```

Метод для получения текущей цены карточки.

```typescript
set imageCard(value: string)
```

Метод для установки изображения карточки.
- value: string - ссылка картинки карточки.

```typescript
set descriptionCard(value: string)
```

Метод для установки описания карточки.

- value: string - Описание карточки.

```typescript
get descriptionCard(): string
```

Метод для получения текущего описания карточки.

```typescript
set categoreCard(value: string)
```

Метод для установки категории карточки.

- value: string - Категория карточки.

```typescript
get categoreCard(): string
```

Метод для получения текущей категории карточки.

```typescript
protected setDescriptionCard(element: HTMLElement, value: unknown)
```

Защищенный метод для установки описания карточки в указанный HTML-элемент.

- element: HTMLElement - HTML-элемент для описания.
- value: unknown - Значение описания.

## Класс Contacts
Класс Contacts предназначен для управления контактной информацией, такой как электронная почта и телефон, и наследуется от класса Form.

```typescript
constructor(element: HTMLElement, state: IContacts)
```

- element (HTMLElement): HTML-элемент, который будет использоваться в качестве контейнера для формы контактов.
- state (IContacts): Объект состояния, содержащий начальные данные контактной информации.
#### Методы
```typescript
set email(value: string)
```
Метод для установки значения электронной почты в форме контактов. Этот метод позволяет обновить контактную информацию пользователя, задав новое значение электронной почты.
```typescript
set phone(value: string)
```
Метод для установки значения телефонного номера в форме контактов. Этот метод позволяет обновить контактную информацию пользователя, задав новое значение телефонного номера.


## Класс Order
Класс Order предназначен для управления заказами и наследуется от класса Form. Он включает в себя функциональность для обработки различных типов оплаты и адресов доставки.

```typescript
constructor(container: HTMLFormElement, events: IEvents, change: AppStateChanges)
```
- container (HTMLFormElement): HTML-форма, которая будет использоваться в качестве контейнера для формы заказа.
- events (IEvents): Интерфейс событий для обработки событий, связанных с формой заказа.
- change (AppStateChanges): Объект, представляющий изменения состояния приложения.

#### Поля
- _cash: HTMLElement Элемент для выбора оплаты наличными.
- _card: HTMLElement Элемент для выбора оплаты картой.
- _paymentTypes: HTMLElement[] Массив HTML-элементов, представляющих различные типы оплаты.
- _address: HTMLElement[] Массив HTML-элементов, представляющих различные адреса доставки.

#### Методы
```typescript
set payment(value: string)
```

Метод для установки значения типа оплаты в форме заказа. Этот метод позволяет обновить тип оплаты, выбрав между наличными или картой, или другими доступными способами оплаты.

```typescript
set address(value: string)
```
Метод для установки значения адреса доставки в форме заказа. Этот метод позволяет обновить адрес доставки для текущего заказа.

## Класс Page
Класс Page предназначен для управления элементами страницы, такими как каталог товаров, корзина покупок и счетчик товаров в корзине. Он наследуется от класса Component.
```typescript
constructor(container: HTMLElement, events: IEvents)
```
 - container: HTMLElement - HTML-элемент, который будет использоваться в качестве контейнера для данной страницы.
  - events: IEvents - Объект для работы с событиями. Этот параметр может использоваться для подписки на события и их обработки.
#### Поля
- _catalog: HTMLElement  HTML-элемент, представляющий каталог товаров.
-  _basket: HTMLElement HTML-элемент, представляющий корзину покупок.
- _cart: HTMLElement HTML-элемент, представляющий карточку товара.
- _cartCounter: HTMLElement HTML-элемент, представляющий счетчик товаров.
#### Методы
```typescript
set catalog(items: HTMLElement[]) {}
```
Метод-сеттер для установки элементов каталога.
```typescript
set cartCounter(value: number)
```
Метод-сеттер для установки значения счетчика товаров в корзине.

## Презентер
Презентер связывает слой данных (Model) и слой представления (View), обеспечивая их взаимодействие. Взаимодействие осуществляется за счет событий, генерируемых с помощью броекера событий и их обработчиков.


##### <u> действия с модальными окнами</u>
- modal:open - открытие модального окна.
- modal:close - закрытие модального окна.

##### <u> действия с карточкой товара </u>
- card:select - выбор карточки.

- card:deletefrombasket - удаление карточки из корзины.

- card:addtobasket - добавление карточки в корзину.
#####  <u> действия с формами </u>
- order-form:open- открытие формы с товаром.

- basket:open - открытие формы корзины.

- payment:open - открытие формы с выбором способа оплаты и адресом доставки.

- contacts:open - открытие формы контактов.

#####  <u>  остальные действия </u>
- form-errors:change - изменение сообщений об ошибках ввода

- payment:take - выбор способа оплаты

- order:submit - подтверждение заказа

