
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { Review } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from '@/context/auth-context'; // Check if user is logged in
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

interface ProductReviewsProps {
    reviews: Review[];
    productId: string;
}

export function ProductReviews({ reviews, productId }: ProductReviewsProps) {
    const { isLoggedIn } = useAuth();
    const { toast } = useToast();
    const [newReviewText, setNewReviewText] = useState('');
    const [newRating, setNewRating] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleRatingChange = (value: string) => {
        setNewRating(parseInt(value, 10));
    };

    const handleSubmitReview = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isLoggedIn) {
            toast({ title: "Login Required", description: "Please login to submit a review.", variant: "destructive" });
            return;
        }
        if (!newRating) {
            toast({ title: "Rating Required", description: "Please select a star rating.", variant: "destructive" });
            return;
        }
        if (!newReviewText.trim()) {
            toast({ title: "Comment Required", description: "Please write a comment for your review.", variant: "destructive" });
            return;
        }

        setIsSubmitting(true);
        console.log('Submitting review:', { productId, rating: newRating, comment: newReviewText });

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, you'd send the review to your backend and potentially update the displayed reviews
        toast({ title: "Review Submitted (Simulated)", description: "Thank you for your feedback!" });
        setNewReviewText('');
        setNewRating(null);
        setIsSubmitting(false);
        // Optionally, refetch reviews or add the new review optimistically
    };

    return (
        <div className="space-y-6 pt-4 border-t mt-4">
            <h3 className="text-lg font-semibold">Customer Reviews</h3>
            {reviews.length === 0 ? (
                 <p className="text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
            ) : (
                reviews.map((review) => (
                    <div key={review.id} className="border-b pb-4 last:border-b-0">
                        <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                                <span className="font-semibold">{review.userName}</span>
                                <div className="flex items-center gap-0.5 text-amber-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-current' : 'fill-muted stroke-muted-foreground'}`} />
                                    ))}
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-foreground prose prose-sm max-w-none dark:prose-invert">{review.comment}</p>
                    </div>
                ))
            )}

            {/* Review Form */}
            <div className="pt-6 border-t mt-6">
                <h4 className="text-lg font-semibold mb-3">Write Your Review</h4>
                {!isLoggedIn ? (
                    <p className="text-muted-foreground">
                        Please <Link href="/login" className="text-primary hover:underline">login</Link> to write a review.
                    </p>
                ) : (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <Label className="mb-2 block">Your Rating*</Label>
                            <RadioGroup onValueChange={handleRatingChange} value={newRating?.toString()} className="flex space-x-1">
                                {[5, 4, 3, 2, 1].map((starValue) => (
                                    <div key={starValue} className="flex items-center">
                                        <RadioGroupItem value={String(starValue)} id={`rating-${starValue}`} className="sr-only" />
                                        <Label htmlFor={`rating-${starValue}`} className="cursor-pointer">
                                            <Star
                                                className={`h-6 w-6 transition-colors ${
                                                    newRating !== null && starValue <= newRating
                                                        ? 'text-amber-500 fill-amber-500'
                                                        : 'text-muted-foreground hover:text-amber-400'
                                                }`}
                                            />
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>
                        <div>
                            <Label htmlFor="review-comment" className="mb-2 block">Your Comment*</Label>
                            <Textarea
                                id="review-comment"
                                placeholder="Share your experience with this product..."
                                value={newReviewText}
                                onChange={(e) => setNewReviewText(e.target.value)}
                                rows={4}
                                required
                                disabled={isSubmitting}
                            />
                        </div>
                        <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                                </>
                            ) : (
                                'Submit Review'
                            )}
                        </Button>
                    </form>
                )}
            </div>
        </div>
    );
}
