import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales | Fleurs Com\'Florie',
  description: 'Mentions légales du site Fleurs Com\'Florie - Fleuriste à Villeneuve-Lès-Maguelone',
}

export default function MentionsLegalesPage() {
  return (
    <div className="container-custom py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-title font-bold text-neutral-900 mb-8">
          Mentions Légales
        </h1>

        <div className="prose prose-neutral max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              1. Informations légales
            </h2>
            <p className="mb-4">
              Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Fleurs Com'Florie l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              2. Éditeur du site
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Raison sociale :</strong> Fleurs Com'Florie</p>
              <p className="mb-2"><strong>Forme juridique :</strong> [A COMPLETER]</p>
              <p className="mb-2"><strong>SIRET :</strong> [A COMPLETER]</p>
              <p className="mb-2"><strong>N° TVA intracommunautaire :</strong> [A COMPLETER SI APPLICABLE]</p>
              <p className="mb-2"><strong>Adresse du siège social :</strong> 62 Boulevard des Fontaines, 34750 Villeneuve-Lès-Maguelone</p>
              <p className="mb-2"><strong>Téléphone :</strong> 04 67 69 52 36
</p>
              <p className="mb-2"><strong>Email :</strong> contact@fleurs-comflorie.fr</p>
              <p className="mb-2"><strong>Directeur de la publication :</strong> [Nom du gérant à compléter]</p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              3. Hébergement du site
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Hébergeur :</strong> Vercel Inc.</p>
              <p className="mb-2"><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis</p>
              <p className="mb-2"><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">vercel.com</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              4. Base de données
            </h2>
            <div className="bg-neutral-50 p-6 rounded-lg">
              <p className="mb-2"><strong>Hébergeur de la base de données :</strong> Supabase Inc.</p>
              <p className="mb-2"><strong>Adresse :</strong> 970 Toa Payoh North, #07-04, Singapore 318992</p>
              <p className="mb-2"><strong>Site web :</strong> <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">supabase.com</a></p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              5. Propriété intellectuelle
            </h2>
            <p className="mb-4">
              L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p className="mb-4">
              La reproduction de tout ou partie de ce site sur un support électronique ou autre quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              6. Responsabilité
            </h2>
            <p className="mb-4">
              Les informations contenues sur ce site sont aussi précises que possible et le site est périodiquement remis à jour, mais peut toutefois contenir des inexactitudes, des omissions ou des lacunes.
            </p>
            <p className="mb-4">
              Si vous constatez une lacune, erreur ou ce qui paraît être un dysfonctionnement, merci de bien vouloir le signaler par email à <a href="mailto:contact@fleurs-comflorie.fr" className="text-primary-600 hover:underline">contact@fleurs-comflorie.fr</a>.
            </p>
            <p className="mb-4">
              Fleurs Com'Florie ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l'utilisateur lors de l'accès au site, et résultant soit de l'utilisation d'un matériel ne répondant pas aux spécifications indiquées, soit de l'apparition d'un bug ou d'une incompatibilité.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              7. Liens hypertextes
            </h2>
            <p className="mb-4">
              Le site peut contenir des liens hypertextes vers d'autres sites présents sur le réseau Internet. Les liens vers ces autres ressources vous font quitter le site Fleurs Com'Florie.
            </p>
            <p className="mb-4">
              Il est possible de créer un lien vers la page de présentation de ce site sans autorisation expresse de l'éditeur. Aucune autorisation ni demande d'information préalable ne peut être exigée par l'éditeur à l'égard d'un site qui souhaite établir un lien vers le site de l'éditeur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              8. Protection des données personnelles
            </h2>
            <p className="mb-4">
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit d'accès, de rectification, de suppression et d'opposition aux données personnelles vous concernant.
            </p>
            <p className="mb-4">
              Pour plus d'informations sur la protection de vos données personnelles, consultez notre <a href="/politique-confidentialite" className="text-primary-600 hover:underline">Politique de confidentialité</a>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-title font-semibold text-neutral-800 mb-4">
              9. Droit applicable
            </h2>
            <p className="mb-4">
              Le présent site et les présentes mentions légales sont soumis au droit français. En cas de litige et à défaut d'accord amiable, le litige sera porté devant les tribunaux français conformément aux règles de compétence en vigueur.
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
