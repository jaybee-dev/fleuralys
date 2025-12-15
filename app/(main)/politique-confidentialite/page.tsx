import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Confidentialité | Fleurs Com\'Florie',
  description: 'Politique de confidentialité et protection des données personnelles - Fleurs Com\'Florie',
}

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-neutral-900 mb-8">
          Politique de Confidentialité
        </h1>

        <div className="bg-primary-50 p-6 rounded-lg mb-8">
          <p className="text-neutral-700">
            Chez Fleurs Com'Florie, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité vous informe sur la manière dont nous collectons, utilisons et protégeons vos informations conformément au Règlement Général sur la Protection des Données (RGPD).
          </p>
        </div>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              1. Responsable du traitement des données
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Responsable :</strong> Fleurs Com'Florie</p>
              <p className="mb-2"><strong>Adresse :</strong> 62 Boulevard des Fontaines, 34750 Villeneuve-Lès-Maguelone</p>
              <p className="mb-2"><strong>Email :</strong> contact@fleurs-comflorie.fr</p>
              <p className="mb-2"><strong>Téléphone :</strong> 04 67 69 52 36
</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              2. Données collectées
            </h2>
            <p className="mb-4">
              Dans le cadre de l'utilisation de notre site et de la commande de nos produits, nous sommes amenés à collecter les données personnelles suivantes :
            </p>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              Données collectées lors d'une commande :
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Nom et prénom</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone</li>
              <li>Adresse de livraison</li>
              <li>Détails de la commande (produits, date et heure de retrait)</li>
              <li>Informations de paiement (traitées de manière sécurisée par notre prestataire de paiement)</li>
            </ul>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              Données collectées automatiquement :
            </h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Adresse IP</li>
              <li>Type de navigateur</li>
              <li>Pages visitées</li>
              <li>Date et heure de visite</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              3. Finalités du traitement
            </h2>
            <p className="mb-4">
              Vos données personnelles sont collectées et traitées pour les finalités suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Gestion des commandes :</strong> traitement, préparation et suivi de vos commandes</li>
              <li><strong>Communication :</strong> vous contacter concernant votre commande, répondre à vos questions</li>
              <li><strong>Facturation :</strong> établissement et envoi de factures</li>
              <li><strong>Service client :</strong> gestion des réclamations et du SAV</li>
              <li><strong>Amélioration du service :</strong> analyse statistique de l'utilisation du site</li>
              <li><strong>Marketing (avec votre consentement) :</strong> envoi de newsletters et offres promotionnelles</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              4. Base légale du traitement
            </h2>
            <p className="mb-4">
              Le traitement de vos données repose sur les bases légales suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Exécution du contrat :</strong> traitement nécessaire à l'exécution de votre commande</li>
              <li><strong>Obligation légale :</strong> respect des obligations comptables et fiscales</li>
              <li><strong>Intérêt légitime :</strong> amélioration de nos services, prévention de la fraude</li>
              <li><strong>Consentement :</strong> envoi de communications marketing (vous pouvez retirer votre consentement à tout moment)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              5. Durée de conservation
            </h2>
            <p className="mb-4">
              Vos données personnelles sont conservées pendant les durées suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Données de commande :</strong> 10 ans (obligations comptables et fiscales)</li>
              <li><strong>Données de compte client :</strong> 3 ans à compter de la dernière activité</li>
              <li><strong>Données de prospection :</strong> 3 ans à compter du dernier contact</li>
              <li><strong>Cookies :</strong> 13 mois maximum</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              6. Destinataires des données
            </h2>
            <p className="mb-4">
              Vos données personnelles peuvent être transmises aux destinataires suivants :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Personnel autorisé :</strong> nos employés en charge de la gestion des commandes</li>
              <li><strong>Prestataires de services :</strong>
                <ul className="list-circle pl-6 mt-2 space-y-1">
                  <li>Hébergement du site (Vercel)</li>
                  <li>Base de données (Supabase)</li>
                  <li>Paiement en ligne (LemonSqueezy/Stripe)</li>
                </ul>
              </li>
              <li><strong>Autorités compétentes :</strong> sur demande légale ou judiciaire</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              7. Transfert de données hors UE
            </h2>
            <p className="mb-4">
              Certains de nos prestataires de services sont situés en dehors de l'Union Européenne (notamment Vercel aux États-Unis). Dans ce cas, vos données sont protégées par :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Des clauses contractuelles types approuvées par la Commission Européenne</li>
              <li>Le respect de garanties appropriées conformes au RGPD</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              8. Vos droits
            </h2>
            <p className="mb-4">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>

            <div className="bg-neutral-50 p-6 rounded-lg mb-4">
              <ul className="space-y-3">
                <li><strong>Droit d'accès :</strong> obtenir une copie de vos données personnelles</li>
                <li><strong>Droit de rectification :</strong> corriger des données inexactes ou incomplètes</li>
                <li><strong>Droit à l'effacement :</strong> demander la suppression de vos données (sous certaines conditions)</li>
                <li><strong>Droit à la limitation du traitement :</strong> demander la suspension temporaire du traitement</li>
                <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré et couramment utilisé</li>
                <li><strong>Droit d'opposition :</strong> vous opposer au traitement de vos données (notamment pour la prospection)</li>
                <li><strong>Droit de retirer votre consentement :</strong> à tout moment, sans affecter la licéité du traitement fondé sur le consentement effectué avant le retrait</li>
                <li><strong>Droit de définir des directives post-mortem :</strong> définir ce qu'il advient de vos données après votre décès</li>
              </ul>
            </div>

            <p className="mb-4">
              Pour exercer vos droits, vous pouvez nous contacter par email à <a href="mailto:contact@fleurs-comflorie.fr" className="text-primary-600 hover:underline">contact@fleurs-comflorie.fr</a> ou par courrier à l'adresse indiquée ci-dessus.
            </p>
            <p className="mb-4">
              Nous nous engageons à répondre à votre demande dans un délai d'un mois maximum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              9. Sécurité des données
            </h2>
            <p className="mb-4">
              Nous mettons en œuvre toutes les mesures techniques et organisationnelles appropriées pour garantir la sécurité de vos données personnelles :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Chiffrement des données en transit (HTTPS/SSL)</li>
              <li>Chiffrement des données sensibles en base de données</li>
              <li>Contrôle d'accès strict aux données</li>
              <li>Surveillance et détection des intrusions</li>
              <li>Sauvegardes régulières</li>
              <li>Mise à jour régulière des systèmes de sécurité</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              10. Cookies
            </h2>
            <p className="mb-4">
              Notre site utilise des cookies pour améliorer votre expérience de navigation. Pour plus d'informations sur l'utilisation des cookies, consultez notre <a href="/cookies" className="text-primary-600 hover:underline">Politique de cookies</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              11. Réclamation
            </h2>
            <p className="mb-4">
              Si vous estimez que vos droits ne sont pas respectés, vous avez le droit d'introduire une réclamation auprès de la Commission Nationale de l'Informatique et des Libertés (CNIL) :
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2"><strong>CNIL</strong></p>
              <p className="mb-2">3 Place de Fontenoy - TSA 80715</p>
              <p className="mb-2">75334 PARIS CEDEX 07</p>
              <p className="mb-2">Téléphone : 01 53 73 22 22</p>
              <p className="mb-2">Site web : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">www.cnil.fr</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              12. Modifications
            </h2>
            <p className="mb-4">
              Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
            </p>
            <p className="mb-4">
              Nous vous encourageons à consulter régulièrement cette page pour prendre connaissance des éventuelles modifications.
            </p>
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
