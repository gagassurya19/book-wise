'use client'
import Link from "next/link";
import { Badge } from "../ui/badge";
import Image from "next/image"
import BookmarkButton from "@/common/bookmark-button";
import { ShareDrawer } from "./share-drawer";

export default function BookCollection({ search = "", category = "", years = "" }) {
    const books = [
        {
            id: "1",
            title: "The Psychology of Money",
            author: "Morgan Housel",
            category: "finance",
            year: 2020,
            description:
                "Learn how emotions, behaviors, and psychology influence financial decisions and discover timeless lessons for managing money effectively.",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/81cpDaCJJCL.jpg",
            quota: 5,
        },
        {
            id: "2",
            title: "Atomic Habits",
            author: "James Clear",
            category: "self-help",
            year: 2018,
            description:
                "A guide to building good habits, breaking bad ones, and achieving remarkable results in everyday life.",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/91bYsX41DVL.jpg",
            quota: 5,
        },
        {
            id: "3",
            title: "Sapiens",
            author: "Yuval Noah Harari",
            category: "history",
            year: 2015,
            description:
                "A brief history of humankind, exploring the journey of humans from the Stone Age to the modern world.",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/713jIoMO3UL.jpg",
            quota: 0,
        },
        {
            id: "4",
            title: "The Lean Startup",
            author: "Eric Ries",
            category: "business",
            year: 2011,
            description:
                "A guide for entrepreneurs on how to innovate, test ideas, and build sustainable businesses in a rapidly changing world.",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg",
            quota: 5,
        },
        {
            id: "5",
            title: "1984",
            author: "George Orwell",
            category: "fiction",
            year: 1949,
            description:
                "A dystopian novel exploring themes of surveillance, government control, and individual freedom in a totalitarian state.",
            image:
                "https://images-na.ssl-images-amazon.com/images/I/81t2CVWEsUL.jpg",
            quota: 5,
        },
        {
            id: "6",
            title: "The Alchemist",
            author: "Paulo Coelho",
            category: "fiction",
            year: 1988,
            description:
                "A magical story of Santiago, an Andalusian shepherd, and his quest to find a treasure that teaches him about life and destiny.",
            image: "https://images-na.ssl-images-amazon.com/images/I/51Z0nLAfLmL._SX331_BO1,204,203,200_.jpg",
            quota: 0,
        },
        {
            id: "7",
            title: "Deep Work",
            author: "Cal Newport",
            category: "productivity",
            year: 2016,
            description:
                "Explores how to cultivate focus in a distracted world and achieve exceptional work by avoiding shallow activities.",
            image: "https://nuriakenya.com/wp-content/uploads/2020/11/Deep-Work.jpg",
            quota: 5,
        },
        {
            id: "8",
            title: "Educated",
            author: "Tara Westover",
            category: "memoir",
            year: 2018,
            description:
                "A memoir of a woman who grows up in a strict and abusive household in rural Idaho but escapes through education.",
            image: "https://images-na.ssl-images-amazon.com/images/I/81WojUxbbFL.jpg",
            quota: 5,
        },
        {
            id: "9",
            title: "The Art of War",
            author: "Sun Tzu",
            category: "philosophy",
            year: -500,
            description:
                "An ancient Chinese military treatise that provides strategies for warfare and how they can be applied to life and leadership.",
            image: "https://cdn2.penguin.com.au/covers/original/9780877734529.jpg",
            quota: 0,
        },
        {
            id: "10",
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "fiction",
            year: 1925,
            description:
                "A classic American novel exploring themes of wealth, love, and the pursuit of the American Dream during the Jazz Age.",
            image: "https://i.pinimg.com/originals/a7/ea/79/a7ea79067b7149982f3856f6d85a22d0.jpg",
            quota: 5,
        },
        {
            id: "11",
            title: "Man's Search for Meaning",
            author: "Viktor E. Frankl",
            category: "philosophy",
            year: 1946,
            description:
                "A profound psychological memoir and exploration of the meaning of life, based on the author's experiences in a Nazi concentration camp.",
            image: "https://covers.shakespeareandcompany.com/97818460/9781846042843.jpg",
            quota: 5,
        },
        {
            id: "12",
            title: "Becoming",
            author: "Michelle Obama",
            category: "memoir",
            year: 2018,
            description:
                "The memoir of former First Lady Michelle Obama, chronicling her life from childhood to the White House.",
            image: "https://images-na.ssl-images-amazon.com/images/I/81h2gWPTYJL.jpg",
            quota: 5,
        },
    ];


    // Filter books based on props
    const filteredBooks = books.filter((book) => {
        const matchesSearch =
            search === "" ||
            book.title.toLowerCase().includes(search.toLowerCase()) ||
            book.author.toLowerCase().includes(search.toLowerCase());

        const matchesCategory =
            category === "" || book.category.toLowerCase() === category.toLowerCase();

        const matchesYear = years === "" || book.year.toString() === years.toString();

        return matchesSearch && matchesCategory && matchesYear;
    });

    return (
        <>
            <div className="flex mb-5">
                <h2 className="text-lg text-gray-700">
                    Menampilkan hasil untuk {" "}
                    {search || category || years
                        ? `${search ? `"${search}"` : ""}${category ? `kategori "${category}"` : ""
                        }${years ? `tahun ${years}` : ""}`
                        : "semua buku"}
                </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
                {filteredBooks.length > 0 ? (
                    filteredBooks.map((book) => (
                        <div
                            key={book.id}
                            className="relative bg-white shadow-md rounded-lg overflow-hidden max-w-sm hover:shadow-lg hover:-translate-y-1 transition duration-300"
                        >
                            {/* Book Image */}
                            <div className="relative group">
                                <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
                                    <BookmarkButton book={book} />
                                    <ShareDrawer
                                        title={book.title}
                                        url={typeof window !== 'undefined' ? window.location.href+"/book/"+book.id : ''}
                                    />
                                </div>


                                {/* Book Image */}
                                <img
                                    src={book.image}
                                    alt={`${book.title} Cover`}
                                    className="w-full h-48 md:h-96 object-cover group-hover:opacity-90 transition duration-300"
                                />

                                {/* Year Badge */}
                                <Link href={`/collections?year=${book.year}`}>
                                    <Badge className="absolute bottom-10 left-2" variant="secondary">
                                        {book.year}
                                    </Badge>
                                </Link>

                                {/* Category Badge */}
                                <Link href={`/collections?category=${book.category}`}>
                                    <Badge className="absolute bottom-2 left-2">
                                        {book.category}
                                    </Badge>
                                </Link>

                                {/* Overlay for Out of Quota */}
                                {book.quota === 0 && (
                                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center backdrop-blur-sm">
                                        <p className="text-white text-lg font-bold">
                                            Maaf (｡•́︿•̀｡) <br /> bukunya lagi banyak <br /> yang baca
                                        </p>
                                    </div>
                                )}
                            </div>


                            {/* Card Content */}
                            <div className="p-4">
                                <Link href={`/collections/book/${book.id}`}>
                                    {/* Title */}
                                    <h2 className="text-lg font-bold text-gray-900 truncate hover:underline transition duration-300">
                                        {book.title}
                                    </h2>
                                    {/* Author */}
                                    <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
                                    {/* Description */}
                                    <p className="text-sm text-gray-600 mt-3">{book.description}</p>
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-full">
                        <Image src="/assets/dino.png" alt="dino" width={50} height={50} className="mx-auto mt-10 mb-3" />
                        No books match your criteria.
                    </p>
                )}

                {filteredBooks.length > 0 && (
                    <p className="text-gray-500 text-center col-span-full text-sm">
                        <Image src="/assets/dino.png" alt="dino" width={40} height={40} className="mx-auto mt-10 mb-3" />
                        "Roar! That’s all, folks.<br />I ate the rest of the data... NyamNyam!🍴"
                    </p>
                )}
            </div>
        </>
    );
}