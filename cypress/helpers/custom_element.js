export const customElement = (selector) => {
  const element = {
    isVisible() {
      cy.get(selector).should("be.visible");
      return element;
    },
    isNotVisible() {
      cy.get(selector).should("be.visible");
      return element;
    },
    haveText(text) {
      cy.get(selector).should("have.text", text);
      return element;
    },
    containsText(text) {
      cy.get(selector).should("contain.text", text);
      return element;
    },
    haveValue(value) {
      cy.get(selector).should("have.value", value);
      return element;
    },
    havePlaceholder(placeholder) {
      cy.get(selector).should("have.attr", "placeholder", placeholder);
      return element;
    },
    haveAttribute(attribute, value) {
      cy.get(selector).should("have.attr", attribute, value);
      return element;
    },
    scrollIntoView() {
      cy.get(selector).scrollIntoView();
      return element;
    },
    get() {
      return cy.get(selector);
    },
    getXpath() {
      return cy.xpath(selector);
    },
  };
  return element;
};
