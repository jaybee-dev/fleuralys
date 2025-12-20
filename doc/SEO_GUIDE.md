# Guide SEO - Fleurs com'Florie

## ✅ Optimisations SEO Déjà Implémentées

### 1. SEO Technique

- ✅ **Sitemap XML** automatique (`/sitemap.xml`)
- ✅ **Robots.txt** configuré (`/robots.txt`)
- ✅ **Meta tags** optimisés (title, description, keywords)
- ✅ **Open Graph** pour le partage sur réseaux sociaux
- ✅ **Twitter Cards** configurés
- ✅ **URL canoniques** pour éviter le duplicate content
- ✅ **Lang="fr"** pour indiquer la langue

### 2. SEO Local

- ✅ **Schema.org LocalBusiness** (type: Florist)
- ✅ **Localisation** : Villeneuve-Lès-Maguelone, 34750
- ✅ **Coordonnées GPS** approximatives
- ✅ **Zone de service** : 25km autour (Montpellier et environs)
- ✅ **Horaires d'ouverture** structurés
- ✅ **Adresse structurée** avec microdata

### 3. Mots-clés Ciblés

- Fleuriste Villeneuve-Lès-Maguelone
- Compositions florales Hérault
- Bouquets sur mesure Montpellier
- Livraison fleurs 34750
- Fleurs fraîches sud de la France

### 4. Contenu SEO

- ✅ Balises H1, H2, H3 structurées
- ✅ Alt text sur les images (à compléter avec vraies images)
- ✅ URLs descriptives et propres
- ✅ Contenu localisé (Villeneuve-Lès-Maguelone)

## 📊 Score SEO Actuel

### Points Forts

- ✅ Structure technique solide
- ✅ SEO local bien configuré
- ✅ Schema.org complet
- ✅ Meta tags optimisés
- ✅ Sitemap et robots.txt présents

### À Améliorer (Actions Recommandées)

#### Priorité HAUTE

1. **Google My Business**

   - Créer/revendiquer la fiche Google My Business
   - Ajouter photos, horaires, description
   - Demander des avis clients
   - **Impact SEO : ⭐⭐⭐⭐⭐**

2. **Compléter les Informations**

   - Adresse exacte dans [components/Footer.tsx](components/Footer.tsx:47)
   - Numéro de téléphone dans [app/schema.ts](app/schema.ts:9)
   - Horaires réels dans [app/schema.ts](app/schema.ts:23)
   - **Impact SEO : ⭐⭐⭐⭐⭐**

3. **Images Réelles**
   - Remplacer les placeholders par vraies photos
   - Ajouter des alt text descriptifs
   - Optimiser la taille (< 200KB par image)
   - **Impact SEO : ⭐⭐⭐⭐**

#### Priorité MOYENNE

4. **Réseaux Sociaux**

   - Créer profil Instagram pour Fleurs com'Florie
   - Créer page Facebook
   - Mettre à jour les liens dans [app/schema.ts](app/schema.ts:36)
   - **Impact SEO : ⭐⭐⭐**

5. **Avis Clients**

   - Implémenter un système d'avis
   - Intégrer les avis Google
   - Afficher les témoignages
   - **Impact SEO : ⭐⭐⭐⭐**

6. **Blog Régulier**
   - Publier 1-2 articles par mois
   - Thèmes : entretien fleurs, tendances, événements locaux
   - Mots-clés locaux dans les articles
   - **Impact SEO : ⭐⭐⭐**

#### Priorité BASSE

7. **Performance**

   - Optimiser les images (WebP, lazy loading)
   - Activer le cache
   - Minimiser JS/CSS
   - **Impact SEO : ⭐⭐**

8. **Backlinks**
   - Partenariats locaux (mariages, événements)
   - Annuaires locaux (Hérault, Montpellier)
   - **Impact SEO : ⭐⭐⭐**

## 🎯 Actions Immédiates (Cette Semaine)

### 1. Google My Business (30 min)

```
1. Aller sur google.com/business
2. Créer la fiche "Fleurs com'Florie"
3. Vérifier l'adresse (par courrier)
4. Ajouter :
   - 10 photos minimum
   - Horaires
   - Description (max 750 caractères)
   - Catégories : Fleuriste, Commerce de détail
```

### 2. Compléter les Infos (15 min)

```typescript
// Dans app/schema.ts - ligne 9
telephone: '+33-4-XX-XX-XX-XX', // Votre vrai numéro

// Dans app/schema.ts - ligne 15
streetAddress: 'Votre adresse complète',

// Dans components/Footer.tsx - ligne 47
<span itemProp="streetAddress">Votre adresse</span>
```

### 3. Instagram (1h)

```
1. Créer @fleuralys
2. Publier 9 premières photos
3. Bio : "🌸 Fleuriste à Villeneuve-Lès-Maguelone
         Compositions artisanales
         Commande en ligne ⬇️"
4. Mettre le lien du site
```

## 📈 Suivi SEO (Outils Gratuits)

### Outils Recommandés

- **Google Search Console** (gratuit, essentiel)

  - Surveiller les performances
  - Voir les mots-clés
  - Détecter les erreurs

- **Google Analytics** (gratuit)

  - Trafic du site
  - Comportement utilisateurs
  - Conversions

- **Google My Business Insights** (gratuit)
  - Vues de la fiche
  - Clics sur téléphone/itinéraire
  - Photos populaires

### Métriques à Suivre

- Position sur "fleuriste villeneuve-lès-maguelone"
- Nombre de visiteurs organiques
- Taux de conversion (commandes)
- Appels téléphoniques depuis Google
- Demandes d'itinéraire

## 🌍 SEO Local - Zone de Chalandise

### Mots-clés Locaux à Cibler

1. **Primaire**

   - fleuriste villeneuve-lès-maguelone
   - fleuriste 34750
   - fleurs villeneuve maguelone

2. **Secondaire**

   - fleuriste montpellier sud
   - livraison fleurs villeneuve
   - bouquet villeneuve-lès-maguelone

3. **Longue traîne**
   - "où acheter des fleurs à villeneuve-lès-maguelone"
   - "fleuriste près de moi 34750"
   - "commander bouquet villeneuve maguelone"

### Villes Environnantes à Mentionner

- Montpellier (7 km)
- Palavas-les-Flots (5 km)
- Lattes (3 km)
- Pérols (8 km)
- Vic-la-Gardiole (6 km)

## ✅ Checklist de Déploiement SEO

Avant de mettre en ligne :

- [ ] Google My Business créé et vérifié
- [ ] Adresse et téléphone complétés
- [ ] Instagram créé avec 9+ photos
- [ ] Google Search Console configuré
- [ ] Google Analytics installé
- [ ] Sitemap soumis à Google
- [ ] 6 vraies photos de bouquets ajoutées
- [ ] Alt text sur toutes les images
- [ ] Test de performance (PageSpeed)

## 📞 Contact et Support SEO

Pour améliorer le SEO :

1. Lire ce guide
2. Implémenter les actions priorité HAUTE
3. Suivre les métriques mensuellement
4. Ajuster selon les résultats

---

**Note** : Le SEO est un marathon, pas un sprint. Les résultats apparaissent généralement après 3-6 mois de travail régulier.

**Objectif 6 mois** : Être en 1ère page Google pour "fleuriste villeneuve-lès-maguelone"
