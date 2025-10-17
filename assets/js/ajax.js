/**
 * AI Tools / SaaS Landing Page - AJAX Utilities
 */

/**
 * AJAX utility class
 */
class AJAXUtils {
    constructor() {
        this.baseURL = window.location.origin;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        };
    }

    /**
     * Set base URL for API requests
     */
    setBaseURL(url) {
        this.baseURL = url;
    }

    /**
     * Set default headers
     */
    setHeaders(headers) {
        this.defaultHeaders = { ...this.defaultHeaders, ...headers };
    }

    /**
     * Make GET request
     */
    async get(url, options = {}) {
        return this.request('GET', url, null, options);
    }

    /**
     * Make POST request
     */
    async post(url, data = null, options = {}) {
        return this.request('POST', url, data, options);
    }

    /**
     * Make PUT request
     */
    async put(url, data = null, options = {}) {
        return this.request('PUT', url, data, options);
    }

    /**
     * Make DELETE request
     */
    async delete(url, options = {}) {
        return this.request('DELETE', url, null, options);
    }

    /**
     * Make PATCH request
     */
    async patch(url, data = null, options = {}) {
        return this.request('PATCH', url, data, options);
    }

    /**
     * Generic request method
     */
    async request(method, url, data = null, options = {}) {
        const config = {
            method: method.toUpperCase(),
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };

        // Add body for methods that support it
        if (data && ['POST', 'PUT', 'PATCH'].includes(config.method)) {
            if (data instanceof FormData) {
                delete config.headers['Content-Type']; // Let browser set it
                config.body = data;
            } else {
                config.body = JSON.stringify(data);
            }
        }

        // Add query parameters for GET requests
        if (data && config.method === 'GET') {
            const params = new URLSearchParams(data);
            url += (url.includes('?') ? '&' : '?') + params.toString();
        }

        try {
            const response = await fetch(this.baseURL + url, config);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            } else {
                return await response.text();
            }
        } catch (error) {
            console.error('AJAX request failed:', error);
            throw error;
        }
    }

    /**
     * Upload file with progress
     */
    async uploadFile(url, file, options = {}) {
        const formData = new FormData();
        formData.append('file', file);

        const xhr = new XMLHttpRequest();
        
        return new Promise((resolve, reject) => {
            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable && options.onProgress) {
                    const percentComplete = (e.loaded / e.total) * 100;
                    options.onProgress(percentComplete);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        resolve(response);
                    } catch (e) {
                        resolve(xhr.responseText);
                    }
                } else {
                    reject(new Error(`Upload failed: ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Upload failed'));
            });

            xhr.open('POST', this.baseURL + url);
            
            // Add custom headers
            Object.entries(options.headers || {}).forEach(([key, value]) => {
                xhr.setRequestHeader(key, value);
            });

            xhr.send(formData);
        });
    }
}

/**
 * API service class
 */
class APIService {
    constructor() {
        this.ajax = new AJAXUtils();
        this.endpoints = {
            auth: {
                login: '/api/auth/login',
                register: '/api/auth/register',
                logout: '/api/auth/logout',
                refresh: '/api/auth/refresh'
            },
            user: {
                profile: '/api/user/profile',
                update: '/api/user/update',
                avatar: '/api/user/avatar'
            },
            tools: {
                list: '/api/tools',
                create: '/api/tools',
                update: '/api/tools/:id',
                delete: '/api/tools/:id',
                categories: '/api/tools/categories'
            },
            contact: {
                send: '/api/contact/send',
                subscribe: '/api/contact/subscribe'
            },
            dashboard: {
                stats: '/api/dashboard/stats',
                analytics: '/api/dashboard/analytics'
            }
        };
    }

    /**
     * Authentication methods
     */
    async login(credentials) {
        return this.ajax.post(this.endpoints.auth.login, credentials);
    }

    async register(userData) {
        return this.ajax.post(this.endpoints.auth.register, userData);
    }

    async logout() {
        return this.ajax.post(this.endpoints.auth.logout);
    }

    async refreshToken() {
        return this.ajax.post(this.endpoints.auth.refresh);
    }

    /**
     * User methods
     */
    async getUserProfile() {
        return this.ajax.get(this.endpoints.user.profile);
    }

    async updateUserProfile(data) {
        return this.ajax.put(this.endpoints.user.update, data);
    }

    async uploadAvatar(file, onProgress) {
        return this.ajax.uploadFile(this.endpoints.user.avatar, file, { onProgress });
    }

    /**
     * Tools methods
     */
    async getTools(filters = {}) {
        return this.ajax.get(this.endpoints.tools.list, { params: filters });
    }

    async createTool(toolData) {
        return this.ajax.post(this.endpoints.tools.create, toolData);
    }

    async updateTool(id, toolData) {
        const url = this.endpoints.tools.update.replace(':id', id);
        return this.ajax.put(url, toolData);
    }

    async deleteTool(id) {
        const url = this.endpoints.tools.delete.replace(':id', id);
        return this.ajax.delete(url);
    }

    async getToolCategories() {
        return this.ajax.get(this.endpoints.tools.categories);
    }

    /**
     * Contact methods
     */
    async sendContactMessage(messageData) {
        return this.ajax.post(this.endpoints.contact.send, messageData);
    }

    async subscribeNewsletter(email) {
        return this.ajax.post(this.endpoints.contact.subscribe, { email });
    }

    /**
     * Dashboard methods
     */
    async getDashboardStats() {
        return this.ajax.get(this.endpoints.dashboard.stats);
    }

    async getDashboardAnalytics(period = '30d') {
        return this.ajax.get(this.endpoints.dashboard.analytics, { 
            params: { period } 
        });
    }
}

/**
 * Form handler class
 */
class FormHandler {
    constructor(formSelector, options = {}) {
        this.form = document.querySelector(formSelector);
        this.options = {
            validateOnSubmit: true,
            showLoader: true,
            successMessage: 'Form submitted successfully!',
            errorMessage: 'An error occurred. Please try again.',
            ...options
        };
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.initValidation();
    }

    initValidation() {
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();
        
        if (this.options.validateOnSubmit && !this.validateForm()) {
            return;
        }

        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        if (this.options.showLoader) {
            submitBtn.textContent = 'Submitting...';
            submitBtn.disabled = true;
        }

        try {
            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData.entries());
            
            const response = await this.submitForm(data);
            
            if (response.success) {
                this.showSuccess(this.options.successMessage);
                this.form.reset();
            } else {
                this.showError(response.message || this.options.errorMessage);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            this.showError(this.options.errorMessage);
        } finally {
            if (this.options.showLoader) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        }
    }

    async submitForm(data) {
        // Override this method in subclasses for specific form handling
        const api = new APIService();
        return api.sendContactMessage(data);
    }

    validateForm() {
        const inputs = this.form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField({ target: input })) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');
        
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (isRequired && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (fieldType === 'email' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }

        // Phone validation
        if (fieldType === 'tel' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }

        // Password validation
        if (fieldType === 'password' && value && value.length < 8) {
            isValid = false;
            errorMessage = 'Password must be at least 8 characters long';
        }

        this.showFieldError(field, errorMessage);
        return isValid;
    }

    showFieldError(field, message) {
        this.clearFieldError({ target: field });
        
        if (message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            field.classList.add('error');
            field.parentNode.appendChild(errorElement);
        }
    }

    clearFieldError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        
        if (errorElement) {
            errorElement.remove();
        }
        
        field.classList.remove('error');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        if (typeof window.AITools !== 'undefined' && window.AITools.showNotification) {
            window.AITools.showNotification(message, type);
        } else {
            alert(message);
        }
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
}

/**
 * Real-time data handler
 */
class RealTimeHandler {
    constructor() {
        this.socket = null;
        this.eventHandlers = {};
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    connect(url) {
        if (typeof io === 'undefined') {
            console.error('Socket.io not loaded');
            return;
        }

        this.socket = io(url);
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.socket.on('connect', () => {
            console.log('Connected to server');
            this.reconnectAttempts = 0;
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
            this.handleReconnect();
        });

        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
        });
    }

    handleReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => {
                this.socket.connect();
            }, 1000 * this.reconnectAttempts);
        }
    }

    on(event, handler) {
        this.eventHandlers[event] = handler;
        if (this.socket) {
            this.socket.on(event, handler);
        }
    }

    emit(event, data) {
        if (this.socket) {
            this.socket.emit(event, data);
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
        }
    }
}

// Initialize global instances
window.AJAXUtils = AJAXUtils;
window.APIService = APIService;
window.FormHandler = FormHandler;
window.RealTimeHandler = RealTimeHandler;

// Create global API instance
window.api = new APIService();

// Initialize real-time handler
window.realtime = new RealTimeHandler();
