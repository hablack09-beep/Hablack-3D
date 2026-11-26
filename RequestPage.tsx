import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, Camera, FileText, Calculator } from 'lucide-react';

export default function RequestPage() {
  const mailtoHref =
    "mailto:hablackplus@gmail.com?subject=Petici%C3%B3%20de%20figura%203D&body=Hola%20Hablack%2C%0A%0AVull%20demanar%20una%20figura%20o%20clauer%203D.%0A%0A-%20Descripci%C3%B3%20del%20que%20vull%3A%0A%0A-%20Mides%20aproximades%20i%20colors%3A%0A%0A%5BRecorda%20adjuntar%20la%20foto%20o%20escut%20abans%20d'enviar!%5D";

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-medium text-primary-600 mb-2">
          Comandes i pressupostos
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 tracking-tight mb-4">
          Demanar Figura o Clauer 3D
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Pots enviar-me la teva idea per correu electrònic o trucar-me directament per comentar el disseny, el preu i el lliurament.
        </p>
      </div>

      {/* Equal-Prominence Contact Actions: Email & Direct Call */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Option 1: Email */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 mb-6">
              <Mail className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">
              Enviar un Correu Electrònic
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Escriu-me amb el text del que necessites i adjunta una foto o l’escut del teu club. Et respondré amb el pressupost tancat.
            </p>
            <p className="font-mono text-sm font-semibold text-slate-900 mb-8 break-all">
              hablackplus@gmail.com
            </p>
          </div>

          <a
            href={mailtoHref}
            className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors whitespace-nowrap"
          >
            <Mail className="w-5 h-5 mr-2.5 shrink-0" />
            Enviar correu ara
          </a>
        </div>

        {/* Option 2: Direct Phone Call */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center text-white mb-6">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">
              Contactar per Telèfon
            </h2>
            <p className="text-slate-600 leading-relaxed mb-4">
              Prefereixes parlar directament sobre mides, terminis d’entrega o comandes per a clubs esportius? Truca’m sense compromís.
            </p>
            <p className="font-mono tabular-nums text-lg font-bold text-slate-900 mb-8">
              +34 606 51 99 75
            </p>
          </div>

          <a
            href="tel:+34606519975"
            className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap"
          >
            <Phone className="w-5 h-5 mr-2.5 shrink-0" />
            Trucar al +34 606 51 99 75
          </a>
        </div>
      </motion.div>

      {/* Helpful Checklist (Clean Hairline Section) */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10">
        <h2 className="text-xl font-bold font-heading text-slate-900 mb-6">
          Què necessito per calcular el teu pressupost?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-2">
          <div className="flex items-start gap-3.5">
            <FileText className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Descripció i mides</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Explica’m què vols crear, la quantitat d’unitats i els colors o mides aproximades.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Camera className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Foto o escut</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Adjunta una fotografia, dibuix o logotip perquè pugui dissenyar la peça amb fidelitat.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <Calculator className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Preu i entrega en mà</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Et confirmo el preu final i acordem el dia i el punt de trobada per lliurar-te la comanda.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
