"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BookOpen, User, Building, Calendar, MapPin, Star, Bookmark } from "lucide-react";
import { BookReview } from "@/components/user-page/book-review";
import { RecomendationBook } from "@/components/user-page/book-recommendation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import SidebarLayout from "@/components/user-page/sidebar-layout";
import { ShareDrawer } from "@/components/user-page/share-drawer"
import BookmarkButton from "@/common/bookmark-button";
import { Cart } from "@/components/user-page/borrow/cart";

// Sample book data (replace with actual fetch logic later)
const book = {
  id: "1",
  title: "The Psychology of Money: Timeless Lessons on Wealth, Greed, and Happiness",
  author: "Morgan Housel",
  image: "https://images-na.ssl-images-amazon.com/images/I/81cpDaCJJCL.jpg",
  year: 2020,
  quota: 5,
  category:"finance",
  catalogNumber: "332.024 HOU",
  classification: "332.024",
  type: "Book - Circulation (Available for Borrowing)",
  rackNumber: "33",
  abstract: "In 'The Psychology of Money,' award-winning author Morgan Housel explores the complex relationship individuals have with money. Through 19 short stories, he delves into the psychological factors that influence financial decisions, offering timeless lessons on wealth, greed, and happiness.",
  mainSubject: "Finance",
  isbn: "978-0857197689",
  pages: "256 pages; illustrations; 21 cm",
  language: "English",
  authorType: "Individual",
  publisher: "Harriman House",
  publishCity: "Petersfield, UK",
  availableCopies: 5,
  borrowPrice: "Rp. 0",
  lateFee: "Rp. 1,000 per day",
  canBorrow: true,
  rating: 4.9,
  reviewCount: 4,
  reviews: [
    {
      id: "1",
      author: "John Doe",
      date: "2023-11-15",
      rating: 5,
      content: "An insightful book that provides a great introduction to the psychological aspects of financial decision-making. Highly recommended for anyone interested in personal finance."
    },
    {
      id: "2",
      author: "Jane Smith",
      date: "2023-10-30",
      rating: 4,
      content: "Well-written and informative. I enjoyed learning about the various psychological factors that influence our relationship with money."
    },
    {
      id: "3",
      author: "Alice Johnson",
      date: "2023-10-15",
      rating: 5,
      content: "This book offers a comprehensive overview of how psychology affects financial behavior. A must-read for anyone looking to improve their financial habits."
    },
    {
      id: "4",
      author: "Jane Smith",
      date: "2023-10-30",
      rating: 4,
      content: "Well-written and informative. I enjoyed learning about the various psychological factors that influence our relationship with money."
    },
  ]
};

export default function BookDetailPage() {
  const [visibleReviews, setVisibleReviews] = useState(3);

  const loadMoreReviews = () => {
    setVisibleReviews((prevVisible) =>
      Math.min(prevVisible + 5, book.reviews.length)
    );
  };

  const header = (
    <header className="container mx-auto flex h-10 shrink-0 items-center justify-between gap-2 px-4">
      {/* Breadcrumbs Section */}
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/collections">Collections</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Book</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/collections/book/${book.id}`} className="inline-block md:max-w-full max-w-[130px] truncate">
                {book.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );

  return (
    <SidebarLayout header={header} defaultOpen={false}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="relative">
              <Image
                src={book.image}
                alt={book.title}
                width={300}
                height={450}
                className="rounded-lg shadow-lg w-full h-auto"
              />
              {/* Overlay for Out of Quota */}
              {!book.canBorrow && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                  <p className="text-white text-lg font-bold">
                    Maaf (｡•́︿•̀｡) <br /> bukunya lagi banyak <br /> yang baca
                  </p>
                </div>
              )}
              {/* <div className="absolute top-2 right-2 flex gap-2">
                <ShareDrawer
                  title={book.title}
                  url={typeof window !== 'undefined' ? window.location.href+"/book/"+book.id : ''}
                />
                <BookmarkButton bookId={book.id} bookTitle={book.title}/>
              </div> */}
            </div>
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${i < Math.floor(book.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                      }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm font-medium">
                {book.rating.toFixed(1)}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">
                ({book.reviewCount} reviews)
              </span>
            </div>
          </div>
          <div className="md:w-2/3 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                by {book.author}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{book.mainSubject}</Badge>
                <Badge variant="outline">{book.language}</Badge>
                {book.canBorrow && <Badge variant="default">Available</Badge>}
              </div>
            </div>
            <div className="space-y-2">
              <p className="flex items-center text-sm text-muted-foreground">
                <User className="mr-2" size={16} /> {book.authorType}
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <Building className="mr-2" size={16} /> {book.publisher}
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <MapPin className="mr-2" size={16} /> {book.publishCity}
              </p>
              <p className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-2" size={16} /> {book.year}
              </p>
            </div>
            <Separator />
            <div>
              <h2 className="text-xl font-semibold mb-2">Abstract</h2>
              <p className="text-muted-foreground">{book.abstract}</p>
            </div>
            <div className="md:flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground mb-5 md:mb-0">
                <BookOpen className="mr-2" size={16} />
                <span>
                  {book.availableCopies} of {book.quota} available
                </span>
              </div>
              <div className="flex gap-2 md:gap-4 items-center justify-between">
                <div className="flex gap-2">
                  <ShareDrawer
                    title={book.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                  />
                  <BookmarkButton book={book} mark="Bookmarked" />
                </div>
                {/* {book.canBorrow && (
                  <Button size="lg">Borrow Book</Button>
                )} */}
                {book.canBorrow && (
                  <Cart
                    isAdd={true}
                    book={book}
                  />

                )}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8" />
        <div>
          <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
          <div className="space-y-6">
            {book.reviews.slice(0, visibleReviews).map((review) => (
              <BookReview key={review.id} {...review} />
            ))}
          </div>
          {visibleReviews < book.reviews.length && (
            <div className="mt-6 text-center">
              <Button onClick={loadMoreReviews} variant="outline">
                Load More Reviews
              </Button>
            </div>
          )}
        </div>
        <RecomendationBook />
      </div>
    </SidebarLayout>
  );
}