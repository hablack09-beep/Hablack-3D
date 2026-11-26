import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Plus, X, User } from 'lucide-react';

interface Review {
  id: number;
  author: string;
  keychainType: string;
  rating: number;
  date: string;
  content: string;
}

const INITIAL_REVIEWS: Review[] = [
  {
    id: 1,
    author: 'Oriol Casals',
    keychainType: 'Escut esportiu del club',
    rating: 5,
    date: 'Fa 1 setmana',
    content:
      "Vam encarregar 35 clauers amb l'escut del nostre club de bàsquet i han quedat espectaculars. Els colors són molt vius i tots els jugadors el porten penjat a la motxilla!",
  },
  {
    id: 2,
    author: 'Núria Puigdomènech',
    keychainType: 'Nom personalitzat 3D',
    rating: 5,
    date: 'Fa 2 setmanes',
    content:
      'Li vaig demanar clauers amb el nom per a la classe de la meva filla i va ser un encert total. Súper ben acabats, lleugers i sense cap cantell punxegut.',
  },
  {
    id: 3,
    author: 'Marc Valls',
    keychainType: 'Model de MakerWorld',
    rating: 5,
    date: 'Fa 3 setmanes',
    content:
      "Vaig trobar un clauer articulat a MakerWorld, li vaig enviar l'enllaç per correu i en pocs dies ja el tenia a les mans. La qualitat d'impressió és impecable.",
  },
  {
    id: 4,
    author: 'Carla Ferrer',
    keychainType: 'Clauer amb Codi QR',
    rating: 5,
    date: 'Fa 1 mes',
    content:
      "El clauer amb codi QR per al meu estudi funciona de meravella! Tots els clients l'escanegen amb el mòbil a la primera i crida molt l'atenció.",
  },
  {
    id: 5,
    author: 'Jordi Montserrat',
    keychainType: 'Comanda per a entitat',
    rating: 5,
    date: 'Fa 1 mes',
    content:
      'Vam demanar 50 clauers personalitzats per a una caminada popular. Tracte proper per telèfon, preu molt ajustat per tram i entrega puntualíssima.',
  },
  {
    id: 6,
    author: 'Laia Soler',
    keychainType: 'Nom personalitzat 3D',
    rating: 5,
    date: 'Fa 2 mesos',
    content:
      "M'ha encantat com ha quedat el meu clauer personalitzat amb els colors que vaig escollir. Es nota la cura en cada detall i és súper resistent al dia a dia.",
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '5.0';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const created: Review = {
      id: Date.now(),
      author: authorName.trim(),
      keychainType: 'Clauer personalitzat 3D',
      rating,
      date: 'Ara mateix',
      content: comment.trim(),
    };

    setReviews((prev) => [created, ...prev]);
    setAuthorName('');
    setRating(5);
    setComment('');
    setIsModalOpen(false);
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Header + Summary + Add Review Button */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-primary-600 mb-2">
            Experiències reals
          </p>
          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-slate-900 tracking-tight">
            Opinions dels Clients
          </h1>
          <p className="mt-3 text-lg text-slate-600 leading-relaxed">
            Descobreix què opinen particulars i clubs esportius que ja porten els seus clauers personalitzats en 3D.
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center text-amber-400" aria-label={`Puntuació ${averageRating} sobre 5`}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="font-mono tabular-nums text-lg font-bold text-slate-900">
              {averageRating}/5
            </span>
            <span className="text-sm text-slate-500">
              · <span className="font-mono tabular-nums">{reviews.length}</span> valoracions
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer self-start md:self-end"
        >
          <Plus className="w-4 h-4 mr-2 shrink-0" />
          Posar una opinió
        </button>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review, index) => (
          <motion.article
            key={review.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: Math.min(index, 5) * 0.04 }}
            className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold font-heading text-slate-900 leading-tight">
                      {review.author}
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      {review.keychainType} · {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center text-amber-400 shrink-0" aria-label={`${review.rating} de 5 estrelles`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= review.rating ? 'fill-current' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-slate-700 leading-relaxed">
                «{review.content}»
              </p>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Add Review Modal (Session Only) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.16 }}
              className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 max-w-lg w-full shadow-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="review-modal-title"
            >
              <div className="flex items-center justify-between gap-4 mb-6">
                <h2 id="review-modal-title" className="text-2xl font-bold font-heading text-slate-900">
                  Posar una opinió
                </h2>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                  aria-label="Tancar formulari"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="review-author" className="block text-sm font-medium text-slate-700 mb-1.5">
                    El teu nom
                  </label>
                  <input
                    id="review-author"
                    type="text"
                    required
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    placeholder="Ex. Marc Garcia"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none text-slate-900"
                  />
                </div>

                <div>
                  <span className="block text-sm font-medium text-slate-700 mb-2">
                    Valoració amb estrelles
                  </span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        aria-label={`${star} estrelles`}
                        className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= rating ? 'text-amber-400 fill-current' : 'text-slate-200'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="review-comment" className="block text-sm font-medium text-slate-700 mb-1.5">
                    El teu comentari
                  </label>
                  <textarea
                    id="review-comment"
                    rows={4}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Explica'ns què t'han semblat els teus clauers personalitzats..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none resize-none text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel·lar
                  </button>
                  <button
                    type="submit"
                    disabled={!authorName.trim() || !comment.trim()}
                    className="px-5 py-2.5 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
                  >
                    Publicar opinió
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
