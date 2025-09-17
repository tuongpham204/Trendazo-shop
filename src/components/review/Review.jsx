import { useState } from "react";
import {
  Star,
  ThumbsUp,
  MoreHorizontal,
  Filter,
  TrendingUp,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Alex Mathio",
    rating: 5,
    date: "13 Oct 2024",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    comment:
      "NextGen's dedication to sustainability and ethical practices resonates strongly with today's consumers, positioning the brand as a responsible choice in the fashion world.",
    helpful: 24,
    verified: true,
    tags: ["Sustainable", "Quality"],
  },
  {
    id: 2,
    name: "Emma Stone",
    rating: 4,
    date: "11 Oct 2024",
    avatar:
      "https://plus.unsplash.com/premium_photo-1689551671541-31a345ce6ae0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    comment:
      "Really nice quality! The fit is good but shipping took a bit longer than expected.",
    helpful: 18,
    verified: true,
    tags: ["Quality", "Shipping"],
  },
  {
    id: 3,
    name: "Michael Chan",
    rating: 5,
    date: "09 Oct 2024",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    comment:
      "Absolutely love the design and fabric. Feels premium and eco-friendly at the same time!",
    helpful: 31,
    verified: false,
    tags: ["Design", "Premium", "Eco-friendly"],
  },
  {
    id: 4,
    name: "Sophia Nguyen",
    rating: 3,
    date: "05 Oct 2024",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    comment:
      "The material is nice but sizing runs a little small. Customer support was responsive though.",
    helpful: 12,
    verified: true,
    tags: ["Sizing", "Support"],
  },
];

const ratingDistribution = [
  { stars: 5, percentage: 75, count: 38 },
  { stars: 4, percentage: 15, count: 8 },
  { stars: 3, percentage: 8, count: 4 },
  { stars: 2, percentage: 2, count: 1 },
  { stars: 1, percentage: 0, count: 0 },
];

const Review = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [helpfulVotes, setHelpfulVotes] = useState({});

  const handleHelpfulClick = (reviewId) => {
    setHelpfulVotes((prev) => ({
      ...prev,
      [reviewId]: !prev[reviewId],
    }));
  };

  const filters = ["all", "5 stars", "4 stars", "3 stars", "verified"];

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <div className="text-center mb-12 ">
        <div className="inline-flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full mb-3 ">
          <TrendingUp className="w-4 h-4 text-gray-500" />
          <span className="text-xs font-medium text-gray-600 ">
            Customer Feedback
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-2 dark:text-gray-300">
          What Our Customers Say
        </h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          Real experiences from real people who love our products
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 bg-gray-50 p-6 rounded-2xl border border-gray-100">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <div className="text-5xl font-bold text-gray-800">4.5</div>
            <div>
              <div className="flex text-yellow-400 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i <= 4 ? "fill-current" : ""}`}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500">Based on 51 reviews</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-2">
              <div className="flex items-center gap-1 w-12">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{item.stars}</span>
              </div>
              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-300 rounded-full"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 w-8">{item.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 p-3 bg-white rounded-xl border border-gray-100">
        <div className="flex items-center gap-2 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500" />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                selectedFilter === filter
                  ? "bg-gray-700 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium border-none focus:outline-none focus:ring-1 focus:ring-gray-300"
        >
          <option value="recent">Most Recent</option>
          <option value="helpful">Most Helpful</option>
          <option value="rating">Highest Rating</option>
        </select>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl border border-gray-100"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-xl object-cover ring-2 ring-gray-50"
                  />
                  {review.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-gray-800 text-sm">
                      {review.name}
                    </h3>
                    {review.verified && (
                      <span className="text-[10px] bg-green-100 text-green-700 px-1 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <div className="flex text-yellow-400">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i <= review.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <span>{review.date}</span>
                  </div>
                </div>
              </div>
              <button className="p-1 text-gray-400 rounded-full">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {review.comment}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex gap-2 flex-wrap">
                {review.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleHelpfulClick(review.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                  helpfulVotes[review.id]
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                <ThumbsUp
                  className={`w-3 h-3 ${
                    helpfulVotes[review.id] ? "fill-current" : ""
                  }`}
                />
                <span>
                  Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-8">
        <button className="px-6 py-2 bg-gray-200 text-gray-700 font-medium rounded-full text-sm">
          Load More Reviews
        </button>
      </div>
    </div>
  );
};

export default Review;
