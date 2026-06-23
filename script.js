function landingApp() {
    return {
        scrolled: false,
        mobileMenuOpen: false,
        activeSlider: 'martelinho',
        sliderPos: 50,
        isSliding: false,
        budgetModal: false,
        formData: {
            name: '',
            carModel: '',
            carYear: '',
            service: 'Martelinho de Ouro',
            notes: ''
        },

        init() {
            // Track header scroll state
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
            });
        },

        // Open Modal with Predefined Service
        openBudgetModal(preselectedService = null) {
            if (preselectedService) {
                this.formData.service = preselectedService;
            }
            this.budgetModal = true;
        },

        // Before and After drag mechanics
        startSliding(e) {
            this.isSliding = true;
            this.updateSliderPos(e);
        },
        slideMove(e) {
            if (!this.isSliding) return;
            this.updateSliderPos(e);
        },
        stopSliding() {
            this.isSliding = false;
        },
        updateSliderPos(e) {
            let container;
            if (this.activeSlider === 'martelinho') container = document.getElementById('slider-martelinho');
            else if (this.activeSlider === 'polimento') container = document.getElementById('slider-polimento');
            else if (this.activeSlider === 'vitrificacao') container = document.getElementById('slider-vitrificacao');
            else if (this.activeSlider === 'estetica') container = document.getElementById('slider-estetica');
            
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const offsetX = clientX - rect.left;
            let percentage = (offsetX / rect.width) * 100;

            if (percentage < 0) percentage = 0;
            if (percentage > 100) percentage = 100;

            this.sliderPos = percentage.toFixed(2);
        },

        // Generate Custom Whatsapp URL and Redirect
        generateWhatsAppLink() {
            const phoneNumber = '5563999887711'; // Moura WhatsApp Number Placeholder
            const greeting = `Olá, Moura Estética Automotiva! Gostaria de um orçamento premium para meu veículo.`;
            
            const details = `\n\n*DADOS DO PEDIDO:*\n• *Nome:* ${this.formData.name}\n• *Veículo:* ${this.formData.carModel} ${this.formData.carYear ? `(${this.formData.carYear})` : ''}\n• *Serviço:* ${this.formData.service}${this.formData.notes ? `\n• *Anotações:* ${this.formData.notes}` : ''}`;
            
            const encodedText = encodeURIComponent(greeting + details);
            const finalUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

            // Redirect user
            window.open(finalUrl, '_blank');
            this.budgetModal = false;
        }
    }
}