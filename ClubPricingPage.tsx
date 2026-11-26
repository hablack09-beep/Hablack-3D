import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Mail, Phone, Check, Info } from 'lucide-react';

interface PricingTier {
  minQty: number;
  label: string;
  unitPrice: number;
}

const CLUB_PRICING_TIERS: PricingTier[] = [
  { minQty: 10, label: '10 clauers', unitPrice: 4.5 },
  { minQty: 20, label: '20 clauers', unitPrice: 4.25 },
  { minQty: 35, label: '35 clauers', unitPrice: 4.0 },
  { minQty: 50, label: '50 clauers', unitPrice: 3.95 },
  { minQty: 100, label: '100 clauers', unitPrice: 3.6 },
];

const QUICK_QUANTITIES = [10, 20, 30, 35, 50, 100];

function formatEuro(amount: number): string {
  return amount.toFixed(2).replace('.', ',') + ' €';
}

function getTierForQuantity(qty: number): PricingTier {
  if (qty < 10) return CLUB_PRICING_TIERS[0];
  let matched = CLUB_PRICING_TIERS[0];
  for (const tier of CLUB_PRICING_TIERS) {
    if (qty >= tier.minQty) {
      matched = tier;
    }
  }
  return matched;
}

export default function ClubPricingPage() {
  const [quantity, setQuantity] = useState<number>(30);

  const safeQuantity = Number.isFinite(quantity) && quantity > 0 ? Math.min(quantity, 1000) : 10;
  const isBelowClubMinimum = safeQuantity < 10;
  const appliedTier = getTierForQuantity(safeQuantity);
  const estimatedTotal = safeQuantity * appliedTier.unitPrice;

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (Number.isNaN(val)) {
      setQuantity(0);
    } else {
      setQuantity(Math.max(0, Math.min(1000, val)));
    }
  };

  const emailSubject = encodeURIComponent(
    `Pressupost Club — ${safeQuantity} clauers 3D personalitzats`
  );
  const emailBody = encodeURIComponent(
    `Hola Hablack,\n\nEns agradaria demanar pressupost per a una comanda de clauers personalitzats per al nostre club/entitat:\n\n- Quantitat aproximada: ${safeQuantity} clauers\n- Tram aplicat: ${appliedTier.label} (${formatEuro(appliedTier.unitPrice)}/unitat)\n- Total orientatiu: ${formatEuro(estimatedTotal)}\n\nAdjunto l'escut o logotip del club!`
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Header */}
      <div className="max-w-3xl border-b border-slate-200 pb-8">
        <p className="text-sm font-medium text-primary-600 mb-2">
          Clubs esportius i entitats
        </p>
        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 tracking-tight">
          Tarifes per Volum de Clauers 3D
        </h1>
        <p className="mt-3 text-lg text-slate-600 leading-relaxed">
          Preus clars i progressius per a equips, campus esportius, associacions i esdeveniments. Com més unitats encarregueu, menor és el cost per unitat.
        </p>
      </div>

      {/* Main Split: Pricing Table (Left) + Interactive Calculator (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Pricing Table & Mandatory Note */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold font-heading text-slate-900">
                  Taula de Preus per a Clubs
                </h2>
                <p className="text-sm text-slate-500 mt-0.5">
                  Inclou disseny de relleu a partir del vostre escut
                </p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500 whitespace-nowrap">
                EUR / unitat
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                    <th className="py-3.5 px-6">Volum de comanda</th>
                    <th className="py-3.5 px-6">Preu per unitat</th>
                    <th className="py-3.5 px-6 text-right">Import del tram</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {CLUB_PRICING_TIERS.map((tier) => {
                    const isSelectedTier =
                      !isBelowClubMinimum && appliedTier.minQty === tier.minQty;
                    const tierTotal = tier.minQty * tier.unitPrice;

                    return (
                      <tr
                        key={tier.minQty}
                        onClick={() => setQuantity(tier.minQty)}
                        className={`transition-colors cursor-pointer ${
                          isSelectedTier
                            ? 'bg-primary-50/70'
                            : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-4 px-6 font-medium text-slate-900">
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center border text-xs shrink-0 ${
                                isSelectedTier
                                  ? 'bg-primary-600 border-primary-600 text-white'
                                  : 'border-slate-300 text-transparent'
                              }`}
                            >
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="font-semibold">{tier.label}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-mono tabular-nums font-bold text-slate-900">
                          {formatEuro(tier.unitPrice)}
                          <span className="text-slate-500 font-sans font-normal">/unitat</span>
                        </td>
                        <td className="py-4 px-6 text-right font-mono tabular-nums text-slate-600">
                          {formatEuro(tierTotal)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mandatory Explanatory Note directly below the table */}
          <div className="bg-slate-100 border border-slate-200 rounded-xl p-5 flex items-start gap-3.5">
            <Info className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
            <p className="text-sm text-slate-700 leading-relaxed">
              Per a comandes amb quantitats intermèdies, s'aplicarà el preu per unitat del tram immediatament inferior (per exemple, si demanes 30 clauers, el preu serà de 4,25 €/unitat).
            </p>
          </div>
        </motion.section>

        {/* Right: Interactive Calculator */}
        <motion.aside
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
          className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6"
        >
          <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center text-primary-600 shrink-0">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-heading text-slate-900">
                Calculadora de Pressupost
              </h2>
              <p className="text-xs text-slate-500">
                Comprova a l’instant el preu per a qualsevol quantitat
              </p>
            </div>
          </div>

          {/* Quantity Input + Slider */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <label
                htmlFor="club-quantity"
                className="text-sm font-medium text-slate-700"
              >
                Nombre de clauers
              </label>
              <div className="flex items-center gap-2">
                <input
                  id="club-quantity"
                  type="number"
                  min={1}
                  max={1000}
                  value={quantity || ''}
                  onChange={handleQuantityInput}
                  className="w-24 px-3 py-2 text-right font-mono tabular-nums font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white"
                />
                <span className="text-sm text-slate-500">unitats</span>
              </div>
            </div>

            <input
              type="range"
              aria-label="Selector de quantitat de clauers"
              min={10}
              max={150}
              step={1}
              value={Math.max(10, Math.min(150, safeQuantity))}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full accent-primary-600 cursor-pointer"
            />

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {QUICK_QUANTITIES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  className={`px-3 py-1.5 text-xs font-mono tabular-nums font-medium rounded-lg border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    safeQuantity === preset
                      ? 'bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {preset} u.
                </button>
              ))}
            </div>
          </div>

          {/* Calculation Breakdown */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-3">
            {isBelowClubMinimum ? (
              <p className="text-sm text-slate-700 leading-relaxed">
                Les tarifes de volum per a clubs s’apliquen a partir de <strong>10 unitats</strong>. Per a comandes més petites, contacta per obtenir un pressupost personalitzat.
              </p>
            ) : (
              <>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Tram aplicat</span>
                  <span className="font-medium text-slate-900">{appliedTier.label}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Preu per unitat</span>
                  <span className="font-mono tabular-nums font-semibold text-primary-600">
                    {formatEuro(appliedTier.unitPrice)} / unitat
                  </span>
                </div>
                <div className="pt-3 border-t border-slate-200 flex items-baseline justify-between">
                  <span className="text-sm font-medium text-slate-900">
                    Total estimat ({safeQuantity} clauers)
                  </span>
                  <span className="text-2xl font-bold font-mono tabular-nums text-slate-900">
                    {formatEuro(estimatedTotal)}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Direct Conversion CTAs */}
          <div className="space-y-3 pt-1">
            <a
              href={`mailto:hablackplus@gmail.com?subject=${emailSubject}&body=${emailBody}`}
              className="w-full inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors whitespace-nowrap"
            >
              <Mail className="w-4 h-4 mr-2 shrink-0" />
              Sol·licitar {safeQuantity} clauers per correu
            </a>

            <a
              href="tel:+34606519975"
              className="w-full inline-flex items-center justify-center px-5 py-3.5 text-sm font-medium text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
            >
              <Phone className="w-4 h-4 mr-2 shrink-0 text-primary-600" />
              Trucar ara: +34 606 51 99 75
            </a>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}
