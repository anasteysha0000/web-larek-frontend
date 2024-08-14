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
export enum ProductsCategories {
	'хард-скил' = 'card__category_hard',
	'дополнительное' = 'card__category_additional',
	'кнопка' = 'card__category_button',
	'другое' = 'card__category_other',
	'софт-скил' = 'card__category_soft'
}
```
Перечисление категорий продуктов.

```typescript
export type ProductPayment =
  | 'online' | 'cash';
```
Тип, представляющий способы оплаты.



```typescript
export interface IProduct{
    id: string;
    description: string;
    image: string;
    title: string;
    category: ProductsCategories;
    price: number;
    button: string;
    index: string;
    selected: boolean;
}
```
Интерфейс, описывающий продукт.

```typescript
export interface IBasket {
	itemsBasket: IProduct[]
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
export interface IAddress{
	payment: string;
	address: string;
}
```
Интерфейс, описывающий адрес и тип оплаты.

```typescript
export interface IOrder extends IContacts, IAddress {
	total: number | string;
	items: string[];
}
```
Интерфейс, описывающий заказ. Наследует `IContacts` и `IAddress`.

```typescript
export interface IOrderForms{
	payment: string;
	address: string;
	email: string;
	phone: string;
}
```
Интерфейс для описания формы заказа.


```typescript
export type FormErrors = Partial<Record<keyof IOrder, string>>;
```
Тип, представляющий объект с возможными ошибками формы, где ключи соответствуют полям интерфейса IOrder, а значения — строками с сообщениями об ошибках.

```typescript
export interface IPage {
    counter: number;
    catalog: HTMLElement[];
    locked: boolean;
}
```
Тип, представляющий состояние страницы в веб-приложении.


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
    total: number;
}
```
Интерфейс, описывающий ответ API при создании заказа.


```typescript
export enum RegexEnum {
	Email = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$',
	PhoneNumber = '^((8|\\+7)[\\- ]?)?(\\(?\\d{3}\\)?[\\- ]?)?[\\d\\- ]{7,10}$',
	  Address = '^[А-Яа-я0-9, ]+$'
}
```
Перечисление, которое содержит три значения, каждое из которых представляет собой регулярное выражение для проверки формата данных такие как: email, номер телефона и адрес.

```typescript
export const regexPatterns = {
	[RegexEnum.Email]: new RegExp(RegexEnum.Email),
	[RegexEnum.PhoneNumber]: new RegExp(RegexEnum.PhoneNumber),
	[RegexEnum.Address]: new RegExp(RegexEnum.Address)
};
```
Объект, который создает экземпляры регулярных выражений на основе значений из RegexEnum. 

```typescript
export interface IWebLarekApi {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	postOrder: (order: IOrder) => Promise<IPostOrder>;
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
constructor(cdn: string, baseUrl: string, options?:RequestInit){}
```
 - cdn: string - базовый путь до места хранения изображений.
 - baseUrl: string - Базовый URL для API.
  - options: RequestInit - Опции для настройки HTTP-запросов (например, заголовки, метод, тело запроса и т.д.).

#### Методы
```typescript
public getProductList = (): Promise<IProduct[]>{}
```
Метод для получения списка продуктов по идентификатору.

```typescript
public getProductItem = (id: string): Promise<IProduct> 
```
Метод для получения информации о конкретном продукте.
```typescript
public postOrder = (order: IOrder): Promise<IPostOrder>
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
constructor(data: object, events: IEvents){}
```
- data: объект, который может содержать любые данные, передаваемые в класс.
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
public setProducts(items: IProduct[]): void {}
```
Обновляет список товаров.

```typescript
public setPreview(items: IProduct): void {}
```
Устанавливает продукт для предварительного просмотра.
```typescript
public addProductToBasket(product: IProduct): void {}
```
Добавляет продукт в корзину.

```typescript
private isProductPriceless(product: IProduct): boolean {}
```
Проверяет, имеет ли продукт цену.

```typescript
private isBasketHaveProductPriceless(): boolean {}
```
Проверяет, содержит ли корзина продукты без цены.

```typescript
public isProductInBasket(product: IProduct): boolean {}
```
Проверяет наличие продукта в корзине.

```typescript
public getTotal() {}
```
Вычисляет общую стоимость товаров в корзине. 

```typescript
public removeProductInBasket(product: IProduct): void {}
```
Удаляет продукт из корзины.

```typescript
public clearBasket(): void {}
```
Очищает корзину, удаляя все продукты из нее.

```typescript
private validateEmptyField(field: keyof IOrder, errorMessage: string): boolean {}
```
Проверяет, заполнено ли указанное поле объекта заказа.

```typescript
private validateFieldRegex(field: keyof IOrder, errorMessage: string, regex: RegExp): boolean {}
```
Проверяет, соответствует ли значение указанного поля объекта заказа заданному регулярному выражению.

```typescript
private isOrderValidForm(): boolean {}
```
Проверяет, является ли форма заказа валидной, выполняя валидацию обязательных полей и их соответствие регулярным выражениям.

```typescript
public setOrderField(field: keyof IOrderForms, value: string): void {}
```
Устанавливает значение поля заказа и проверяет валидность формы.


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
constructor(container: HTMLElement){}
```
- container — HTML-элемент, который будет использоваться в качестве контейнера для компонента.
#### Методы

```typescript
protected setText(element: HTMLElement, value: unknown): void
```
Метод для установки текста в элемент.

```typescript
protected setDisabled(element: HTMLElement, state: boolean): void
```
Метод для установки состояния "disabled" у элемента.


```typescript
protected setImage(element: HTMLImageElement, src: string, alt?: string): void
```
Метод для установки изображения в элементе <img>.

```typescript
render(data?: Partial<T>): HTMLElement
```

метод используется для рендеринга компонента принимает в качестве параметров data - объект, содержащий данные для обновления компонента.

## Класс Basket

 Класс Basket представляет собой компонент корзины для веб-приложения. Он наследуется от базового класса Component и принимает контейнер и объект событий в конструкторе.

Наследует методы от базового класса Component, такие как:

- render() - метод для рендеринга компонента.


 ```typescript
constructor(container: HTMLElement, protected events: EventEmitter) {}
```
- `container`: HTMLElement - HTML-элемент, в который будет помещен компонент корзины.
- `events`: EventEmitter - объект для управления событиями.
#### Поля
- _products: HTMLElement представляет собой HTML-элемент, который будет использоваться для отображения списка продуктов в корзине.
- _total: HTMLElement   представляет собой HTML-элемент, который будет использоваться для отображения общей стоимости товаров в корзине.
- _button: HTMLElement  представляет собой HTML-элемент, который будет использоваться для выполнения действия, связанного с корзиной.

#### Методы

```typescript
set products(products: HTMLElement[])
```
Сеттер для установки списка продуктов в корзине.


```typescript
set total(total: number | string){}
```
Сеттер для установки общей стоимости товаров в корзине.


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

```typescript
set valid(value: boolean)
```

Сеттер для установки валидности формы. Может быть использован для включения или отключения кнопки отправки формы в зависимости от валидности.


```typescript
set errors(value: string)
```

Сеттер для установки ошибок формы. Может быть использован для отображения ошибок пользователю.


```typescript
public render(state: Partial<T> & IFormState): void
```

Метод для рендеринга состояния формы. Этот метод может быть использован для обновления интерфейса в соответствии с текущим состоянием формы.


## Класс Modal

Класс Modal предназначен для работы с модальными окнами. Он предоставляет методы для открытия, закрытия и рендеринга содержимого модального окна.

```typescript
constructor(container: HTMLElement, protected events: IEvents){}
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

```typescript
public open(): void
```

Метод для открытия модального окна. Этот метод делает модальное окно видимым и активным.

```typescript
public close(): void
```
Метод для закрытия модального окна. Этот метод скрывает модальное окно и делает его неактивным.

```typescript
public render(data: IModalData): HTMLElement
```
Метод для рендеринга состояния модального окна. Этот метод может быть использован для обновления интерфейса в соответствии с текущим состоянием формы.


## Класс Success

Класс Success предназначен для отображения успешного выполнения операции и предоставляет метод для обработки клика по элементу.

```typescript
constructor(container: HTMLElement, actions: ISuccessActions)
```

- container: HTMLElement - HTML-элемент, который будет использоваться в качестве контейнера для компонента Success.
- actions: ISuccessActions - Объект, содержащий действия, которые могут быть выполнены компонентом Success.


#### Поля
- _close: HTMLButtonElement  представляет собой HTML-элемент, который используется для закрытия компонента.
- _total: HTMLElement  представляет собой HTML-элемент, который используется для отображения информации об итоговой сумме покупки.
#### Методы

```typescript
set total(value: string) {
		this.setText(_total, `Списано ${value} синапсов`);
	}
```
Сеттер, который позволяет устанавливать значение, отображаемое в элементе _total. 

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
  - _selected: boolean представляет собой логическое значение (true или false), которое указывает на состояние кнопки взаимодействия с товаром.

#### Методы

```typescript
public setTextButton(value: string): void {
	this.setText(_button, value);
	}
```
Метод устанавливает текстовое содержимое кнопки. 

```typescript
	 get button(): HTMLButtonElement {
		return this._button;
	}
```
Геттер, который возвращает приватное свойство _button, представляющее элемент HTMLButtonElement

```typescript
 set index(value: string) {
		this.this.setText(_index, value);
	}
```
Сеттер, который устанавливает значение индекса товара.

```typescript
 get index(): string {
		return this._index.textContent || '';
	}
```
Геттер, возвращает текстовое содержимое элемента, связанного с индексом товара.

```typescript
	 set id(value: string) {
		this.container.dataset.id = value;
	}
```
Сеттер, устанавливает значение атрибута data-id элемента.

```typescript
 get id(): string {
		return this.container.dataset.id || '';
	}
```
Геттер, возвращает текущее значение атрибута data-id элемента.

```typescript
 set title(value: string) {
		this.setText(this._title, value);
	}
```
Сеттер, устанавливает текстовое содержимое элемента.

```typescript
 get title(): string {
		return this._title.textContent || '';
	}
```
Геттер, возвращает текущее текстовое содержимое элемента.

```typescript
 set price(value: string) {
		value === null
			? this.setText(this._price, 'Бесценно')
			: this.setText(this._price, `${value} синапсов`);
	}
```
Сеттер, который устанавливает текстовое содержимое элемента, связанного с ценой.

```typescript
 get price(): string {
		return this._price.textContent || '';
	}
```
Геттер, возвращает текущее текстовое содержимое элемента.

```typescript
	 set image(value: string) {
		this.setImage(this._image, value, this.title); 
	}
```
Сеттер,  который устанавливает значения свойства изображения в объекте.

```typescript
	 set description(value: string) {
		this.setText(this._description, value);
	}
```
Сеттер, используется для установки значения свойства описания в объекте.


```typescript
	 get description(): string {
		return this._description.textContent || '';
	}
```
Геттер, используется для получения текущего значения свойства описания из объекта.

```typescript
	 set category(value:keyof typeof ProductsCategories) {
		this._category.classList.replace(
			'card__category_soft',
			ProductsCategories[value]
		);
		this.setText(this._category, value);
	}
```
Сеттер, используется для установки значения категории в объекте. 



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
Класс Order предназначен для управления заказами и наследуется от класса Form.

```typescript
constructor(container: HTMLFormElement, events: IEvents){}
```
- container (HTMLFormElement): HTML-форма, которая будет использоваться в качестве контейнера для формы заказа.
- events (IEvents): Интерфейс событий для обработки событий, связанных с формой заказа.


#### Поля
- _cashButton: HTMLButtonElement, HTML-элемент кнопки, который используется для выбора способа оплаты наличными.
- _cardButton: HTMLButtonElement, HTML-элемент кнопки, который используется для выбора способа оплаты картой.
- _address: HTMLInputElement, HTML-элемент, который используется для ввода адреса доставки.


## Класс Page
Класс Page предназначен для управления элементами страницы, такими как каталог товаров, корзина покупок и счетчик товаров в корзине. Он наследуется от класса Component.
```typescript
constructor(container: HTMLElement, protected events: IEvents){}
```
 - container: HTMLElement - HTML-элемент, который будет использоваться в качестве контейнера для данной страницы.
  - events: IEvents - Объект для работы с событиями. Этот параметр может использоваться для подписки на события и их обработки.
#### Поля
- _counter: HTMLElement HTMLElement HTML-элемент, представляющий счетчик товаров.
- _catalog: HTMLElement  HTMLElement  HTML-элемент, представляющий каталог товаров.
- _wrapper: HTMLElementHTMLElement  HTML-элемент, представляющий обертку страницы.
- _basket: HTMLElement HTMLElement HTML-элемент, представляющий корзину покупок.
#### Методы
```typescript
 set catalog(items: HTMLElement[]) {}
```
Сеттер для установки элементов каталога.
```typescript
 set counter(value: number){}
```
Сеттер для установки значения счетчика товаров в корзине.

```typescript 
 set locked(value: boolean) {}
```
Сеттер, для блокировки страницы на основе переданного значения.

## Презентер
Презентер связывает слой данных (Model) и слой представления (View), обеспечивая их взаимодействие. Взаимодействие осуществляется за счет событий, генерируемых с помощью броекера событий и их обработчиков.


##### <u> действия с модальными окнами</u>
- modal:open - открытие модального окна.
- modal:close - закрытие модального окна.

#####  <u> действия с формами </u>

- basket:open - открытие формы корзины.
- basket:change - изменение корзины.
- basket:add - добавление карточки товара из корзины.
- basket:delete - удаление карточки товара из корзины.

#####  <u>  остальные действия </u>
- formErrors:change - изменение сообщений об ошибках ввода.
- order:select -  обработка выбора заказа пользователя.
- order:submit - подтверждение заказа.
- order:ready - готовность заказа.
- contacts:submit - подтверждение заказа.
- preview:changed - изменение превью карточки.
- items:changed - изменение товаров

