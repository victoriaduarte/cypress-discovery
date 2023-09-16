

describe('register', () => {
    it('user must become a delivery person', () => {
        cy.visit('https://buger-eats.vercel.app')
        cy.get('a[href="/deliver"]').click()
        cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')

        var delivery = {
            name: 'Victória Duarte',
            cpf: '00000000010',
            email: 'victoriarduarte@hotmail.com',
            whatsapp: '48999999999 Duarte',
            endereco: {
                cep: '88056000',
                address: 'Avenida Luiz Boiteux Piazza',
                number: 5000,
                complement: 'Ap 60',
                district: 'Cachoeira do Bom Jesus',
                city_uf: 'Florianópolis/SC'
            },
            delivery_method: 'Van/Carro',
            cnh: 'cnh.jpg'
        }

        cy.get('input[name="name"]').type(delivery.name)
        cy.get('input[name="cpf"]').type(delivery.cpf)
        cy.get('input[name="email"]').type(delivery.email)
        cy.get('input[name="whatsapp"]').type(delivery.whatsapp)

        cy.get('input[name="postalcode"]').type(delivery.endereco.cep)
        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.get('input[name="address-number"]').type(delivery.endereco.number)
        cy.get('input[name="address-details"]').type(delivery.endereco.complement)

        cy.get('input[name="address"]').should('have.value', delivery.endereco.address)
        cy.get('input[name="district"]').should('have.value', delivery.endereco.district)
        cy.get('input[name="city-uf"]').should('have.value', delivery.endereco.city_uf)

        cy.contains('.delivery-method li', delivery.delivery_method).click()

        cy.get('input[accept^="image"]').attachFile('/images/' + delivery.cnh)

        cy.get('button[class="button-success"]').click()

        cy.get('.swal2-popup.swal2-modal').should('be.visible')
        cy.get('.swal2-confirm').click()
        cy.get('#page-home main h1').should('have.text','Seja um parceiro entregador pela Buger Eats')
    })
})