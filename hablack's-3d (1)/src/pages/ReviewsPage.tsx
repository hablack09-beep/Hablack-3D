import { Star, User, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

// Mock data for reviews
const initialReviews = [
  {
    id: 1,
    author: "Marc F.",
    rating: 5,
    date: "Fa 2 setmanes",
    content: "Li vaig demanar una peça per l'aspiradora que ja no es fabricava. Li vaig enviar una foto i les mides i en menys de 3 dies la tenia a casa! Funciona perfectament."
  },
  {
    id: 2,
    author: "Laura G.",
    rating: 5,
    date: "Fa 1 mes",
    content: "Els clauers personalitzats que vaig encarregar per a l'aniversari de la meva filla han quedat super xulos. Recomanat al 100%, súper amable i preu just."
  },
  {
    id: 3,
    author: "Pere M.",
    rating: 4,
    date: "Fa 2 mesos",
    content: "Va fer un disseny complex per a un adaptador d'una càmera. El primer cop no encaixava del tot, però m'ho va arreglar i tornar a imprimir rapidíssim sense cap cost extra."
  },
  {
    id: 4,
    author: "Marta R.",
    rating: 5,
    date: "Fa 3 mesos",
    content: "Tracte immillorable. Necessitava un suport de paret pels auriculars. Li vaig fer un esbós en un paper, li vaig fer una foto i aquí el tinc penjat."
  }
];

export default function ReviewsPage() {
  const { user } = useAuth();
  const [reviews, setReviews] = useState(initialReviews);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, content: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.content.trim()) return;

    const review = {
      id: Date.now(),
      author: user?.displayName || 'Usuari Anònim',
      rating: newReview.rating,
      date: 'Ara mateix',
      content: newReview.content
    };

    setReviews([review, ...reviews]);
    setIsFormOpen(false);
    setNewReview({ rating: 5, content: '' });
  };
  return (
    <div className="max-w-5xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold font-heading text-gray-900 mb-4">Opinions dels Clients</h1>
        <p className="text-xl text-gray-600">Llegeix què opinen aquells que ja han fet realitat els seus projectes.</p>
        
        <div className="mt-8 flex items-center justify-center space-x-2">
          <div className="flex text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-8 h-8 fill-current" />
            ))}
          </div>
          <span className="text-2xl font-bold text-gray-900 ml-2">4.9/5</span>
          <span className="text-gray-500 ml-2">({reviews.length} valoracions)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 font-heading">{review.author}</h3>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-gray-200'}`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600 leading-relaxed flex-grow">"{review.content}"</p>
          </motion.div>
        ))}
      </div>

      {/* Suggest leaving a review */}
      <div className="mt-16 bg-primary-50 rounded-3xl p-10 text-center border border-primary-100">
        <h3 className="text-2xl font-bold font-heading text-gray-900 mb-3">Has fet una comanda recentment?</h3>
        <p className="text-gray-600 mb-6">La teva opinió m'ajuda a millorar i dona confiança a altres usuaris.</p>
        <button 
          onClick={() => setIsFormOpen(true)}
          className="px-6 py-3 bg-white text-primary-600 font-medium rounded-full shadow-sm hover:shadow-md transition-all border border-primary-200"
        >
          Deixar la meva opinió
        </button>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-xl"
            >
              <div className="flex flex-row justify-between items-center mb-6">
                <h3 className="text-2xl font-bold font-heading text-gray-900">Escriu la teva opinió</h3>
                <button onClick={() => setIsFormOpen(false)} className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valoració</label>
                  <div className="flex space-x-2 text-yellow-400">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star className={`w-8 h-8 ${star <= newReview.rating ? 'fill-current' : 'text-gray-200'}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">La teva experiència</label>
                  <textarea
                    id="content"
                    rows={4}
                    value={newReview.content}
                    onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-shadow resize-none"
                    placeholder="Escriu aquí el que et va semblar el servei i el resultat..."
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-6 py-3 font-medium text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    Cancel·lar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-colors disabled:opacity-50"
                    disabled={!newReview.content.trim()}
                  >
                    Enviar Opinió
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
