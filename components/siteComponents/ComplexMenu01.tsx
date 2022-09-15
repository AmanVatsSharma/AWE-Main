
"use client"

import { useState } from "react"

export function ComplexMenu01() {
  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Clothing" },
    { id: 3, name: "Home & Garden" },
    { id: 4, name: "Beauty" },
    { id: 5, name: "Sports" },
    { id: 6, name: "Toys" },
    { id: 7, name: "Books" },
    { id: 8, name: "Automotive" },
    { id: 9, name: "Furniture" },
    { id: 10, name: "Outdoor" },
  ]
  const [selectedCategory, setSelectedCategory] = useState(categories[0])
  return (
    <div className="w-full">
      <div className="flex items-center justify-center bg-background py-4 md:py-6">
        <div className="flex w-full max-w-6xl overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`mx-4 shrink-0 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none ${
                category.id === selectedCategory.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 md:px-6 py-8">
        <h2 className="text-2xl font-bold mb-4">{selectedCategory.name}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="bg-background rounded-md overflow-hidden shadow-sm">
              <img
                src="/placeholder.svg"
                alt={`Product ${i + 1}`}
                width={200}
                height={200}
                className="w-full h-[200px] object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">Product {i + 1}</h3>
                <p className="text-muted-foreground text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
