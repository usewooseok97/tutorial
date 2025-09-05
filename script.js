// Form Contact JavaScript
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.submitBtn = document.getElementById('submitBtn');
        this.cancelBtn = document.getElementById('cancelBtn');
        
        this.fields = {
            name: document.getElementById('name'),
            surname: document.getElementById('surname'),
            email: document.getElementById('email'),
            message: document.getElementById('message')
        };
        
        this.errorElements = {
            name: document.getElementById('nameError'),
            surname: document.getElementById('surnameError'),
            email: document.getElementById('emailError')
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.setupValidation();
    }
    
    bindEvents() {
        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Cancel button
        this.cancelBtn.addEventListener('click', () => this.handleCancel());
        
        // Real-time validation
        Object.values(this.fields).forEach(field => {
            field.addEventListener('blur', () => this.validateField(field));
            field.addEventListener('input', () => this.clearFieldError(field));
        });
    }
    
    setupValidation() {
        // Email validation regex
        this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        // Required field validation rules
        this.validationRules = {
            name: {
                required: true,
                minLength: 2,
                message: '이름은 최소 2글자 이상이어야 합니다.'
            },
            surname: {
                required: true,
                minLength: 2,
                message: '성을 최소 2글자 이상이어야 합니다.'
            },
            email: {
                required: true,
                pattern: this.emailRegex,
                message: '올바른 이메일 주소를 입력해주세요.'
            },
            message: {
                required: true,
                minLength: 10,
                message: '메시지는 최소 10글자 이상이어야 합니다.'
            }
        };
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm();
        }
    }
    
    handleCancel() {
        if (confirm('작성 중인 내용이 모두 삭제됩니다. 계속하시겠습니까?')) {
            this.resetForm();
        }
    }
    
    validateForm() {
        let isValid = true;
        
        // Validate all fields
        Object.keys(this.fields).forEach(fieldName => {
            if (!this.validateField(this.fields[fieldName])) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    validateField(field) {
        const fieldName = field.name;
        const value = field.value.trim();
        const rules = this.validationRules[fieldName];
        const errorElement = this.errorElements[fieldName];
        
        // Clear previous error
        this.clearFieldError(field);
        
        // Required field validation
        if (rules.required && !value) {
            this.showFieldError(field, errorElement, '필수 입력 항목입니다.');
            return false;
        }
        
        // Skip other validations if field is empty and not required
        if (!value && !rules.required) {
            return true;
        }
        
        // Minimum length validation
        if (rules.minLength && value.length < rules.minLength) {
            this.showFieldError(field, errorElement, rules.message);
            return false;
        }
        
        // Pattern validation (for email)
        if (rules.pattern && !rules.pattern.test(value)) {
            this.showFieldError(field, errorElement, rules.message);
            return false;
        }
        
        return true;
    }
    
    showFieldError(field, errorElement, message) {
        field.classList.add('error');
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    clearFieldError(field) {
        const fieldName = field.name;
        const errorElement = this.errorElements[fieldName];
        
        field.classList.remove('error');
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
    
    async submitForm() {
        try {
            // Show loading state
            this.setSubmitButtonLoading(true);
            
            // Collect form data
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            // Simulate API call (replace with actual endpoint)
            await this.simulateApiCall(data);
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form
            this.resetForm();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showErrorMessage('전송 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            this.setSubmitButtonLoading(false);
        }
    }
    
    async simulateApiCall(data) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Simulate random success/failure for demo
        if (Math.random() < 0.1) {
            throw new Error('Network error');
        }
        
        console.log('Form data submitted:', data);
    }
    
    setSubmitButtonLoading(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
            this.submitBtn.textContent = '전송 중...';
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
            this.submitBtn.textContent = 'Submit';
        }
    }
    
    showSuccessMessage() {
        // Create success notification
        const notification = document.createElement('div');
        notification.className = 'success-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #4caf50;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                animation: slideIn 0.3s ease-out;
            ">
                ✅ 메시지가 성공적으로 전송되었습니다!
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    showErrorMessage(message) {
        // Create error notification
        const notification = document.createElement('div');
        notification.className = 'error-notification';
        notification.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: #f44336;
                color: white;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1000;
                font-family: 'Inter', sans-serif;
                font-size: 14px;
                animation: slideIn 0.3s ease-out;
            ">
                ❌ ${message}
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    }
    
    resetForm() {
        this.form.reset();
        
        // Clear all errors
        Object.values(this.fields).forEach(field => {
            this.clearFieldError(field);
        });
        
        // Focus on first field
        this.fields.name.focus();
    }
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactForm();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ContactForm;
}
