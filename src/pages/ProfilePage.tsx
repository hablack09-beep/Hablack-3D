import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { User as UserIcon, Camera, Save, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024 * 2) {
        alert("La imatge és massa gran. El límit és de 2MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoURL(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSuccessMessage('');
    
    try {
      await updateUserProfile(displayName, photoURL);
      setSuccessMessage('Perfil actualitzat correctament!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error updating profile", error);
      alert("Hi ha hagut un error en actualitzar el perfil.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold font-heading text-gray-900 mb-8">El Teu Perfil</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col items-center mb-8">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center">
                  {photoURL ? (
                    <img src={photoURL} alt="Perfil" className="w-full h-full object-cover" />
                  ) : (
                    <UserIcon className="w-16 h-16 text-gray-400" />
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
                >
                  <Camera className="w-5 h-5" />
                </button>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/jpeg, image/png, image/webp" 
                  className="hidden" 
                />
              </div>
              <p className="text-sm text-gray-500 mt-3">Fes clic a la càmera per canviar la foto</p>
            </div>

            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-700 mb-2">
                Nom d'usuari
              </label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                placeholder="El teu nom"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correu electrònic
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">El correu electrònic no es pot canviar.</p>
            </div>

            {successMessage && (
              <div className="p-4 bg-green-50 text-green-700 rounded-xl border border-green-100">
                {successMessage}
              </div>
            )}

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Desant...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 mr-2" />
                    Desar Canvis
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
