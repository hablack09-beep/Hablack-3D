import React from 'react';
import { motion } from 'motion/react';
import { Mail, Camera, FileText, MapPin, Calculator } from 'lucide-react';

export default function RequestPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 mb-4">Com demanar una figura?</h1>
        <p className="text-lg text-gray-600">És molt senzill! Segueix aquests passos.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative"
      >
        <div className="absolute top-0 w-full h-2 bg-primary-600"></div>
        <div className="p-8 md:p-12 text-center">
          <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-8 cursor-pointer hover:bg-primary-100 transition-colors">
            <Mail className="w-10 h-10 text-primary-600" />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-heading">
            Envia un correu a <a href="mailto:hablackplus@gmail.com" className="text-primary-600 hover:text-primary-700 hover:underline transition-colors break-all">hablackplus@gmail.com</a>
          </h2>
          
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-10">
            Per fer la teva petició, només has d'enviar-me un correu electrònic explicant el que necessites.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-10 text-left">
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex items-start space-x-4">
              <div className="bg-indigo-100 p-3 rounded-xl">
                <FileText className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Text del que vols</h3>
                <p className="text-sm text-gray-600">Explica'm què vols crear, si es possible, incloent algunes mides o preferències de color per a la figura.</p>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl flex items-start space-x-4">
              <div className="bg-emerald-100 p-3 rounded-xl">
                <Camera className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Una foto</h3>
                <p className="text-sm text-gray-600">Adjunta una foto, dibuix o imatge de referència. Així sabré exactament el que busques.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-primary-50 rounded-2xl p-8 max-w-3xl mx-auto border border-primary-100 text-left relative overflow-hidden">
             {/* Decorative element */}
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading relative z-10 flex items-center">
              <Calculator className="w-6 h-6 text-primary-600 mr-2" />
              Què passa després?
            </h3>
            <p className="text-gray-700 relative z-10">
              Un cop rebi el teu correu, revisaré la proposta i et diré el preu de la figura. Si hi estàs d'acord, ens posarem en contacte a través del correu per acordar quin dia i a on et donaré la figura acabada en mà!
            </p>
          </div>
          
          <div className="mt-12">
            <a 
              href="mailto:hablackplus@gmail.com?subject=Petició%20de%20figura%203D&body=Hola%20Hablack,%0A%0AVull%20demanar%20una%20figura%203D.%0A%0A- Descripció:%0A-[Posa%20aquí%20el%20text%20del%20que%20vols]%0A%0A[No%20oblidis%20adjuntar%20la%20foto!]"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg hover:shadow-primary-500/30 transition-all hover:-translate-y-1"
            >
              <Mail className="w-5 h-5 mr-2" />
              Enviar correu per demanar figura
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
