describe('about 이동', () => {
  it('about을 클릭합니다', () => {
    cy.visit('/');
      cy.get('header .nav-link.active')
        .contains('Search');
      cy.get('header .nav-link')
        .contains('About')
        .click()
        .wait(1000);
  })
  it('about 인지 확인합니다', () => {
    cy.get('header .nav-link.active')
      .contains('About');
  })

  it('Moive로 이동합니다', () => {
    cy.get('header .nav-link')
      .contains('Movie')
      .click()
      .wait(1000)
  })

  it('아이콘을 클릭하여 about으로 이동합니다', () => {
    cy.get('header .user')
      .click()
      .wait(1000);
    cy.get('header .nav-link.active')
      .contains('About');
  })
})