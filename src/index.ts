// Импорт необходимых модулей и компонентов
import { AppData } from './components/AppData';
import { EventEmitter } from './components/base/view/Events';
import { Model } from './components/base/view/Model';
import { Card } from './components/Card';
import { Basket } from './components/common/Basket';
import { Modal } from './components/common/Modal';
import { Contacts } from './components/Contacts';
import { Order } from './components/Order';
import { WebLarekApi } from './components/WebLarekApi';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

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
const appData = new AppData(events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

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
	page.catalog = page.catalog.map((item: { title: any; image: any; price: any; category: any; }) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('preview:changed', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			price: item.price,
			category: item.category,
		});
	});
});
