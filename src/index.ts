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
import { IAddress, IContacts, IOrder, ProductCategory } from './types/models/App';
import {ProductPayment} from './types/models/App'
import { Success } from './components/common/Success';
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
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(deliveryTemplate), events, {
    onClickPayment: (ev: Event) => events.emit('payment:toggle', ev.target)

});
const contacts = new Contacts(cloneTemplate(contactTemplate), events);



events.on('items:changed', () => {
	page.catalog = appData._products.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => {events.emit('preview:changed', item)
				events.emit('cart:select', item)
			},
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


events.on('formErrors:change', (errors: Partial<IOrder>) => {
    const { email, phone} = errors;
	const {payment, address} = errors;
    contacts.valid = !email && !phone;
	order.valid = !payment && !address;
    contacts.errors = Object.values({phone, email}).filter(i => !!i).join('; ');
	order.errors = Object.values({payment, address}).filter(i => !!i).join('; ');
});

// Изменилось одно из полей
events.on(/^order\..*:change/, (data: { field: keyof IAddress, value: string }) => {
    appData.setOrderField(data.field, data.value);
});

events.on(/^contacts\..*:change/, (data: {field: keyof IContacts, value: string}) => {
    appData.setOrderField(data.field, data.value)
})


events.on('order:select', () => {
	return modal.render({
		content: order.render({
			address: appData._order.address,
			valid: false, 
			errors: []
		})
	})
})
events.on('order:submit', () => {
	return modal.render({
		content: contacts.render({
			valid: false, 
			errors: []
		})
	})
})

events.on('order:submit', () => {
    api.postOrder(appData._order)
      .then((result) => {
        appData.clearBasket();
        const success = new Success(cloneTemplate(successTemplate), {
            onClick: () => {
                modal.close();
            }
        });
        success.total = result.totalPrice.toString();
        modal.render({
            content: success.render({})
        });
      })
      .catch(error => {
          console.log(error);
      });
})

events.on('preview:changed', (item: IProduct) => {
    const card = new Card(cloneTemplate(cardPreviewTemplate), {
        onClick: () => {
			if (appData.isProductInBasket) {
                card.setTextq('В корзину');
                events.emit('basket:add', item);
            } else {
                card.setTextq('Удалить из корзины');
                events.emit('card:deletefromcart', item);
            }
        }
    });
	appData.isProductInBasket ? card.setTextq('В корзину'):card.setTextq('Удалить из корзины');
    return modal.render({
        content: card.render({
            id: item.id,
            description: item.description,
            price: item.price,
            image: item.image,
            title: item.title,
            category: item.category,
        })
    });
});


events.on('basket:add', (item: IProduct) => {
	appData.addProductToBasket(item);
	page.counter = appData._basket.itemsBasket.length
	modal.close()
	
})
events.on('card:deletefromcart', (item: IProduct) => {
	appData.removeProductInBasket(item);
	page.counter = appData._basket.itemsBasket.length
});
events.on('basket:open', () => {
	const products = appData._basket.itemsBasket.map((item, index) => {
		const product = new Card(cloneTemplate(cardBasketTemplate), {
				onClick: () => {
					events.emit('card:deletefromcart', item);
				},
			}
		);
		return product.render({
				price: item.price,
				title: item.title,
				index: `${index+1}`
			});
		})
	modal.render({
		content: basket.render({
			products: products,
			total: appData.getTotal(),
		}),
	});
});
events.on('basket:change', () => {
	const products = appData._basket.itemsBasket.map((item, index) => {
		const product = new Card(cloneTemplate(cardBasketTemplate), {
				onClick: () => {
					events.emit('card:deletefromcart', item);
				},
			}
		);
		return product.render({
				price: item.price,
				title: item.title,
				index: `${index+1}`
			});
		})
	modal.render({
		content: basket.render({
			products: products,
			total: appData.getTotal(),
		}),
	});
});

//МОДАЛЬНЫЕ ОКНА
// Включение события открытия Модальных окон
events.on('modal:open', () => {
	page.locked = true;
  });

events.on('modal:close', () => {
	page.locked = false;
})

//Получение карточек с апи
api.getProductList()
    .then( (data : IProduct[]) => {
			appData.setProducts(data)
		})
    .catch(err => {
        console.error(err);
    });