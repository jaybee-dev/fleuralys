import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Cookies | Fleurs Com\'Florie',
  description: 'Politique de gestion des cookies - Fleurs Com\'Florie',
}

export default function CookiesPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-neutral-900 mb-8">
          Politique de Gestion des Cookies
        </h1>

        <div className="bg-primary-50 p-6 rounded-lg mb-8">
          <p className="text-neutral-700">
            Cette page vous informe sur l'utilisation des cookies sur le site Fleurs Com'Florie et sur les moyens dont vous disposez pour les gérer.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              1. Qu'est-ce qu'un cookie ?
            </h2>
            <p className="mb-4">
              Un cookie est un petit fichier texte déposé sur votre ordinateur, tablette ou smartphone lors de la visite d'un site internet.
            </p>
            <p className="mb-4">
              Les cookies permettent au site de reconnaître votre appareil et de mémoriser certaines informations sur vos préférences ou actions passées.
            </p>
            <p className="mb-4">
              Les cookies ne contiennent aucune donnée personnelle permettant de vous identifier directement, mais les informations personnelles que nous conservons à votre sujet peuvent être liées aux informations stockées dans les cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              2. Pourquoi utilisons-nous des cookies ?
            </h2>
            <p className="mb-4">
              Nous utilisons des cookies pour différentes raisons :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Cookies essentiels :</strong> nécessaires au fonctionnement du site (panier, connexion, sécurité)</li>
              <li><strong>Cookies de performance :</strong> pour analyser l'utilisation du site et améliorer ses performances</li>
              <li><strong>Cookies de fonctionnalité :</strong> pour mémoriser vos préférences et personnaliser votre expérience</li>
              <li><strong>Cookies analytiques :</strong> pour comprendre comment les visiteurs utilisent notre site</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              3. Types de cookies utilisés sur notre site
            </h2>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              3.1 Cookies strictement nécessaires
            </h3>
            <p className="mb-4">
              Ces cookies sont indispensables au fonctionnement du site. Ils vous permettent de naviguer et d'utiliser les fonctionnalités essentielles (panier, paiement sécurisé, mémorisation de vos choix).
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mb-4">
              <p className="mb-2"><strong>Exemples :</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Cookies de session (supprimés à la fermeture du navigateur)</li>
                <li>Cookies de panier d'achat</li>
                <li>Cookies de sécurité (protection CSRF)</li>
              </ul>
              <p className="mt-3 text-sm"><strong>Durée de conservation :</strong> Session ou 1 an maximum</p>
              <p className="text-sm"><strong>Consentement requis :</strong> Non (strictement nécessaires)</p>
            </div>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              3.2 Cookies de performance et analytiques
            </h3>
            <p className="mb-4">
              Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des informations de manière anonyme.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mb-4">
              <p className="mb-2"><strong>Utilisation :</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Mesure d'audience et statistiques de visite</li>
                <li>Identification des pages les plus consultées</li>
                <li>Amélioration de la navigation et de l'ergonomie</li>
              </ul>
              <p className="mt-3 text-sm"><strong>Durée de conservation :</strong> 13 mois maximum</p>
              <p className="text-sm"><strong>Consentement requis :</strong> Oui</p>
            </div>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              3.3 Cookies de fonctionnalité
            </h3>
            <p className="mb-4">
              Ces cookies permettent au site de mémoriser vos choix et de vous offrir une expérience personnalisée.
            </p>
            <div className="bg-neutral-50 p-4 rounded-lg mb-4">
              <p className="mb-2"><strong>Exemples :</strong></p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Mémorisation de vos préférences de langue</li>
                <li>Mémorisation de vos produits favoris</li>
                <li>Personnalisation de l'affichage</li>
              </ul>
              <p className="mt-3 text-sm"><strong>Durée de conservation :</strong> 12 mois maximum</p>
              <p className="text-sm"><strong>Consentement requis :</strong> Oui</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              4. Cookies tiers
            </h2>
            <p className="mb-4">
              Notre site peut également utiliser des cookies provenant de services tiers :
            </p>

            <div className="space-y-4">
              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Paiement en ligne (LemonSqueezy/Stripe)</h4>
                <p className="text-sm mb-2">Cookies nécessaires pour sécuriser les transactions et prévenir la fraude.</p>
                <p className="text-sm"><strong>Politique de confidentialité :</strong> <a href="https://www.lemonsqueezy.com/privacy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">LemonSqueezy Privacy</a></p>
              </div>

              <div className="bg-neutral-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Hébergement (Vercel)</h4>
                <p className="text-sm mb-2">Cookies techniques pour optimiser les performances et la sécurité du site.</p>
                <p className="text-sm"><strong>Politique de confidentialité :</strong> <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Vercel Privacy</a></p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              5. Comment gérer vos cookies ?
            </h2>
            <p className="mb-4">
              Vous disposez de plusieurs moyens pour gérer les cookies :
            </p>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              5.1 Paramétrage lors de votre visite
            </h3>
            <p className="mb-4">
              Lors de votre première visite sur notre site, une bannière vous informe de l'utilisation de cookies et vous permet de :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Accepter tous les cookies</li>
              <li>Refuser les cookies non essentiels</li>
              <li>Personnaliser vos choix par catégorie de cookies</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              5.2 Paramétrage de votre navigateur
            </h3>
            <p className="mb-4">
              Vous pouvez configurer votre navigateur pour accepter ou refuser les cookies :
            </p>

            <div className="bg-neutral-50 p-6 rounded-lg mb-4 space-y-3 text-sm">
              <div>
                <strong className="block mb-1">Google Chrome :</strong>
                Menu &gt; Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données de sites
                <br />
                <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Plus d'infos</a>
              </div>

              <div>
                <strong className="block mb-1">Mozilla Firefox :</strong>
                Menu &gt; Options &gt; Vie privée et sécurité &gt; Cookies et données de sites
                <br />
                <a href="https://support.mozilla.org/fr/kb/activer-desactiver-cookies" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Plus d'infos</a>
              </div>

              <div>
                <strong className="block mb-1">Safari :</strong>
                Préférences &gt; Confidentialité &gt; Cookies et données de sites web
                <br />
                <a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Plus d'infos</a>
              </div>

              <div>
                <strong className="block mb-1">Microsoft Edge :</strong>
                Menu &gt; Paramètres &gt; Confidentialité, recherche et services &gt; Cookies et autorisations de site
                <br />
                <a href="https://support.microsoft.com/fr-fr/microsoft-edge/supprimer-les-cookies-dans-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">Plus d'infos</a>
              </div>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
              <p className="text-sm">
                <strong>⚠️ Attention :</strong> Le refus de certains cookies peut limiter votre accès à certaines fonctionnalités du site (panier, commande en ligne).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              6. Durée de conservation des cookies
            </h2>
            <p className="mb-4">
              La durée de conservation des cookies sur votre terminal dépend de leur type :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Cookies de session :</strong> supprimés automatiquement à la fermeture de votre navigateur</li>
              <li><strong>Cookies permanents :</strong> conservés pour une durée maximale de 13 mois conformément aux recommandations de la CNIL</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              7. Vos droits
            </h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et d'opposition aux données personnelles collectées via les cookies.
            </p>
            <p className="mb-4">
              Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@fleurs-comflorie.fr" className="text-primary-600 hover:underline">contact@fleurs-comflorie.fr</a>
            </p>
            <p className="mb-4">
              Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-primary-600 hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              8. Modification de la politique de cookies
            </h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier cette politique de cookies à tout moment. Toute modification sera publiée sur cette page.
            </p>
            <p className="mb-4">
              Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              9. Pour en savoir plus
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-4">Pour plus d'informations sur les cookies et leur gestion :</p>
              <ul className="space-y-2 text-sm">
                <li>
                  <strong>CNIL (Commission Nationale de l'Informatique et des Libertés) :</strong>
                  <br />
                  <a href="https://www.cnil.fr/fr/cookies-et-autres-traceurs" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    https://www.cnil.fr/fr/cookies-et-autres-traceurs
                  </a>
                </li>
                <li>
                  <strong>Votre Online Choices (gestion des cookies publicitaires) :</strong>
                  <br />
                  <a href="https://www.youronlinechoices.com/fr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    https://www.youronlinechoices.com/fr/
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <div className="bg-primary-50 p-6 rounded-lg mt-12">
            <p className="text-sm text-neutral-600">
              <strong>Dernière mise à jour :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
