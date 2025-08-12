'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Review {
  id: string;
  productId: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
}

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    rating: 5,
    title: '',
    comment: ''
  });

  // Load reviews from localStorage
  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [productId]);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(reviews));
  }, [reviews, productId]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!newReview.customerName.trim() || !newReview.title.trim() || !newReview.comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    if (newReview.customerName.length > 100 || newReview.title.length > 200 || newReview.comment.length > 1000) {
      alert('Input too long. Please shorten your text.');
      return;
    }

    // Sanitize inputs
    const sanitizedReview: Review = {
      id: Date.now().toString(),
      productId,
      customerName: newReview.customerName.trim().replace(/[<>]/g, ''),
      rating: newReview.rating,
      title: newReview.title.trim().replace(/[<>]/g, ''),
      comment: newReview.comment.trim().replace(/[<>]/g, ''),
      date: new Date().toISOString(),
      verified: true
    };

    setReviews(prev => [sanitizedReview, ...prev]);
    setNewReview({
      customerName: '',
      rating: 5,
      title: '',
      comment: ''
    });
    setShowReviewForm(false);
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-[#EDDD5E]' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-gilroy font-semibold text-[#404A3D] mb-2">
            Customer Reviews
          </h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {renderStars(Math.round(averageRating))}
              <span className="text-lg font-gilroy font-medium text-[#404A3D]">
                {averageRating.toFixed(1)}
              </span>
            </div>
            <span className="text-gray-500 font-gilroy">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        </div>
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-6 py-3 bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold rounded-lg hover:bg-[#E5D454] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:ring-offset-2"
        >
          Write a Review
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8 p-6 border border-gray-200 rounded-lg">
          <h4 className="text-lg font-gilroy font-semibold text-[#404A3D] mb-4">
            Write a Review for {productName}
          </h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                id="customerName"
                required
                value={newReview.customerName}
                onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rating *
              </label>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview(prev => ({ ...prev, rating }))}
                    className="focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] rounded"
                  >
                    <svg
                      className={`w-8 h-8 ${rating <= newReview.rating ? 'text-[#EDDD5E]' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="reviewTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Review Title *
              </label>
              <input
                type="text"
                id="reviewTitle"
                required
                value={newReview.title}
                onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
                placeholder="Summarize your experience"
              />
            </div>

            <div>
              <label htmlFor="reviewComment" className="block text-sm font-medium text-gray-700 mb-1">
                Review *
              </label>
              <textarea
                id="reviewComment"
                required
                rows={4}
                value={newReview.comment}
                onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EDDD5E] focus:border-transparent outline-none"
                placeholder="Share your experience with this product..."
              />
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="px-6 py-2 bg-[#EDDD5E] text-[#404A3D] font-gilroy font-semibold rounded-lg hover:bg-[#E5D454] transition-colors focus:outline-none focus:ring-2 focus:ring-[#EDDD5E] focus:ring-offset-2"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-2 text-gray-600 font-gilroy font-medium hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500 font-gilroy">
              No reviews yet. Be the first to review this product!
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-gilroy font-semibold text-[#404A3D]">
                    {review.title}
                  </h4>
                  <div className="flex items-center space-x-2 mt-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-500 font-gilroy">
                      by {review.customerName}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-gilroy">
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <span className="text-sm text-gray-500 font-gilroy">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700 font-gilroy leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
