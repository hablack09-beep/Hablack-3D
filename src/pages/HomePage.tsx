import { Package, ArrowRight, Star } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 sm:py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-bold font-heading text-gray-900 tracking-tight mb-6">
          De la teva imaginació a la <span className="text-primary-600">teva mà</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Servei professional d'impressió 3D. Envia'm una idea, una foto o un disseny, i jo ho faig realitat. Pressupost ajustat i qualitat garantida.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('request')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Package className="w-5 h-5 mr-2" />
            Demanar pressupost ara
          </button>
          <button
            onClick={() => onNavigate('reviews')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full transition-all duration-200"
          >
            Veure opinions
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-16">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">📸</span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading">1. Envia la teva idea</h3>
          <p className="text-gray-600">Comparteix una foto, un text descriptiu o un model 3D del que vols que imprimeixi.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading">2. Rep el preu</h3>
          <p className="text-gray-600">Valoro el cost del material i el temps, i et dono un preu tancat ràpidament.</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-6">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-xl font-bold mb-3 font-heading">3. Ho imprimeixo</h3>
          <p className="text-gray-600">Un cop acceptat, em poso a treballar i t'ho envio a casa (o ho vens a recollir).</p>
        </div>
      </section>
    </div>
  );
}
