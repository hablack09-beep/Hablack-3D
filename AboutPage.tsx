import { Award, ExternalLink, Globe } from 'lucide-react';

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
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-primary-600 mb-2">
          Sobre el creador
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 tracking-tight mb-4">
          Qui Sóc
        </h1>
        <p className="text-lg text-slate-600">
          Apassionat del disseny i la impressió 3D.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-6">
            Hola! Sóc un creador local
          </h2>
          <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
            <p>
              Vaig començar en el món de la impressió 3D com un hobby, dissenyant per fer figures meves i portar-les a imprimir.
            </p>
            <p>
              Al cap d'uns mesos, em vaig comprar una impressora 3D i així poder imprimir coses per a mi.
            </p>
            <p>
              Amb el pas del temps, vaig començar a dissenyar i imprimir figures per regalar-les als meus amics, i això em va animar a dissenyar i imprimir figures 3D per a més gent.
            </p>
            <p className="bg-primary-50 p-5 rounded-xl text-primary-900 border border-primary-100 font-medium my-6">
              Tu m'envies la foto i el text del que vols fer, jo t'ho dissenyo i et dic el preu. Si ho acceptes, t'imprimeixo la figura i quedem per lliurar-te-la.
            </p>
            <p>
              També tinc un canal de YouTube però penjo molts pocs vídeos, el canal es diu <strong className="text-slate-900 font-semibold">Hablack09</strong>.
            </p>
            <p>
              A més, també tinc una pàgina a <strong className="text-slate-900 font-semibold">MakerWorld</strong> on vaig publicant els meus propis dissenys i models en 3D.
            </p>
          </div>
        </div>

        {/* Stats + MakerWorld Profile CTA */}
        <div className="pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <Award className="w-8 h-8 text-primary-600 mb-2" />
            <p className="text-4xl font-bold font-mono tabular-nums text-slate-900">7</p>
            <p className="text-sm text-slate-600 mt-1">Peces impreses</p>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <Globe className="w-8 h-8 text-primary-600 mb-2" />
            <p className="font-bold font-heading text-slate-900 mb-1">
              El meu perfil a MakerWorld
            </p>
            <p className="text-sm text-slate-600 mb-4">
              Descobreix els models que he pujat i dissenyat
            </p>
            <a
              href="https://makerworld.com/es/@Hablack09/upload"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors whitespace-nowrap"
            >
              Anar al meu perfil de MakerWorld
              <ExternalLink className="w-4 h-4 ml-2 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* Models Gallery */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-heading text-slate-900 mb-2">
            Els Meus Dissenys
          </h2>
          <p className="text-slate-600">
            Aquí teniu alguns dels meus models i el disseny més complicat que he fet.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {models.map((model) => (
            <div
              key={model.id}
              className="group relative aspect-square bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors duration-200"
            >
              <img
                src={model.src}
                alt={`Model 3D ${model.id}`}
                className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
