import { IProduct } from "../../types/models/Api";
import { AppState, AppStateModals,  IBasket, IContacts, IOrder } from "../../types/models/App";

class Model implements AppState {
  products: Map<string, IProduct>;
  selectedProduct: IProduct | null;
  basket: IBasket;
  contacts: IContacts;
  order: IOrder;
  openedModal: AppStateModals;
  modalMessage: string | null;
  isError: boolean;

  constructor(data: Partial<AppState>) {
    this.products = data.products || new Map<string, IProduct>();
    this.selectedProduct = data.selectedProduct || null;
    this.basket = data.basket || { itemsBasket: [], totalBasket: null };
    this.contacts = data.contacts || { email: '', phone: '' };
    this.order = data.order || { email: '', phone: '', payment: 'cash', address: '', total: null, items: [] };
    this.openedModal = data.openedModal || AppStateModals.product;
    this.modalMessage = data.modalMessage || null;
    this.isError = data.isError || false;
  }

  selectProduct(id: string): void {
    const product = this.products.get(id);
    if (product) {
      this.selectedProduct = product;
    }
  }

  openBasket(): void {
    this.openedModal = AppStateModals.basket;
  }

  addProduct(id: string): void {
    const product = this.products.get(id);
    if (product) {
      const existingItemIndex = this.basket.itemsBasket.findIndex(item => item[0].id === id);
      if (existingItemIndex !== -1) {
        // Если продукт уже есть в корзине, увеличиваем его количество
        this.basket.itemsBasket[existingItemIndex][2] += 1;
      } else {
        // Иначе добавляем новый продукт в корзину
        this.basket.itemsBasket.push([product, id, 1]);
      }
      this.updateTotalBasket();
      this.setMessage(`Product ${product.title} added to basket`, false);
    }
  }

    deleteProduct(id: string): void {
        const index = this.basket.itemsBasket.findIndex(item => item[0].id === id);
        if (index !== -1) {
        this.basket.itemsBasket.splice(index, 1);
        this.updateTotalBasket();
        this.setMessage(`Product removed from basket`, false);
        }
    }

    openModal(modal: AppStateModals): void {
        this.openedModal = modal;
    }
    closeModal(modal: AppStateModals): void {
        
    }

    setMessage(message: string | null, isError: boolean): void {
        this.modalMessage = message;
        this.isError = isError;
    }

    private updateTotalBasket(): void {
        this.basket.totalBasket = this.basket.itemsBasket.reduce((total, item) => total + (item[0].price * item[2]), 0);
    }
    updateBasket(): void {
        
    }

    }

export default Model;
