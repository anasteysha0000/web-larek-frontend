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
ChatGPT 4 & Midjourney | AI bot, [14.07.2024 15:15]
\#\#\# Документация по API и состоянию приложения

\#\#\#\# Типы и интерфейсы

\#\#\#\#\# `ProductCategory`

Тип, представляющий категории продуктов\.

```typescript
export type ProductCategory =
  | 'хард-скил'
  | 'софт-скил'
  | 'дополнительное'
  | 'кнопка'
  | 'другое';
```

\#\#\#\#\# `ProductPayment`

Тип, представляющий способы оплаты\.

```typescript
export type ProductPayment =
  | 'online' | 'cash';
```

\#\#\#\#\# `IProduct`

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

\#\#\#\#\# `IBasket`

Интерфейс, описывающий корзину покупок\.

```typescript
export interface IBasket {
  itemsBasket: [IProduct, string, number][];
  totalBasket: number | null;
}
```

\#\#\#\#\# `IContacts`

Интерфейс, описывающий контактную информацию\.

```typescript
interface IContacts {
  email: string;
  phone: string;
}
```

\#\#\#\#\# `IOrder`

Интерфейс, описывающий заказ\. Наследует `IContacts`\.

```typescript
interface IOrder extends IContacts {
  payment: ProductPayment;
  address: string;
  total: number | null;
  items: string[];
}
```

\#\#\#\#\# `AppStateModals`

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

\#\#\#\#\# `AppStateChanges`

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

\#\#\#\#\# `AppState`

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
  buyProduct(id: string): void;
  deleteProduct(id: string): void;

  // Методы для работы с модальными окнами
  openModal(modal: AppStateModals): void;
  setMessage(message: string | null, isError: boolean): void;
}
```

\#\#\#\#\# `ApiListResponse<Type>`

Тип, представляющий ответ API со списком элементов\.

```typescript
export type ApiListResponse<Type> = {
    total: number,
    items: Type[]
};
```

\#\#\#\#\# `ApiPostMethods`

Тип, представляющий методы HTTP\-запросов для изменения данных\.

```typescript
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
```

\#\#\#\#\# `IPostOrder`

Интерфейс, описывающий ответ API при создании заказа\.

```typescript
export interface IPostOrder {
    id: string;
    totalPrice: number|null;
}
```

\#\#\#\#\# `IWebLarekApi`

Интерфейс, описывающий методы API\.

```typescript
export interface IWebLarekApi {
    getProductList(): Promise<ApiListResponse<IProduct>>;
    getProductItem(): Promise<IProduct>;
    postOrder() : Promise<IPostOrder>;
}
```

\#\#\# Описание методов интерфейса `AppState`

\- \*\*`selectProduct(id: string): void`\*\*
  
  Метод для выбора продукта по его идентификатору\.
  
\- \*\*`openBasket(): void`\*\*
  
  Метод для открытия корзины\.
  
\- \*\*`buyProduct(id: string): void`\*\*
  
  Метод для добавления продукта в корзину по его идентификатору\.
  
\- \*\*`deleteProduct(id: string): void`\*\*
  
  Метод для удаления продукта из корзины по его идентификатору\.
  
\- \*\*`openModal(modal: AppStateModals): void`\*\*
  
  Метод для открытия модального окна\.
  
\- \*\*`setMessage(message: string | null, isError: boolean): void`\*\*
  
  Метод для установки сообщения в модальном окне и флага ошибки\.

\#\

ChatGPT 4 & Midjourney | AI bot, [14.07.2024 15:15]
#\# Описание методов интерфейса `IWebLarekApi`

\- \*\*`getProductList(): Promise<ApiListResponse<IProduct>>`\*\*
  
  Метод для получения списка продуктов\.
  
\- \*\*`getProductItem(): Promise<IProduct>`\*\*
  
  Метод для получения информации о конкретном продукте\.
  
\- \*\*`postOrder(): Promise<IPostOrder>`\*\*
  
  Метод для создания заказа\.

\#\#\# Пример использования

Пример использования интерфейсов и типов в приложении:

```typescript
import { AppState, AppStateModals, IWebLarekApi } from './App';

// Реализация класса, использующего интерфейсы и типы
class App implements AppState {
    // ... реализация свойств и методов ...
}

// Пример использования API
const api: IWebLarekApi = {
    async getProductList() {
        // Реализация запроса на получение списка продуктов
    },
    async getProductItem() {
        // Реализация запроса на получение информации о продукте
    },
    async postOrder() {
        // Реализация запроса на создание заказа
    }
};
```
