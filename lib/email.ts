import { Resend } from 'resend'
import type { Commande } from '@/types/commande'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * Envoi un email de confirmation de commande au client
 */
export async function sendOrderConfirmationEmail(commande: Commande) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Fleurs com\'Florie <noreply@gld-web.fr>',
      to: commande.email,
      subject: `Confirmation de commande #${commande.id.substring(0, 8)}`,
      html: getOrderConfirmationTemplate(commande),
    })

    if (error) {
      console.error('Erreur envoi email confirmation commande:', error)
      return { success: false, error }
    }

    console.log('Email confirmation commande envoyé:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error }
  }
}

/**
 * Envoi un email de confirmation de paiement au client
 */
export async function sendPaymentConfirmationEmail(commande: Commande) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Fleurs com\'Florie <noreply@gld-web.fr>',
      to: commande.email,
      subject: `Paiement confirmé - Commande #${commande.id.substring(0, 8)}`,
      html: getPaymentConfirmationTemplate(commande),
    })

    if (error) {
      console.error('Erreur envoi email confirmation paiement:', error)
      return { success: false, error }
    }

    console.log('Email confirmation paiement envoyé:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error }
  }
}

/**
 * Envoi une notification à la fleuriste pour une nouvelle commande
 */
export async function sendFloristNotificationEmail(commande: Commande) {
  const floristEmail = process.env.FLORIST_EMAIL || 'contact@fleurscomflorie.fr'

  try {
    const { data, error } = await resend.emails.send({
      from: 'Notifications Fleurs com\'Florie <noreply@gld-web.fr>',
      to: floristEmail,
      subject: `🌸 Nouvelle commande - ${commande.bouquet_nom}`,
      html: getFloristNotificationTemplate(commande),
    })

    if (error) {
      console.error('Erreur envoi email notification fleuriste:', error)
      return { success: false, error }
    }

    console.log('Email notification fleuriste envoyé:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Erreur envoi email:', error)
    return { success: false, error }
  }
}

/**
 * Template HTML pour email de confirmation de commande
 */
function getOrderConfirmationTemplate(commande: Commande): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de commande</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #fdf4f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fdf4f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">🌸 Fleurs com'Florie</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Confirmation de commande</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px;">Bonjour ${commande.nom},</h2>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Nous avons bien reçu votre commande ! Votre bouquet sera préparé avec soin et sera prêt à être récupéré à la date et l'heure indiquées ci-dessous.
              </p>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📦 Détails de la commande</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Numéro de commande:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">#${commande.id.substring(0, 8)}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Bouquet:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">${commande.bouquet_nom}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Prix:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">${commande.prix.toFixed(2)} €</td>
                      </tr>
                      <tr>
                        <td colspan="2" style="padding-top: 10px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Date de retrait:</p>
                          <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 16px; font-weight: 600;">📅 ${formatDate(commande.date_retrait)} à ${commande.heure_retrait}</p>
                        </td>
                      </tr>
                      ${commande.message_carte ? `
                      <tr>
                        <td colspan="2" style="padding-top: 10px; border-top: 1px solid #e5e7eb;">
                          <p style="margin: 10px 0 0 0; color: #6b7280; font-size: 14px;">Message pour la carte:</p>
                          <p style="margin: 5px 0 0 0; color: #1f2937; font-size: 14px; font-style: italic;">"${commande.message_carte}"</p>
                        </td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="background-color: #dbeafe; border-left: 4px solid #3b82f6; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #1e40af; font-size: 16px;">📍 Prochaines étapes</h3>
                <ol style="margin: 0; padding-left: 20px; color: #1e40af; font-size: 14px; line-height: 1.8;">
                  <li>Finalisez le paiement (si ce n'est pas déjà fait)</li>
                  <li>Nous préparons votre bouquet avec amour</li>
                  <li>Venez récupérer votre commande à la boutique</li>
                </ol>
              </div>

              <!-- Store Info -->
              <div style="background-color: #fef3c7; padding: 16px; margin: 20px 0; border-radius: 4px; text-align: center;">
                <p style="margin: 0; color: #92400e; font-size: 14px; font-weight: 600;">📍 Adresse de la boutique</p>
                <p style="margin: 8px 0 0 0; color: #92400e; font-size: 14px;">
                  15 Place de la République<br>
                  34750 Villeneuve-Lès-Maguelone
                </p>
              </div>

              <p style="margin: 30px 0 0 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
                Si vous avez des questions, n'hésitez pas à nous contacter au <strong>04 XX XX XX XX</strong> ou par email à <a href="mailto:contact@fleurscomflorie.fr" style="color: #ec4899; text-decoration: none;">contact@fleurscomflorie.fr</a>
              </p>

              <p style="margin: 20px 0 0 0; color: #4b5563; font-size: 14px;">
                À très bientôt,<br>
                <strong>L'équipe Fleurs com'Florie 🌸</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2025 Fleurs com'Florie - Tous droits réservés
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

/**
 * Template HTML pour email de confirmation de paiement
 */
function getPaymentConfirmationTemplate(commande: Commande): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Paiement confirmé</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0fdf4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 40px; text-align: center;">
              <div style="width: 80px; height: 80px; margin: 0 auto 20px; background-color: rgba(255,255,255,0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                <span style="font-size: 48px;">✓</span>
              </div>
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600;">Paiement Confirmé !</h1>
              <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 16px; opacity: 0.95;">Votre commande est validée</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin: 0 0 20px 0; color: #1f2937; font-size: 24px;">Merci ${commande.nom} !</h2>

              <p style="margin: 0 0 20px 0; color: #4b5563; font-size: 16px; line-height: 1.6;">
                Votre paiement a bien été effectué. Votre bouquet <strong>${commande.bouquet_nom}</strong> est maintenant confirmé et sera préparé avec le plus grand soin.
              </p>

              <!-- Payment Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0fdf4; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px solid #10b981;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #065f46; font-size: 18px;">💳 Récapitulatif du paiement</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Montant payé:</td>
                        <td style="color: #065f46; font-size: 18px; font-weight: 700; text-align: right;">${commande.prix.toFixed(2)} €</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Statut:</td>
                        <td style="text-align: right;">
                          <span style="display: inline-block; background-color: #10b981; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">PAYÉ</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px;">Commande:</td>
                        <td style="color: #1f2937; font-size: 14px; font-weight: 600; text-align: right;">#${commande.id.substring(0, 8)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pickup Info -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin: 20px 0; border-radius: 4px;">
                <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">📅 Récupération de votre bouquet</h3>
                <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.8;">
                  <strong>Date:</strong> ${formatDate(commande.date_retrait)}<br>
                  <strong>Heure:</strong> ${commande.heure_retrait}<br>
                  <strong>Adresse:</strong> 15 Place de la République, 34750 Villeneuve-Lès-Maguelone
                </p>
              </div>

              <p style="margin: 30px 0 0 0; color: #4b5563; font-size: 14px; line-height: 1.6;">
                Un récapitulatif complet vous a été envoyé par email. Pensez à présenter cet email lors du retrait de votre commande.
              </p>

              <p style="margin: 20px 0 0 0; color: #4b5563; font-size: 14px;">
                À très bientôt,<br>
                <strong>L'équipe Fleurs com'Florie 🌸</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © 2025 Fleurs com'Florie - Tous droits réservés
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

/**
 * Template HTML pour notification fleuriste
 */
function getFloristNotificationTemplate(commande: Commande): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle commande</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #6366f1; padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">🌸 Nouvelle Commande Reçue</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <div style="background-color: #fef3c7; padding: 16px; margin: 0 0 20px 0; border-radius: 4px; border-left: 4px solid #f59e0b;">
                <p style="margin: 0; color: #92400e; font-size: 16px; font-weight: 600;">
                  ⚡ Action requise : Préparer cette commande
                </p>
              </div>

              <!-- Order Details -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📦 Informations de la commande</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Numéro:</td>
                        <td style="color: #1f2937; font-size: 14px; text-align: right;">#${commande.id.substring(0, 8)}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Bouquet:</td>
                        <td style="color: #1f2937; font-size: 16px; font-weight: 700; text-align: right;">${commande.bouquet_nom}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Prix:</td>
                        <td style="color: #10b981; font-size: 16px; font-weight: 700; text-align: right;">${commande.prix.toFixed(2)} €</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Statut paiement:</td>
                        <td style="text-align: right;">
                          <span style="display: inline-block; background-color: ${commande.paiement_statut === 'paye' ? '#10b981' : '#f59e0b'}; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                            ${commande.paiement_statut === 'paye' ? 'PAYÉ' : 'EN ATTENTE'}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Customer Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">👤 Informations client</h3>

                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Nom:</td>
                        <td style="color: #1f2937; font-size: 14px; text-align: right;">${commande.nom}</td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Email:</td>
                        <td style="text-align: right;">
                          <a href="mailto:${commande.email}" style="color: #3b82f6; font-size: 14px; text-decoration: none;">${commande.email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="color: #6b7280; font-size: 14px; font-weight: 600;">Téléphone:</td>
                        <td style="text-align: right;">
                          <a href="tel:${commande.telephone}" style="color: #3b82f6; font-size: 14px; text-decoration: none;">${commande.telephone}</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Pickup Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fce7f3; border-radius: 8px; padding: 20px; margin: 20px 0;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 15px 0; color: #1f2937; font-size: 18px;">📅 Date et heure de retrait</h3>
                    <p style="margin: 0; color: #1f2937; font-size: 18px; font-weight: 700;">
                      ${formatDate(commande.date_retrait)} à ${commande.heure_retrait}
                    </p>
                  </td>
                </tr>
              </table>

              ${commande.message_carte ? `
              <!-- Message Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fef3c7; border-radius: 8px; padding: 20px; margin: 20px 0; border: 2px dashed #f59e0b;">
                <tr>
                  <td>
                    <h3 style="margin: 0 0 10px 0; color: #92400e; font-size: 16px;">💌 Message pour la carte</h3>
                    <p style="margin: 0; color: #92400e; font-size: 14px; font-style: italic; line-height: 1.6;">
                      "${commande.message_carte}"
                    </p>
                  </td>
                </tr>
              </table>
              ` : ''}

              <div style="text-align: center; margin: 30px 0;">
                <p style="margin: 0; color: #6b7280; font-size: 13px;">
                  Commande passée le ${new Date(commande.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                Email automatique - Fleurs com'Florie
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}

/**
 * Formatte une date en français
 */
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
