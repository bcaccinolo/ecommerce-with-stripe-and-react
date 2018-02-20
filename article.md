Accepting a card payment using Stripe is a two-step process, with a client-side and a server-side action:

From your website running in the customer’s browser, Stripe securely collects your customer’s payment information and returns a representative token. This, along with any other form data, is then submitted by the browser to your server.
Using the token, your server-side code makes an API request to create a charge and complete the payment.
Tokenization ensures that no sensitive card data ever needs to touch your server so your integration can operate in a PCI compliant way.