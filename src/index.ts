// Импорт необходимых модулей и компонентов
// Импорт стилей
import './scss/styles.scss';
import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/view/Events';
import { Model } from './components/base/view/Model';
import { Card } from './components/Card';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { Contacts } from './components/Contacts';
import { Order } from './components/Order';
import { Page } from './components/Page';
import { WebLarekApi } from './components/WebLarekApi';
import './scss/styles.scss';
import { IProduct } from './types/models/Api';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';
import { ProductCategory } from './types/models/App';

// Инициализация событий и API
const events = new EventEmitter();
const api = new WebLarekApi(CDN_URL, API_URL);

// Шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const deliveryTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Модель данных приложения
const appData = new AppData({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modale = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(deliveryTemplate), events, {
    onClickPayment: (ev: Event) => events.emit('payment:toggle', ev.target)
});
const contacts = new Contacts(cloneTemplate(contactTemplate), events);

// Включение события открытия Модальных окон
events.on('modal:open', () => {
  page.locked = true;
});

events.on('items:changed', () => {
	page.catalog = appData._products.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('preview:changed', item),
		});
		return card.render({
			id: item.id,
			description: item.description,
			price: item.price,
			image: item.image,
			title: item.title,
			category: item.category
		});
	});
});

events.on('preview:changed', (item : IProduct) => {
		const card = new Card(cloneTemplate(cardPreviewTemplate), {
			onClick: () => events.emit('basket:changed', item),
		});
		return modale.render({
			content: card.render({
				id: item.id,
				description: item.description,
				price: item.price,
				image: item.image,
				title: item.title,
				category: item.category
			})
		});
})
events.on('modal:open', () => {
	page.locked = true;
})

events.on('modal:close', () => {
	page.locked = true;
})
api.getProductList()
    .then( (data : IProduct[]) => {
			appData.setProducts(data)
		})
    .catch(err => {
        console.error(err);
    });