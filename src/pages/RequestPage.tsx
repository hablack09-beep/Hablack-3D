import React, { useState, useRef } from 'react';
import { UploadCloud, CheckCircle2, ChevronRight, Calculator } from 'lucide-react';
import { motion } from 'motion/react';
import { useRequests } from '../hooks/useRequests';
import { useAuth } from '../contexts/AuthContext';

export default function RequestPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const { user } = useAuth();
  const { addRequest } = useRequests();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileData, setFileData] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: user?.displayName || '',
    email: user?.email || '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addRequest({
      userId: user?.uid || 'anonymous',
      userName: formData.name || 'Anònim',
      email: formData.email,
      description: formData.description,
      fileName: fileName,
      fileData: fileData
    });

    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-12 rounded-3xl shadow-sm border border-gray-100"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-4">Petició rebuda!</h2>
          <p className="text-lg text-gray-600 mb-8">
            He rebut la teva sol·licitud correctament. Revisaré el disseny, calcularé el preu exacte i em posaré en contacte amb tu ben aviat.
          </p>
          <button
            onClick={() => {
              setIsSubmitted(false);
              if (onNavigate) onNavigate('chat');
            }}
            className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700"
          >
            Anar al Xat de la Petició <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Demanar Figura 3D</h1>
        <p className="text-lg text-gray-600">Explica'm què vols crear i envia'm una imatge de referència.</p>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* User Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                placeholder="Ex. Joan Garcia"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correu electrònic
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow"
                placeholder="joan@exemple.com"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Descripció del que vols
            </label>
            <textarea
              id="description"
              rows={4}
              required
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow resize-none"
              placeholder="Voldria un clauer amb el logotip del meu equip. D'uns 5cm de llarg..."
            ></textarea>
            <p className="mt-2 text-sm text-gray-500">Intenta incloure mesures aproximades si les saps.</p>
          </div>

          {/* File Upload */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-2">
              Pujar foto o referència
            </span>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-2xl hover:bg-gray-50 transition-colors relative">
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600 justify-center">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                  >
                    <span>Penja un fitxer</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
                  </label>
                  <p className="pl-1">o arrossega'l i deixa'l aquí</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, PDF fins a 10MB</p>
                {fileName && (
                  <p className="mt-2 text-sm font-medium text-gray-900 bg-gray-100 py-1 px-3 rounded-full inline-block">
                    Fitxer seleccionat: {fileName}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl flex items-start space-x-3">
            <Calculator className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-800">
              Aquest formulari calcularà només per sol·licitar un pressupost. Un cop rebut, et contestaré per correu electrònic amb el preu exacte. No has de pagar res ara!
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl flex-shrink-0 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-md transition-all"
            >
              Sol·licitar el meu pressupost
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
