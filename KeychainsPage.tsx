import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Type, QrCode, ExternalLink, Mail, Check, Phone, Globe } from 'lucide-react';

import sportsCrestImg from '../assets/images/keychain_sports_crest_1795717564118.jpg';
import customNameImg from '../assets/images/keychain_custom_name_1795717564172.jpg';
import qrOnlyImg from '../assets/images/keychain_qr_only_1795718380339.jpg';
import makerworldImg from '../assets/images/keychain_makerworld_1795718380137.jpg';

interface KeychainsPageProps {
  onNavigate: (page: string) => void;
}

type CategoryFilter = 'all' | 'clubs' | 'personal' | 'qr' | 'makerworld';

interface KeychainOption {
  id: string;
  category: Exclude<CategoryFilter, 'all'>;
  categoryLabel: string;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  fallbackIcon: React.ComponentType<{ className?: string }>;
  isMakerWorld?: boolean;
}

const KEYCHAIN_OPTIONS: KeychainOption[] = [
  {
    id: 'sports-crest',
    category: 'clubs',
    categoryLabel: 'Esport i Clubs',
    title: 'Escut Esportiu en Relleu',
    description:
      'Dissenyat per a clubs esportius, escoles i penyes. Reproduïm l’escut oficial amb volums definits i anella d’acer inoxidable reforçada.',
    highlights: [
      'Fins a 8 colors en una mateixa peça',
      'Inclou anella, mosquetó i bosseta petita',
      'Opció d’afegir dorsal o nom al revers',
      'Descomptes especials a partir de 10 unitats',
    ],
    image: sportsCrestImg,
    fallbackIcon: ShieldCheck,
  },
  {
    id: 'custom-name',
    category: 'personal',
    categoryLabel: 'Personalitzats',
    title: 'Nom Personalitzat 3D',
    description:
      'Clauers lleugers i resistents amb tipografia moderna en relleu. Ideals per a motxilles escolars, bosses d’entrenament, regals o identificació d’equips.',
    highlights: [
      'Tipografia neta amb cantells arrodonits',
      'Combinació lliure de base i color de lletra',
      'Inclou anella, mosquetó i bosseta petita',
      'Ideal per a regals, equips i detalls personalitzats',
    ],
    image: customNameImg,
    fallbackIcon: Type,
  },
  {
    id: 'qr-only',
    category: 'qr',
    categoryLabel: 'Codi QR',
    title: 'Clauer amb Codi QR',
    description:
      'Connecta directament amb la web del teu club, el teu perfil social, targeta de contacte o telèfon d’emergència escanejant el codi QR en relleu amb qualsevol mòbil.',
    highlights: [
      'Codi QR físic en relleu d’alt contrast',
      'Lectura ràpida amb la càmera de qualsevol telèfon',
      'Inclou anella, mosquetó i bosseta petita',
      'Ideal per a clubs, negocis o identificació',
    ],
    image: qrOnlyImg,
    fallbackIcon: QrCode,
  },
  {
    id: 'makerworld',
    category: 'makerworld',
    categoryLabel: 'MakerWorld',
    title: 'Models de MakerWorld (Clauers, Figures i Més)',
    description:
      'Explora el catàleg immens de MakerWorld: no només hi ha clauers, també pots triar figures o qualsevol model que hi trobis i enviar-me l’enllaç per correu perquè te l’imprimeixi en 3D.',
    highlights: [
      'Clauers, figures decoratives o qualsevol model de MakerWorld',
      'Si esculls un clauer, inclou anella, mosquetó i bosseta petita',
      'Envia’ns l’enllaç directe a hablackplus@gmail.com',
    ],
    image: makerworldImg,
    fallbackIcon: Globe,
    isMakerWorld: true,
  },
];

const FILTERS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'Tots els estils' },
  { id: 'clubs', label: 'Esport i Clubs' },
  { id: 'personal', label: 'Personalitzats' },
  { id: 'qr', label: 'Codi QR' },
  { id: 'makerworld', label: 'MakerWorld' },
];

export default function KeychainsPage({ onNavigate }: KeychainsPageProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const visibleItems =
    activeFilter === 'all'
      ? KEYCHAIN_OPTIONS
      : KEYCHAIN_OPTIONS.filter((item) => item.category === activeFilter);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  const makerWorldMailHref =
    "mailto:hablackplus@gmail.com?subject=Model%20de%20MakerWorld%20per%20imprimir&body=Hola%20Hablack%2C%0A%0AHe%20trobat%20aquest%20model%20(clauer%2C%20figura%20o%20pe%C3%A7a)%20a%20MakerWorld%20i%20m'agradaria%20demanar%20pressupost%3A%0A%0A-%20Enlla%C3%A7%20de%20MakerWorld%3A%20%0A-%20Colors%20desitjats%3A%20%0A-%20Quantitat%3A%20";

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary-600 mb-2">
            Catàleg de fabricació 3D
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 tracking-tight">
            Opcions de Clauers 3D
          </h1>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Explora els diferents estils de clauers personalitzats o escull qualsevol clauer, figura o model directament de MakerWorld per encarregar-lo a mida.
          </p>
        </div>

        {/* Segmented Filter Controls */}
        <div
          role="tablist"
          aria-label="Filtrar estils de clauers"
          className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-xl self-start lg:self-end"
        >
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3.5 py-2 text-sm font-medium rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {visibleItems.map((item, index) => {
          const FallbackIcon = item.fallbackIcon;
          const isFailed = failedImages[item.id];

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-0.5"
            >
              {/* 4:3 Image Container */}
              <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-200">
                {!isFailed ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(item.id)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 text-slate-500 p-6 text-center">
                    <FallbackIcon className="w-12 h-12 text-primary-600 mb-3" />
                    <span className="font-heading font-semibold text-slate-800">{item.title}</span>
                  </div>
                )}
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex flex-col flex-1">
                <p className="text-xs font-medium text-primary-600 mb-2">
                  {item.categoryLabel}
                </p>

                <h2 className="text-2xl font-bold font-heading text-slate-900 mb-3">
                  {item.title}
                </h2>

                <p className="text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>

                <ul className="space-y-2.5 mb-8 text-sm text-slate-700 border-t border-slate-100 pt-5">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-primary-600 mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4 border-t border-slate-100 flex flex-wrap items-center justify-end gap-3">
                  {item.isMakerWorld ? (
                    <>
                      <a
                        href="https://makerworld.com/es"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        Anar a MakerWorld
                        <ExternalLink className="w-4 h-4 ml-1.5" />
                      </a>
                      <a
                        href={makerWorldMailHref}
                        className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
                      >
                        <Mail className="w-4 h-4 mr-1.5" />
                        Enviar model per correu
                      </a>
                    </>
                  ) : (
                    <button
                      onClick={() => onNavigate('request')}
                      className="inline-flex items-center px-4 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      Demanar aquest estil
                      <ArrowRight className="w-4 h-4 ml-1.5" />
                    </button>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Club Pricing Callout Strip */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary-600 mb-1">
            Comandes en volum
          </p>
          <h2 className="text-2xl font-bold font-heading text-slate-900 mb-2">
            Encàrrecs per a clubs esportius, escoles o entitats?
          </h2>
          <p className="text-slate-600">
            Consulta els trams de preu per volum des de 10 fins a 100 unitats i calcula el pressupost exacte amb la calculadora interactiva.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('club-pricing')}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Veure Tarifes Clubs
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
          <a
            href="tel:+34606519975"
            className="inline-flex items-center justify-center px-5 py-3 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap shrink-0"
          >
            <Phone className="w-4 h-4 mr-2" />
            +34 606 51 99 75
          </a>
        </div>
      </section>
    </div>
  );
}
