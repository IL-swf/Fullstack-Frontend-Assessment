describe('As a user when I load the website', ()=> {
    it('Should have a title bar.', () => {
        cy.visit('')

        cy.get('.MuiPaper-root > .MuiTypography-root').should("contain.text", "Galvanize Library");
    })

    it('Should have a list of books.', () => {
        cy.visit('')

        cy.get('li').should("have.length.above", 1);
        cy.get('li').should("contain.text", "Author");
    })

    it('Should be able to favorite a book', () => {
        cy.visit('')

        cy.get(':nth-child(2) > [aria-label="Favorite Book"] > [data-testid="FavoriteIcon"] > path').click();
        cy.get(':nth-child(2) > .MuiListItemText-root > .MuiTypography-h5').should("have.css", "font-weight", "700");
        cy.get(':nth-child(2) > [aria-label="Un-Favorite Book"] > [data-testid="FavoriteIcon"] > path').click();
        cy.get(':nth-child(2) > .MuiListItemText-root > .MuiTypography-h5').should("have.css", "font-weight", "400");

    })

    it('Should let me add a book or cancel adding a book', () => {
        cy.visit('')

        cy.get('.add-book-button').click();
        cy.get('.title-input').clear();
        cy.get('.title-input').type('Testing');
        cy.get('.author-input').clear();
        cy.get('.author-input').type('Me');
        cy.get('.add-book-submit').click();
        cy.get(':nth-child(6)');
        cy.get('li').should("contain.text", "Testing");
        cy.get('.add-book-button').click();
        cy.get('.add-book-cancel').click();
    })

    it('Should let me delete a book', () => {
        cy.visit('')

        cy.get(':nth-child(6) > [aria-label="Remove Book"] > [data-testid="DeleteIcon"] > path').click();

        cy.get('li').should("not.contain.text", "Testing");
    })
})
