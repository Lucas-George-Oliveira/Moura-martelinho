function landingApp() {
    return {
        scrolled: false,
        mobileMenuOpen: false,
        activeSlider: 'martelinho',
        sliderPos: 50,
        isSliding: false,
        budgetModal: false,
        
        // Carrossel de Vídeos 3D Infinito
        videoIndex: 0,
        totalVideos: 4, 
        videos: [
            {
                src: "https://assets.mixkit.co/videos/preview/mixkit-man-polishing-car-with-wax-40143-large.mp4",
                title: "Polimento Técnico RUPES",
                desc: "Eliminação cirúrgica de imperfeições com tecnologia líder mundial."
            },
            {
                src: "https://assets.mixkit.co/videos/preview/mixkit-washing-a-brand-new-car-40141-large.mp4",
                title: "Lavagem de Chassi Detalhada",
                desc: "Limpeza técnica minuciosa de caixas de roda e suspensões."
            },
            {
                src: "https://assets.mixkit.co/videos/preview/mixkit-black-luxury-car-parked-under-led-lights-42250-large.mp4",
                title: "Vitrificação Cerâmica Gyeon",
                desc: "Aplicação de quartzo líquido de alta durabilidade e repelência à água."
            },
            {
                src: "https://assets.mixkit.co/videos/preview/mixkit-cleaning-car-dashboard-with-a-wet-cloth-40142-large.mp4",
                title: "Higienização de Cabines",
                desc: "Desinfecção profunda e hidratação de couros nobres de fábrica."
            }
        ],
        
        formData: {
            name: '',
            carModel: '',
            carYear: '',
            service: 'Martelinho de Ouro',
            notes: ''
        },

        init() {
            // Controlar scroll do header
            window.addEventListener('scroll', () => {
                this.scrolled = window.scrollY > 50;
            });

            // Inicialização dos eventos globais de arrastar para o Slider
            this.initSliderDrag();

            // Autoplay do Carrossel Tridimensional (a cada 7 segundos)
            setInterval(() => {
                this.nextVideo();
            }, 7000);
        },

        initSliderDrag() {
            // Função de atualização de posição integrada
            const update = (clientX) => {
                const container = document.getElementById('slider-' + this.activeSlider);
                if (!container) return;
                
                const rect = container.getBoundingClientRect();
                let percentage = ((clientX - rect.left) / rect.width) * 100;
                
                if (percentage < 0) percentage = 0;
                if (percentage > 100) percentage = 100;
                
                this.sliderPos = percentage.toFixed(2);
            };

            // Drag global do Mouse e do Toque
            window.addEventListener('mousemove', (e) => {
                if (this.isSliding) update(e.clientX);
            });

            window.addEventListener('touchmove', (e) => {
                if (this.isSliding && e.touches.length > 0) {
                    update(e.touches[0].clientX);
                }
            }, { passive: true });

            window.addEventListener('mouseup', () => this.isSliding = false);
            window.addEventListener('touchend', () => this.isSliding = false);
        },

        startSliding(e) {
            this.isSliding = true;
            const clientX = e.touches ? e.touches[0].clientX : e.clientX;
            const container = document.getElementById('slider-' + this.activeSlider);
            if (container) {
                const rect = container.getBoundingClientRect();
                let percentage = ((clientX - rect.left) / rect.width) * 100;
                this.sliderPos = Math.max(0, Math.min(100, percentage)).toFixed(2);
            }
        },

        nextVideo() {
            this.videoIndex = (this.videoIndex + 1) % this.totalVideos;
        },
        prevVideo() {
            this.videoIndex = (this.videoIndex - 1 + this.totalVideos) % this.totalVideos;
        },

        openBudgetModal(preselectedService = null) {
            if (preselectedService) {
                this.formData.service = preselectedService;
            }
            this.budgetModal = true;
        },

        generateWhatsAppLink() {
            const phoneNumber = '5563999887711';
            const greeting = `Olá, Moura Estética Automotiva! Gostaria de um orçamento premium para meu veículo.`;
            const details = `\n\n*DADOS DO PEDIDO:*\n• *Nome:* ${this.formData.name}\n• *Veículo:* ${this.formData.carModel} ${this.formData.carYear ? `(${this.formData.carYear})` : ''}\n• *Serviço:* ${this.formData.service}${this.formData.notes ? `\n• *Anotações:* ${this.formData.notes}` : ''}`;
            
            window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(greeting + details)}`, '_blank');
            this.budgetModal = false;
        }
    }
}