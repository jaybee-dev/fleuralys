import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-neutral-200 mt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif font-bold text-white mb-4">
              Fleurs com'Florie
            </h3>
            <p className="text-sm text-neutral-400">
              Votre fleuriste à Villeneuve-Lès-Maguelone. Compositions florales artisanales pour toutes vos occasions.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-primary-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/galerie" className="text-sm hover:text-primary-400 transition-colors">
                  Galerie
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-primary-400 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/pickup" className="text-sm hover:text-primary-400 transition-colors">
                  Commander
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-medium text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
                <span itemProp="streetAddress">62 Boulevard des Fontaines</span><br />
                <span itemProp="postalCode">34750</span> <span itemProp="addressLocality">Villeneuve-Lès-Maguelone</span>
              </li>
              <li>Tel: <a href="tel:+0467695236
" className="hover:text-primary-400">04 67 69 52 36
</a></li>
              <li>Email: <a href="mailto:contact@fleurs-comflorie.fr" className="hover:text-primary-400">contact@fleurs-comflorie.fr</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center text-sm text-neutral-400">
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-4">
            <Link href="/mentions-legales" className="hover:text-primary-400 transition-colors">
              Mentions légales
            </Link>
            <span className="hidden md:inline text-neutral-600">•</span>
            <Link href="/politique-confidentialite" className="hover:text-primary-400 transition-colors">
              Politique de confidentialité
            </Link>
            <span className="hidden md:inline text-neutral-600">•</span>
            <Link href="/cgv" className="hover:text-primary-400 transition-colors">
              CGV
            </Link>
            <span className="hidden md:inline text-neutral-600">•</span>
            <Link href="/cookies" className="hover:text-primary-400 transition-colors">
              Gestion des cookies
            </Link>
            <span className="hidden md:inline text-neutral-600">•</span>
            <Link href="/admin/login" className="hover:text-primary-400 transition-colors opacity-50 hover:opacity-100">
              Administration
            </Link>
          </div>
          <p>&copy; {new Date().getFullYear()} Fleurs com'Florie - Fleuriste à Villeneuve-Lès-Maguelone. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
