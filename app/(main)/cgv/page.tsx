import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | Fleurs Com\'Florie',
  description: 'Conditions générales de vente - Fleurs Com\'Florie, fleuriste à Villeneuve-Lès-Maguelone',
}

export default function CGVPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-neutral-900 mb-8">
          Conditions Générales de Vente
        </h1>

        <div className="bg-primary-50 p-6 rounded-lg mb-8">
          <p className="text-neutral-700">
            Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles entre Fleurs Com'Florie et ses clients dans le cadre de la vente de produits et services proposés sur le site internet.
          </p>
        </div>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 1 - Champ d'application
            </h2>
            <p className="mb-4">
              Les présentes CGV s'appliquent à toutes les ventes de produits et services effectuées par Fleurs Com'Florie, entreprise de fleuristerie située à Villeneuve-Lès-Maguelone, au moyen de son site internet.
            </p>
            <p className="mb-4">
              Le fait de passer commande implique l'adhésion entière et sans réserve de l'acheteur aux présentes conditions générales de vente.
            </p>
            <p className="mb-4">
              Fleurs Com'Florie se réserve le droit de modifier ses CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 2 - Produits et services
            </h2>
            <p className="mb-4">
              Fleurs Com'Florie propose à la vente des compositions florales fraîches, bouquets et arrangements floraux pour diverses occasions.
            </p>
            <p className="mb-4">
              Les produits sont présentés sur le site internet avec leurs caractéristiques essentielles (description, prix, disponibilité). Les photographies sont aussi fidèles que possible mais ne peuvent assurer une similitude parfaite avec le produit proposé, notamment en ce qui concerne les couleurs et les variétés de fleurs selon leur disponibilité saisonnière.
            </p>
            <p className="mb-4">
              Fleurs Com'Florie se réserve le droit de remplacer certaines variétés de fleurs par d'autres de qualité et de valeur équivalentes en fonction des approvisionnements et de la saisonnalité, tout en respectant l'harmonie générale de la composition.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 3 - Prix
            </h2>
            <p className="mb-4">
              Les prix des produits sont indiqués en euros, toutes taxes comprises (TTC).
            </p>
            <p className="mb-4">
              Fleurs Com'Florie se réserve le droit de modifier ses prix à tout moment. Les produits sont facturés sur la base des tarifs en vigueur au moment de la validation de la commande.
            </p>
            <p className="mb-4">
              Les prix ne comprennent pas les frais de livraison éventuels, qui sont facturés en supplément et indiqués avant la validation finale de la commande.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 4 - Commande
            </h2>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              4.1 Processus de commande
            </h3>
            <p className="mb-4">
              Pour passer commande, le client doit :
            </p>
            <ol className="list-decimal pl-6 mb-4 space-y-2">
              <li>Sélectionner le ou les produits souhaités</li>
              <li>Renseigner ses coordonnées (nom, prénom, email, téléphone)</li>
              <li>Choisir la date et l'heure de retrait (sous réserve de disponibilité)</li>
              <li>Valider sa commande</li>
              <li>Procéder au paiement en ligne</li>
            </ol>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              4.2 Validation de la commande
            </h3>
            <p className="mb-4">
              La commande n'est définitive qu'après paiement intégral du prix et envoi d'une confirmation par email.
            </p>
            <p className="mb-4">
              Fleurs Com'Florie se réserve le droit de refuser toute commande pour un motif légitime (notamment en cas d'indisponibilité des produits, de problème de paiement ou de litige antérieur avec le client).
            </p>

            <h3 className="text-xl font-semibold text-neutral-700 mb-3">
              4.3 Délai minimum de commande
            </h3>
            <p className="mb-4">
              Les commandes doivent être passées au minimum 24 heures avant la date de retrait souhaitée pour garantir la disponibilité et la fraîcheur des produits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 5 - Paiement
            </h2>
            <p className="mb-4">
              Le paiement s'effectue en ligne de manière sécurisée par carte bancaire via notre prestataire de paiement agréé.
            </p>
            <p className="mb-4">
              Les cartes bancaires acceptées sont : Visa, Mastercard, American Express.
            </p>
            <p className="mb-4">
              Le paiement est exigible immédiatement à la commande. En cas de refus de paiement par les organismes bancaires, la commande sera automatiquement annulée.
            </p>
            <p className="mb-4">
              Les données de paiement sont transmises de manière sécurisée et cryptée. Fleurs Com'Florie ne conserve aucune donnée bancaire.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 6 - Retrait de la commande
            </h2>
            <p className="mb-4">
              Les commandes sont à retirer en magasin à l'adresse suivante :
            </p>
            <div className="bg-neutral-50 p-6 rounded-lg mb-4">
              <p className="font-semibold">Fleurs Com'Florie</p>
              <p>[Adresse à compléter]</p>
              <p>34750 Villeneuve-Lès-Maguelone</p>
              <p className="mt-2"><strong>Horaires d'ouverture :</strong> [À compléter]</p>
            </div>
            <p className="mb-4">
              Le client s'engage à retirer sa commande à la date et à l'heure convenues. En cas d'empêchement, il doit prévenir Fleurs Com'Florie dans les plus brefs délais.
            </p>
            <p className="mb-4">
              Une pièce d'identité et/ou le numéro de commande pourront être demandés lors du retrait.
            </p>
            <p className="mb-4">
              En cas de non-retrait dans les 48 heures suivant la date prévue et sans nouvelle du client, la commande sera considérée comme abandonnée et ne pourra donner lieu à aucun remboursement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 7 - Droit de rétractation
            </h2>
            <p className="mb-4 bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <strong>Important :</strong> Conformément à l'article L221-28 du Code de la consommation, <strong>le droit de rétractation de 14 jours ne s'applique pas</strong> aux produits périssables tels que les fleurs fraîches.
            </p>
            <p className="mb-4">
              En conséquence, toute commande est ferme et définitive dès sa validation et son paiement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 8 - Annulation et modification de commande
            </h2>
            <p className="mb-4">
              Toute demande d'annulation ou de modification doit être effectuée par email à <a href="mailto:contact@fleurs-comflorie.fr" className="text-primary-600 hover:underline">contact@fleurs-comflorie.fr</a> ou par téléphone.
            </p>
            <p className="mb-4">
              Les conditions d'annulation sont les suivantes :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Plus de 48 heures avant le retrait :</strong> remboursement intégral</li>
              <li><strong>Entre 24 et 48 heures avant le retrait :</strong> remboursement de 50%</li>
              <li><strong>Moins de 24 heures avant le retrait :</strong> aucun remboursement (préparation déjà effectuée)</li>
            </ul>
            <p className="mb-4">
              Les remboursements éventuels seront effectués dans un délai de 14 jours par le même moyen de paiement que celui utilisé lors de l'achat.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 9 - Garanties et responsabilité
            </h2>
            <p className="mb-4">
              Fleurs Com'Florie s'engage à fournir des produits de qualité et conformes à la description.
            </p>
            <p className="mb-4">
              En raison de la nature périssable des fleurs, le client doit signaler toute non-conformité ou défaut dans les 2 heures suivant le retrait de la commande.
            </p>
            <p className="mb-4">
              Aucune réclamation ne pourra être prise en compte passé ce délai.
            </p>
            <p className="mb-4">
              En cas de non-conformité avérée, Fleurs Com'Florie s'engage à remplacer le produit ou à rembourser le client selon les possibilités.
            </p>
            <p className="mb-4">
              La responsabilité de Fleurs Com'Florie ne saurait être engagée pour tout dommage indirect résultant de l'utilisation des produits.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 10 - Conseils d'entretien
            </h2>
            <p className="mb-4">
              Pour garantir une longévité optimale des fleurs, il est recommandé de :
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Couper les tiges en biseau régulièrement</li>
              <li>Changer l'eau tous les 2 jours</li>
              <li>Éviter l'exposition directe au soleil et aux sources de chaleur</li>
              <li>Retirer les fleurs et feuilles fanées</li>
            </ul>
            <p className="mb-4">
              Fleurs Com'Florie ne saurait être tenue responsable d'un mauvais entretien des produits par le client.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 11 - Données personnelles
            </h2>
            <p className="mb-4">
              Les données personnelles collectées lors de la commande sont nécessaires au traitement de celle-ci et font l'objet d'un traitement informatique conforme au RGPD.
            </p>
            <p className="mb-4">
              Pour plus d'informations, consultez notre <a href="/politique-confidentialite" className="text-primary-600 hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 12 - Propriété intellectuelle
            </h2>
            <p className="mb-4">
              Tous les éléments du site (textes, images, logos, vidéos) sont protégés par le droit d'auteur et appartiennent à Fleurs Com'Florie ou à leurs auteurs respectifs.
            </p>
            <p className="mb-4">
              Toute reproduction, même partielle, est interdite sans autorisation préalable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 13 - Litiges et médiation
            </h2>
            <p className="mb-4">
              Les présentes CGV sont soumises au droit français.
            </p>
            <p className="mb-4">
              En cas de litige, le client peut recourir à une médiation conventionnelle ou à tout autre mode alternatif de règlement des litiges.
            </p>
            <p className="mb-4">
              Conformément à l'article L.612-1 du Code de la consommation, le client peut recourir gratuitement au service de médiation proposé par Fleurs Com'Florie.
            </p>
            <p className="mb-4">
              Le client peut également présenter sa réclamation sur la plateforme de résolution des litiges mise en ligne par la Commission Européenne à l'adresse : <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">https://ec.europa.eu/consumers/odr/</a>
            </p>
            <p className="mb-4">
              À défaut de règlement amiable, le litige sera porté devant les tribunaux compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              Article 14 - Contact
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2">Pour toute question concernant ces CGV, vous pouvez nous contacter :</p>
              <p className="mb-2"><strong>Email :</strong> <a href="mailto:contact@fleurs-comflorie.fr" className="text-primary-600 hover:underline">contact@fleurs-comflorie.fr</a></p>
              <p className="mb-2"><strong>Téléphone :</strong> [À compléter]</p>
              <p className="mb-2"><strong>Adresse :</strong> [À compléter], 34750 Villeneuve-Lès-Maguelone</p>
            </div>
          </section>

          <div className="bg-primary-50 p-6 rounded-lg mt-12">
            <p className="text-sm text-neutral-600">
              <strong>Date d'entrée en vigueur :</strong> {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
            <p className="text-sm text-neutral-600 mt-2">
              Fleurs Com'Florie se réserve le droit de modifier les présentes CGV à tout moment. Les CGV applicables sont celles en vigueur à la date de la commande.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
