

bon c'est parti pour une explication de `react-stripe-elements`.
###############################################################################
Chez Stripe, ils ont pensé à tout pour faciliter l'intégration de Stripe avec React.
Ils ont donc sorti une petite librairie Javascript qui encapsule les éléments
d´un formulaire de paiement dans des composants React.
L'avantage d'utiliser cette solution est tu as déjà une validation sur les données saisies.
Par exemple: les numéros de carte incomplets sont mis en surbrillance.

Je vais vous présenter comment j´ai intégrer ces éléments dans une page ecommerce React.

# La définition des composants.

L'applicaition est découpée en 3 composants principaux.
Le dernier est le composant de paiement.

~~~html
<div className="App">
  <ProductView/>
  <UserInfo/>
  <Payment/>
</div>
~~~

Tous les composants de paiement doivent être encapsulés dans un composant parent
`<StripeProvider>`.
Ce composant va instancier l'objet Stripe principal en charge de l'envoi des
données saisies.
C'est dans le composant `<StripeProvider>` a besoin de la clef d'API publique.

~~~html
<StripeProvider apiKey="pk_test_public_api_key">
  <Checkout/>
</StripeProvider>
~~~

Le form de paiment doit ensuite encapsulés dans le composant `<Elements>`.
C'est une façon de définir le groupe de composants à utiliser pour l'envoi
des données pour la création du token de la carte de crédit.

~~~html
<Elements>
  <CardForm/>
</Elements>
~~~

Enfin le composant `<CarForm>` contient le form.

~~~html
<form onSubmit={this.handleSubmit}>

  <Error msg={this.state.error} />
  <Success msg={this.state.success} />

  <div className="form-group">
    <label>CardNumberElement</label>
    <CardNumberElement { ...this.createCssOptions() } />
  </div>

  <div className="form-group">
    <label>CardExpiryElement</label>
    <CardExpiryElement { ...this.createCssOptions() } />
  </div>

  <div className="form-group">
    <label>CardCVCElement</label>
    <CardCVCElement { ...this.createCssOptions() } />
  </div>

  <button type="submit" className="btn btn-primary">Pika Pay!</button>
</form>
~~~

Ici nous définissons les composants que nous souhaitons voir apparaître sur notre formulaire:
 - un champs numéro de carte
 - un champs date d'expiration
 - un champ code de sécurité

??? faire un point sur la gestion de l'internationalisation. Avec les labels.


# Les appels JS.

Une fois le formulaire mis en place, il ne reste plus qu'à envoyer les données pour recevoir le token de la carte de crédit qui servira à débiter la carte.
Ce qu'il faut bien garder en tete, c'est que la transaction se fait en 2 étapes:
 - tokenization de la carte de crédit
 - demande de débit à l'aide du token reçu

Toutes la communication est prise en charge par l'objet Stripe créé par le composant `<StripeProvide>`.
Ce dernier va rendre accessible l'objet Stripe en le passant en `props`.

~~~javascript
handleSubmit(ev) {
  ev.preventDefault();

  this.props.stripe.createToken({name: this.props.clientName})
    .then(result => {
      if(typeof(result.error) !== 'undefined') {
        this.setState({ error: result.error.message, success: ''});
      } else {
        this.stripeCreateCharge(result.token, this.props.totalPrice);
      }
    });
}
~~~

Le nom du client n'est pas dans le form de paiement.
Il est donc passé en plus lors de l'appel à `stripe.createToken`.
En cas de succès, cet appel nous retourne le token de la carte de crédit qui nous permet d'appeler `stripeCreateCharge` pour débiter le montant de l'achat.

~~~javascript
stripeCreateCharge(token, amount) {
  const params = { token: token.id, amount: amount };
  const qParams = queryString.stringify(params);
  const url = ['/api', qParams].join('?');

  fetch(url)
    .then(response => response.json())
    .then(val => {
      if (val.ok) {
        return val.message;
      } else {
        throw val.message;
      }
    })
    .then(success => this.setState({alertMessage: success, alertStyle: 'success'}))
    .catch(error => this.setState({alertMessage: error, alertStyle: 'danger'}));
}
~~~

## Tester son formulaire de paiment

Un formulaire de paiement est une partie sensible, il faut donc le tester soigneusement.
Pour ce faire, Stripe met à disposition un [ensemble de numéros de cartes de crédit de test](https://stripe.com/docs/testing#cards).

~~~
4242 4242 4242 4242 Visa
~~~

## En conclusion

Vous voici désormais en possession des cartes principales pour la mis en place d'un formulaire de paiment avec React & Stripe.
Pour aller plus loin, n'hésitez pas à consulter la documentation sur le sujet:
 - https://github.com/stripe/react-stripe-elements
 - https://stripe.com/elements?locale=fr

