describe('проверяем доступность приложения', function() {
    beforeEach(() => {
        const URL = 'https://norma.nomoreparties.space/api';
        //Фикстуры авторизации и пользователя
        cy.fixture('authResponse.json').then((authResponse) => {
            //Подмена фикстурами ответа логина
            cy.intercept('POST', `${URL}/auth/login`, {
                statusCode: 200,
                body: authResponse,
            }).as('login');
            //Подмена фикстурами ответ обновления токена
            cy.intercept('POST', `${URL}/auth/token`, {
                statusCode: 200,
                body: {
                    success: authResponse.success,
                    refreshToken: authResponse.refreshToken,
                    accessToken: authResponse.accessToken,
                },
            }).as('refreshToken');
            //Подмена фикстурами ответа получения пользователя
            cy.intercept('GET', `${URL}/auth/user`, {
                statusCode: 200,
                body: {
                    success: authResponse.success,
                    user: authResponse.user,
                },
            }).as('refreshToken');
        });
        //Фикстуры ингредиентов
        cy.fixture('ingredientsResponse.json').then((ingredientsResponse) => {
            //Подмена фикстурами ответа получения ингредиентов
            cy.intercept('GET', `${URL}/ingredients`, {
                statusCode: 200,
                body: ingredientsResponse,
            }).as('getIngredients');
        });
        //Фикстуры заказа
        cy.fixture('orderResponse.json').then((orderResponse) => {
            //Подмена фикстурами ответа получения ингредиентов
            cy.intercept('POST', `${URL}/orders`, {
                statusCode: 200,
                body: orderResponse,
            }).as('postOrder');
        });
 
 
 
 
        cy.visit("http://localhost:4000/login");
        cy.get("[name^=email]").type("test@gmail.com");
        cy.get("[name^=password]").type("123456");
        cy.get("button").contains("Войти").click();
        cy.wait("@login");
    });
 
 
 
 
    afterEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.window().then((window) => {
            const value = window.localStorage.getItem('refreshToken');
            expect(value).to.equal(null);
        });
        cy.getCookie('accessToken').should('be.null');
    });
 
 
 
 
    it('Сервис должен быть доступен по адресу localhost:4000', function () {
        cy.visit('http://localhost:4000');
        cy.fixture('authResponse.json').then((authResponse) => {
            cy.window().then((window) => {
                const value = window.localStorage.getItem('refreshToken');
                expect(value).to.equal(authResponse.refreshToken);
            });
            cy.getCookie('accessToken').should('have.property', 'value', authResponse.accessToken);
        })
    });
 
 
 
 
    it("Открытие попапа ингредиента", () => {
        cy.wait("@getIngredients");
        cy.fixture('ingredientsResponse.json').then((ingredientsResponse) => {
            const bun = ingredientsResponse.data.find((item: any) => item.type === 'bun');
            if (!bun) {
                throw new Error('Error in ingredientsResponse.json');
            }
            const id = bun._id;
            cy.get(`[data-cy="burger_ingredient ${id}"]`).click();
            cy.url().should('include', `/ingredients/${id}`);
        });
        cy.get("#modals button").click();
        cy.url().should('eq', 'http://localhost:4000/');
    });
 
    it("Открытие попапа ингредиента с закрытием на оверлей", () => {
        cy.wait("@getIngredients");
        cy.fixture('ingredientsResponse.json').then((ingredientsResponse) => {
            const bun = ingredientsResponse.data.find((item: any) => item.type === 'bun');
            if (!bun) {
                throw new Error('Error in ingredientsResponse.json');
            }
            const id = bun._id;
            cy.get(`[data-cy="burger_ingredient ${id}"]`).click();
            cy.url().should('include', `/ingredients/${id}`);
        });
        cy.get(`[data-cy="modal_overlay"]`).click({force:true});
        cy.url().should('eq', 'http://localhost:4000/');
     });
          

    it("Создание заказа", () => {
        cy.wait("@getIngredients");
        cy.fixture('ingredientsResponse.json').then((ingredientsResponse) => {
            const bun = ingredientsResponse.data.find((item: any) => item.type === 'bun');
            if (!bun) {
                throw new Error('Error in ingredientsResponse.json');
            }
            cy.get(`[data-cy="burger_ingredient ${bun._id}"]`).contains("Добавить").click();
           
            cy.get(".tab").contains("Начинки").click();
            const main = ingredientsResponse.data.find((item: any) => item.type === 'main');
            if (!main) {
                throw new Error('Error in ingredientsResponse.json');
            }
            cy.get(`[data-cy="burger_ingredient ${main._id}"]`).contains("Добавить").click();
           
            const sauce = ingredientsResponse.data.find((item: any) => item.type === 'sauce');
            if (!sauce) {
                throw new Error('Error in ingredientsResponse.json');
            }
            cy.get(`[data-cy="burger_ingredient ${sauce._id}"]`).contains("Добавить").click();
 
 
            cy.get(`[data-cy="burger_constructor"]`).as("constructor");
            cy.get("@constructor").contains(bun.name);
            cy.get("@constructor").contains(main.name);
            cy.get("@constructor").contains(sauce.name);
        });
 
 
        cy.get("button").contains("Оформить заказ").click().wait("@postOrder");
 
 
        cy.fixture('orderResponse.json').then((orderResponse) => {
            cy.get("#modals").contains(orderResponse.order.number);
        });
 
 
        cy.get("#modals button").click();
        cy.url().should('eq', 'http://localhost:4000/');
        cy.get("@constructor").contains('Выберите булки');
cy.get("@constructor").contains('Выберите начинку');
    });
 });
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 