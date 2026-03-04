export interface SavedCard {
    id: string;
    cardNumber: string;
    expiry: string;
    cardholderName: string;
    brand: string;
}

export const paymentCardStore = {
    getCards(): SavedCard[] {
        try {
            return JSON.parse(localStorage.getItem('tradehub_saved_cards') || '[]');
        } catch {
            return [];
        }
    },
    addCard(card: Omit<SavedCard, 'id'>) {
        const cards = this.getCards();
        // basic masking for UI
        const masked = card.cardNumber.replace(/.(?=.{4})/g, '*');
        const newCard = { ...card, cardNumber: masked, id: Math.random().toString(36).substr(2, 9) };
        cards.push(newCard);
        localStorage.setItem('tradehub_saved_cards', JSON.stringify(cards));
    },
    removeCard(id: string) {
        const cards = this.getCards();
        localStorage.setItem('tradehub_saved_cards', JSON.stringify(cards.filter(c => c.id !== id)));
        window.dispatchEvent(new Event('hashchange')); // hacky way to re-render in PaymentLayout
    }
};

// Expose globally for vanilla HTML onclick handlers
(window as any).removeSavedCard = paymentCardStore.removeCard.bind(paymentCardStore);
(window as any).addSavedCard = paymentCardStore.addCard.bind(paymentCardStore);
(window as any).getSavedCards = paymentCardStore.getCards.bind(paymentCardStore);
