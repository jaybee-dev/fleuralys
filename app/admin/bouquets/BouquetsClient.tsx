'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Bouquet } from '@/data/bouquets'
import type { User } from '@supabase/supabase-js'

interface BouquetsClientProps {
  bouquets: Bouquet[]
  user: User
}

export default function BouquetsClient({ bouquets: initialBouquets, user }: BouquetsClientProps) {
  const [bouquets, setBouquets] = useState(initialBouquets)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedBouquet, setSelectedBouquet] = useState<Bouquet | null>(null)
  const [formData, setFormData] = useState({
    nom: '',
    description: '',
    prix: 0,
    image: '',
    stock: 10
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const validateImageFile = (file: File): { valid: boolean; error?: string } => {
    // Validation de la taille (5 MB max)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'L\'image ne doit pas dépasser 5 MB' }
    }

    // Validation du type MIME
    const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!ALLOWED_TYPES.includes(file.type)) {
      return { valid: false, error: 'Format non supporté. Utilisez JPG, PNG ou WebP' }
    }

    // Validation de l'extension (protection contre les doubles extensions)
    const fileName = file.name.toLowerCase()
    const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp']
    const hasValidExtension = ALLOWED_EXTENSIONS.some(ext => fileName.endsWith(ext))
    if (!hasValidExtension) {
      return { valid: false, error: 'Extension de fichier invalide' }
    }

    return { valid: true }
  }

  const validateImageDimensions = (file: File): Promise<{ valid: boolean; error?: string }> => {
    return new Promise((resolve) => {
      const img = new Image()
      const url = URL.createObjectURL(file)

      img.onload = () => {
        URL.revokeObjectURL(url)

        // Validation des dimensions minimales
        const MIN_WIDTH = 200
        const MIN_HEIGHT = 200
        if (img.width < MIN_WIDTH || img.height < MIN_HEIGHT) {
          resolve({ valid: false, error: `L'image doit faire au moins ${MIN_WIDTH}x${MIN_HEIGHT}px` })
          return
        }

        // Validation des dimensions maximales
        const MAX_WIDTH = 4000
        const MAX_HEIGHT = 4000
        if (img.width > MAX_WIDTH || img.height > MAX_HEIGHT) {
          resolve({ valid: false, error: `L'image ne doit pas dépasser ${MAX_WIDTH}x${MAX_HEIGHT}px` })
          return
        }

        resolve({ valid: true })
      }

      img.onerror = () => {
        URL.revokeObjectURL(url)
        resolve({ valid: false, error: 'Impossible de lire l\'image' })
      }

      img.src = url
    })
  }

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validation du fichier
    const fileValidation = validateImageFile(file)
    if (!fileValidation.valid) {
      alert(fileValidation.error)
      e.target.value = '' // Réinitialiser l'input
      return
    }

    // Validation des dimensions
    const dimensionsValidation = await validateImageDimensions(file)
    if (!dimensionsValidation.valid) {
      alert(dimensionsValidation.error)
      e.target.value = '' // Réinitialiser l'input
      return
    }

    setImageFile(file)
    // Créer une prévisualisation
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const uploadImage = async (file: File): Promise<string> => {
    setUploadingImage(true)
    try {
      // Double vérification de la validation (sécurité)
      const validation = validateImageFile(file)
      if (!validation.valid) {
        throw new Error(validation.error || 'Fichier invalide')
      }

      // Créer un nom de fichier sécurisé et unique
      // Utilisation de crypto.randomUUID() pour plus de sécurité
      const randomId = crypto.randomUUID()
      const timestamp = Date.now()

      // Extension basée sur le type MIME (plus fiable que le nom de fichier)
      const mimeToExt: Record<string, string> = {
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp'
      }
      const fileExt = mimeToExt[file.type] || 'jpg'

      const fileName = `${timestamp}-${randomId}.${fileExt}`
      const filePath = `bouquets/${fileName}`

      // Upload vers Supabase Storage avec options de sécurité
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false // Empêche l'écrasement de fichiers existants
        })

      if (uploadError) throw uploadError

      // Obtenir l'URL publique
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)

      return data.publicUrl
    } catch (error) {
      console.error('Erreur lors de l\'upload:', error)
      throw error
    } finally {
      setUploadingImage(false)
    }
  }

  const handleStockChange = async (bouquetId: string, newStock: number) => {
    if (newStock < 0) return

    const { error } = await supabase
      .from('bouquets')
      .update({
        stock: newStock,
        disponible: newStock > 0
      })
      .eq('id', bouquetId)

    if (!error) {
      setBouquets(
        bouquets.map((b) =>
          b.id === bouquetId ? { ...b, stock: newStock, disponible: newStock > 0 } : b
        )
      )
    }
  }

  const handleAddBouquet = async () => {
    if (!formData.nom || !formData.description) {
      alert('Veuillez remplir tous les champs requis')
      return
    }

    if (!imageFile && !formData.image) {
      alert('Veuillez ajouter une image')
      return
    }

    try {
      let imageUrl = formData.image

      // Si un fichier a été sélectionné, l'uploader
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const newId = (Math.max(...bouquets.map(b => Number.parseInt(b.id))) + 1).toString()

      const { data, error } = await supabase
        .from('bouquets')
        .insert([{
          id: newId,
          nom: formData.nom,
          description: formData.description,
          prix: formData.prix,
          image: imageUrl,
          stock: formData.stock,
          disponible: formData.stock > 0
        }])
        .select()
        .single()

      if (!error && data) {
        setBouquets([...bouquets, data])
        setShowAddModal(false)
        setFormData({ nom: '', description: '', prix: 0, image: '', stock: 10 })
        setImageFile(null)
        setImagePreview('')
        router.refresh()
      } else {
        alert('Erreur lors de l\'ajout du bouquet')
      }
    } catch (error) {
      alert('Erreur lors de l\'upload de l\'image')
      console.error(error)
    }
  }

  const handleEditBouquet = async () => {
    if (!selectedBouquet || !formData.nom || !formData.description) {
      alert('Veuillez remplir tous les champs requis')
      return
    }

    try {
      let imageUrl = formData.image

      // Si un nouveau fichier a été sélectionné, l'uploader
      if (imageFile) {
        imageUrl = await uploadImage(imageFile)
      }

      const { error } = await supabase
        .from('bouquets')
        .update({
          nom: formData.nom,
          description: formData.description,
          prix: formData.prix,
          image: imageUrl
        })
        .eq('id', selectedBouquet.id)

      if (!error) {
        setBouquets(
          bouquets.map((b) =>
            b.id === selectedBouquet.id ? { ...b, ...formData, image: imageUrl } : b
          )
        )
        setShowEditModal(false)
        setSelectedBouquet(null)
        setFormData({ nom: '', description: '', prix: 0, image: '', stock: 10 })
        setImageFile(null)
        setImagePreview('')
        router.refresh()
      } else {
        alert('Erreur lors de la modification du bouquet')
      }
    } catch (error) {
      alert('Erreur lors de l\'upload de l\'image')
      console.error(error)
    }
  }

  const handleDeleteBouquet = async (bouquetId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bouquet ?')) {
      return
    }

    const { error } = await supabase
      .from('bouquets')
      .delete()
      .eq('id', bouquetId)

    if (!error) {
      setBouquets(bouquets.filter((b) => b.id !== bouquetId))
      router.refresh()
    } else {
      alert('Erreur lors de la suppression du bouquet')
    }
  }

  const openEditModal = (bouquet: Bouquet) => {
    setSelectedBouquet(bouquet)
    setFormData({
      nom: bouquet.nom,
      description: bouquet.description,
      prix: bouquet.prix,
      image: bouquet.image,
      stock: bouquet.stock
    })
    setImageFile(null)
    setImagePreview(bouquet.image)
    setShowEditModal(true)
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-title font-bold text-neutral-900">
              Gestion des bouquets
            </h1>
            <p className="text-sm text-neutral-600 mt-1">
              Connecté en tant que {user.email}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-300 rounded-full hover:bg-neutral-50 transition-colors"
          >
            Déconnexion
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-neutral-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-neutral-900">
              Catalogue ({bouquets.length} bouquets)
            </h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors text-sm font-medium"
            >
              + Ajouter un bouquet
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Bouquet
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Prix
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {bouquets.map((bouquet) => (
                  <tr key={bouquet.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={bouquet.image}
                          alt={bouquet.nom}
                          className="h-12 w-12 rounded-lg object-cover"
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">{bouquet.nom}</div>
                          <div className="text-sm text-neutral-500">{bouquet.description.substring(0, 50)}...</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-900">
                      {bouquet.prix.toFixed(2)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-2xl font-bold ${bouquet.stock === 0 ? 'text-red-600' : bouquet.stock < 5 ? 'text-orange-600' : 'text-green-600'}`}>
                        {bouquet.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          bouquet.disponible
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {bouquet.disponible ? 'Disponible' : 'Indisponible'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleStockChange(bouquet.id, bouquet.stock - 1)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                        >
                          -
                        </button>
                        <button
                          onClick={() => handleStockChange(bouquet.id, bouquet.stock + 1)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleStockChange(bouquet.id, 10)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-xs"
                        >
                          Reset (10)
                        </button>
                        <button
                          onClick={() => openEditModal(bouquet)}
                          className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-xs"
                        >
                          ✏️ Modifier
                        </button>
                        <button
                          onClick={() => handleDeleteBouquet(bouquet.id)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs"
                        >
                          🗑️ Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modal d'ajout de bouquet */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Ajouter un nouveau bouquet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: Number.parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Image du bouquet</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-neutral-600 mb-2">Prévisualisation :</p>
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="w-full h-48 object-cover rounded-lg border border-neutral-300"
                    />
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Stock initial</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number.parseInt(e.target.value) })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setFormData({ nom: '', description: '', prix: 0, image: '', stock: 10 })
                  setImageFile(null)
                  setImagePreview('')
                }}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-full hover:bg-neutral-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleAddBouquet}
                disabled={uploadingImage}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImage ? 'Upload en cours...' : 'Ajouter'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de modification de bouquet */}
      {showEditModal && selectedBouquet && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6">Modifier le bouquet</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Nom</label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Prix (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.prix}
                  onChange={(e) => setFormData({ ...formData, prix: Number.parseFloat(e.target.value) })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Image du bouquet</label>
                <p className="text-sm text-neutral-500 mb-2">Choisissez une nouvelle image pour remplacer l'actuelle (facultatif)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                />
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-neutral-600 mb-2">
                      {imageFile ? 'Nouvelle image :' : 'Image actuelle :'}
                    </p>
                    <img
                      src={imagePreview}
                      alt="Prévisualisation"
                      className="w-full h-48 object-cover rounded-lg border border-neutral-300"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false)
                  setSelectedBouquet(null)
                  setFormData({ nom: '', description: '', prix: 0, image: '', stock: 10 })
                  setImageFile(null)
                  setImagePreview('')
                }}
                className="px-4 py-2 bg-neutral-200 text-neutral-700 rounded-full hover:bg-neutral-300 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleEditBouquet}
                disabled={uploadingImage}
                className="px-4 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploadingImage ? 'Upload en cours...' : 'Enregistrer'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
