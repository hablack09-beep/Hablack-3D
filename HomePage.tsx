import { Package, ArrowRight, KeyRound, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-16 py-6">
      {/* Hero Section */}
      <section className="text-center py-12 sm:py-20 max-w-4xl mx-auto">
        <p className="text-sm font-medium text-primary-600 mb-3">
          Impressió 3D a mida · Clauers per a particulars i clubs
        </p>
        <h1 className="text-4xl sm:text-6xl font-bold font-heading text-slate-900 tracking-tight mb-6">
          De la teva imaginació a la <span className="text-primary-600">teva mà</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Servei professional d'impressió 3D. Envia'm una idea, una foto o l'escut del teu club, i jo ho faig realitat amb qualitat garantida i preus clars.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('request')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Package className="w-5 h-5 mr-2 shrink-0" />
            Demanar pressupost ara
          </button>
          <button
            onClick={() => onNavigate('keychains')}
            className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 text-base font-medium text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <KeyRound className="w-5 h-5 mr-2 shrink-0 text-primary-600" />
            Veure Clauers 3D
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </button>
        </div>
      </section>

      {/* Process Steps */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200">
          <p className="text-xs font-mono font-semibold text-primary-600 mb-3">01</p>
          <h3 className="text-xl font-bold mb-2.5 font-heading text-slate-900">Envia la teva idea</h3>
          <p className="text-slate-600 leading-relaxed">
            Comparteix una foto, l'escut del teu equip o una descripció del que vols imprimir per correu o telèfon.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200">
          <p className="text-xs font-mono font-semibold text-primary-600 mb-3">02</p>
          <h3 className="text-xl font-bold mb-2.5 font-heading text-slate-900">Rep el preu</h3>
          <p className="text-slate-600 leading-relaxed">
            Valoro el disseny, el material i les unitats per donar-te un pressupost tancat ràpidament.
          </p>
        </div>
        <div className="bg-white p-8 rounded-2xl border border-slate-200">
          <p className="text-xs font-mono font-semibold text-primary-600 mb-3">03</p>
          <h3 className="text-xl font-bold mb-2.5 font-heading text-slate-900">Ho imprimeixo</h3>
          <p className="text-slate-600 leading-relaxed">
            Un cop acceptat, em poso a treballar i quedem per entregar-te la comanda acabada en mà.
          </p>
        </div>
      </section>

      {/* Highlight Banner to Club Pricing */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start gap-4 max-w-2xl">
          <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-1.5">
              Tarifes especials de clauers per a clubs esportius
            </h2>
            <p className="text-slate-600">
              Descomptes progressius des de 10 fins a 100 unitats a partir de <span className="font-mono font-semibold text-slate-900">3,60 €/unitat</span>. Calcula el teu pressupost a l’instant.
            </p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('club-pricing')}
          className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          Consultar Tarifes Clubs
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </section>
    </div>
  );
}
