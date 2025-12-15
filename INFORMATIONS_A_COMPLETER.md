# 📝 Informations à Compléter

## Fichiers à Mettre à Jour

### 1. [app/schema.ts](app/schema.ts) - Informations Business

#### Téléphone (ligne 9)
```typescript
telephone: '+33-0-00-00-00-00', // ❌ À REMPLACER
```
**Format attendu** : `+33-X-XX-XX-XX-XX` (avec le code pays)

#### Adresse (lignes 14-20)
```typescript
address: {
  '@type': 'PostalAddress',
  streetAddress: 'Adresse à compléter', // ❌ À REMPLACER
  addressLocality: 'Villeneuve-Lès-Maguelone', // ✅ OK
  postalCode: '34750', // ✅ OK
  addressRegion: 'Occitanie', // ✅ OK
  addressCountry: 'FR', // ✅ OK
},
```
**Exemple** : `streetAddress: '12 Avenue de la Gare'`

#### Coordonnées GPS (lignes 22-26)
```typescript
geo: {
  '@type': 'GeoCoordinates',
  latitude: 43.5333, // ⚠️ Approximatif
  longitude: 3.8667, // ⚠️ Approximatif
},
```
**Comment obtenir les coordonnées exactes** :
1. Allez sur Google Maps
2. Recherchez votre adresse
3. Clic droit > "Plus d'infos sur cet endroit"
4. Les coordonnées s'affichent (ex: 43.532547, 3.864892)

#### Horaires (lignes 28-42)
```typescript
openingHoursSpecification: [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00', // ⚠️ À vérifier
    closes: '19:00', // ⚠️ À vérifier
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Saturday',
    opens: '09:00', // ⚠️ À vérifier
    closes: '18:00', // ⚠️ À vérifier
  },
],
```
**Format** : HH:MM (24h)

#### Réseaux Sociaux (lignes 44-47)
```typescript
sameAs: [
  'https://www.instagram.com/fleurs-comflorie', // ❌ À créer
  'https://www.facebook.com/fleurs-comflorie', // ❌ À créer
],
```

---

### 2. [components/Footer.tsx](components/Footer.tsx) - Contact

#### Adresse (lignes 46-49)
```typescript
<li itemProp="address" itemScope itemType="http://schema.org/PostalAddress">
  <span itemProp="streetAddress">Adresse à compléter</span><br /> {/* ❌ À REMPLACER */}
  <span itemProp="postalCode">34750</span> <span itemProp="addressLocality">Villeneuve-Lès-Maguelone</span>
</li>
```

#### Téléphone (ligne 50)
```typescript
<li>Tel: <a href="tel:+33000000000" className="hover:text-primary-400">À compléter</a></li>
```
**Format lien** : `tel:+33XXXXXXXXX` (sans espaces)
**Format affichage** : Au choix (ex: 04 XX XX XX XX)

#### Email (ligne 51) - ✅ Déjà configuré
```typescript
<li>Email: <a href="mailto:contact@fleurs-comflorie.fr">contact@fleurs-comflorie.fr</a></li>
```

---

### 3. [app/layout.tsx](app/layout.tsx) - URL du Site (ligne 11)

```typescript
metadataBase: new URL('https://fleurs-comflorie.fr'), // ⚠️ À vérifier
```
**Si vous avez un autre nom de domaine** : Changez-le ici

**Et aussi lignes 18, 45-46** :
```typescript
url: 'https://fleurs-comflorie.fr',
sitemap: 'https://fleurs-comflorie.fr/sitemap.xml',
```

---

## 📋 Checklist de Complétion

### Informations Requises
- [ ] Adresse exacte de la boutique
- [ ] Numéro de téléphone
- [ ] Coordonnées GPS précises (Google Maps)
- [ ] Horaires d'ouverture réels
- [ ] Nom de domaine final (si différent de fleurs-comflorie.fr)

### Réseaux Sociaux (Optionnel mais recommandé)
- [ ] Créer compte Instagram
- [ ] Créer page Facebook
- [ ] Mettre à jour les liens

### Comment Compléter

#### Méthode 1 : Éditer directement les fichiers
1. Ouvrir les fichiers listés ci-dessus
2. Rechercher les lignes indiquées
3. Remplacer les valeurs

#### Méthode 2 : Rechercher dans tout le projet
```bash
# Rechercher "À compléter"
grep -r "À compléter" .

# Rechercher "+33-0-00-00-00-00"
grep -r "+33-0-00-00-00-00" .
```

## 🎯 Impact SEO

### Avant Complétion
- SEO : 63/100 🟡
- Google My Business : Impossible à créer
- Référencement local : Limité

### Après Complétion
- SEO : 85-90/100 🟢
- Google My Business : Opérationnel
- Référencement local : Excellent

## 💡 Conseils

### Pour l'Adresse
- Utilisez l'adresse exacte comme sur Google Maps
- Incluez le numéro de rue, le nom de la rue
- Format : "12 Avenue de la Gare" (pas d'abréviation)

### Pour le Téléphone
- Format international : +33 4 XX XX XX XX
- Évitez les 0 après +33 (redondant)
- Testez le lien en cliquant dessus sur mobile

### Pour les Horaires
- Format 24h (09:00, pas 9:00 AM)
- Incluez les fermetures (dimanche, jours fériés)
- Soyez précis (meilleur pour le SEO)

### Pour les Coordonnées GPS
- Plus c'est précis, mieux c'est
- Google Maps : clic droit > coordonnées
- Vérifiez que le point est bien sur votre boutique

## ❓ Questions Fréquentes

**Q: Dois-je tout compléter maintenant?**
R: Non, mais l'adresse et le téléphone sont essentiels pour Google My Business

**Q: Et si je n'ai pas encore de réseaux sociaux?**
R: Pas grave, commentez les lignes ou laissez-les vides

**Q: Dois-je changer le nom de domaine?**
R: Oui, si vous en avez un autre. Sinon, fleurs-comflorie.fr est bien

**Q: Où trouver mes coordonnées GPS exactes?**
R: Google Maps > recherchez votre adresse > clic droit > coordonnées

---

**Une fois complété, consultez [MISE_A_JOUR_SEO.md](MISE_A_JOUR_SEO.md) pour les prochaines étapes!**
