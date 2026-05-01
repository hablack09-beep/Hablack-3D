import { Camera, Printer, Award } from 'lucide-react';

const models = [
  { id: 1, src: '/model1.png' },
  { id: 2, src: '/model2.png' },
  { id: 3, src: '/model3.jpg' },
  { id: 4, src: '/model4.jpg' },
  { id: 5, src: '/model5.png' },
  { id: 6, src: '/model6.png' },
  { id: 7, src: '/model7.png' },
];

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto py-12 px-4 sm:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Qui Sóc</h1>
        <p className="text-xl text-gray-600">Apassionat del disseny i la impressió 3D.</p>
      </div>

      <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 flex flex-col md:flex-row mb-12">
        <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
          <h2 className="text-3xl font-bold font-heading text-gray-900 mb-6">Hola! Sóc un creador local</h2>
          <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
            <p>
              Vaig començar en el món de la impressió 3D com un hobby, dissenyant per fer figures meves i portar-les a imprimir.
            </p>
            <p>
              Al cap d'uns mesos, em vaig comprar una impressora 3D i així poder imprimir coses per a mi.
            </p>
            <p>
              Amb el pas del temps, vaig començar a dissenyar i imprimir figures per regalar-les als meus amics, i això em va animar a dissenyar i imprimir figures 3D per a més gent.
            </p>
            <p className="bg-primary-50 p-4 rounded-xl text-primary-800 border border-primary-100 font-medium my-6">
              Tu m'envies la foto i el text del que vols fer, jo t'ho dissenyo i et dic el preu. Si ho acceptes, t'imprimeixo la figura i quedem per lliurar-te-la.
            </p>
            <p>
              També tinc un canal de Youtube pero pengo molts pocs videos, el canal es diu Hablack09
            </p>
            <p>
              Aquí teniu alguns dels meus models i el disseny més complicat que he fet:
            </p>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-2 gap-6 text-center">
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
              <Award className="w-8 h-8 text-primary-500 mb-2" />
              <p className="text-3xl font-bold text-gray-900 font-heading">0</p>
              <p className="text-sm text-gray-500 mt-1">Peces impreses</p>
            </div>
            <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-2xl">
              <Printer className="w-8 h-8 text-primary-500 mb-2" />
              <p className="text-3xl font-bold text-gray-900 font-heading">1</p>
              <p className="text-sm text-gray-500 mt-1">Impressora actua</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold font-heading text-center text-gray-900 mb-10">Els Meus Dissenys</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {models.map((model) => (
            <div 
              key={model.id} 
              className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <img 
                src={model.src} 
                alt={`Model 3D ${model.id}`} 
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
