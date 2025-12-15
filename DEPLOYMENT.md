# Guide de Deploiement

## Deploiement sur Vercel (Recommande)

### Option 1: Via l'interface Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Connectez votre compte GitHub/GitLab
3. Importez votre repository
4. Configurez les variables d'environnement:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `LEMONSQUEEZY_API_KEY`
   - `LEMONSQUEEZY_STORE_ID`
   - `LEMONSQUEEZY_WEBHOOK_SECRET`
   - `NEXT_PUBLIC_LEMONSQUEEZY_STORE_URL`
5. Deployez

### Option 2: Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Deployer
vercel

# Pour la production
vercel --prod
```

### Configuration post-deploiement

1. Notez l'URL de production (ex: `https://votre-site.vercel.app`)
2. Configurez le webhook LemonSqueezy:
   - URL: `https://votre-site.vercel.app/api/webhooks/lemonsqueezy`
   - Evenements: `order_created`, `order_refunded`

## Deploiement sur d'autres plateformes

### Netlify

1. Connectez votre repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Configurez les variables d'environnement
5. Deployez

### VPS (Ubuntu/Debian)

```bash
# Installer Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Cloner le projet
git clone <votre-repo>
cd fleuriste-site

# Installer les dependances
npm install

# Configurer .env.local
cp .env.local.example .env.local
nano .env.local

# Build
npm run build

# Installer PM2 pour gerer le processus
sudo npm install -g pm2

# Demarrer l'application
pm2 start npm --name "fleuriste-site" -- start

# Configurer le demarrage automatique
pm2 startup
pm2 save
```

### Configuration Nginx (pour VPS)

```nginx
server {
    listen 80;
    server_name votre-domaine.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Configuration SSL

### Avec Certbot (Let's Encrypt)

```bash
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d votre-domaine.com
```

## Checklist pre-deploiement

- [ ] Toutes les variables d'environnement sont configurees
- [ ] Les images sont ajoutees dans `public/images/`
- [ ] Les IDs de produits LemonSqueezy sont corrects dans `data/bouquets.ts`
- [ ] La table Supabase est creee avec le schema SQL
- [ ] Le webhook LemonSqueezy est configure
- [ ] Le build local fonctionne: `npm run build`
- [ ] L'application demarre localement: `npm start`

## Surveillance et Maintenance

### Logs sur Vercel

- Consultez les logs dans le dashboard Vercel
- Activez les alertes pour les erreurs

### Logs sur VPS

```bash
# Voir les logs PM2
pm2 logs fleuriste-site

# Redemarrer l'application
pm2 restart fleuriste-site

# Voir le statut
pm2 status
```

## Mises a jour

```bash
# Recuperer les dernieres modifications
git pull

# Installer les nouvelles dependances
npm install

# Rebuild
npm run build

# Redemarrer (PM2)
pm2 restart fleuriste-site
```

## Problemes courants

### Erreur Supabase "Invalid API key"
- Verifiez que `NEXT_PUBLIC_SUPABASE_ANON_KEY` est correctement configuree
- Verifiez que la cle est bien la cle "anon/public"

### Erreur LemonSqueezy webhook
- Verifiez que l'URL du webhook est correcte
- Verifiez que le secret est correctement configure
- Consultez les logs du webhook dans le dashboard LemonSqueezy

### Images ne s'affichent pas
- Verifiez que les images sont dans `public/images/`
- Verifiez les noms de fichiers (respectez la casse)
- Pour Vercel, assurez-vous que les images sont commitees dans Git

## Support

Pour plus d'aide:
- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Supabase](https://supabase.com/docs)
- [Documentation LemonSqueezy](https://docs.lemonsqueezy.com)
