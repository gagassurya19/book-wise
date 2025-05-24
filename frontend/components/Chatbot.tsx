'use client';

import { useState, useEffect, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fetchBooks, fetchBooksRecommendation } from '@/lib/api';
import { SimpleBook } from '@/types/interfaces';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';
import Link from 'next/link';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  type?: 'text' | 'books';
  books?: SimpleBook[];
}

const exampleQuestions = [
  "Rekomendasi buku terbaik?",
  "Apa saja buku yang tersedia di kategori fiksi?",
  "Buku apa saja yang tersedia dalam bahasa Indonesia?",
  "Buku apa yang cocok untuk pemula?",
  "Bagaimana cara meminjam buku?"
];

const followUpQuestions = {
  recommendation: [
    "Buku apa yang cocok untuk pemula?",
    "Ada rekomendasi buku fiksi terbaru?",
    "Buku apa yang paling populer?",
  ],
  category: [
    "Apa saja buku dalam kategori ini?",
    "Buku terbaik di kategori ini?",
    "Buku terbaru di kategori ini?",
  ],
  general: [
    "Bagaimana cara meminjam buku?",
    "Apa saja kategori buku yang tersedia?",
    "Buku apa yang tersedia dalam bahasa Indonesia?",
  ]
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [books, setBooks] = useState<SimpleBook[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || '');

  useEffect(() => {
    // Load books when component mounts
    const loadBooks = async () => {
      try {
        const data = await fetchBooks({});
        setBooks(data);
      } catch (error) {
        console.error('Error loading books:', error);
      }
    };
    loadBooks();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findBooksByTitles = (titles: string[]): SimpleBook[] => {
    return books.filter(book => 
      titles.some(title => 
        book.title.toLowerCase().includes(title.toLowerCase())
      )
    );
  };

  const getSuggestions = (message: string) => {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('rekomendasi') || lowerMessage.includes('saran')) {
      return followUpQuestions.recommendation;
    } else if (lowerMessage.includes('kategori')) {
      return followUpQuestions.category;
    }
    return followUpQuestions.general;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);
    setSuggestions([]); // Clear suggestions when new message is sent

    try {
      // Check if the user is asking for book recommendations
      if (userMessage.toLowerCase().includes('recommend') || 
          userMessage.toLowerCase().includes('suggest') || 
          userMessage.toLowerCase().includes('book')) {
        
        // Get book recommendations
        const recommendedBooks = await fetchBooksRecommendation(3);
        
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: '## Rekomendasi Buku',
          type: 'books',
          books: recommendedBooks
        }]);
        setSuggestions(followUpQuestions.recommendation);
      } else {
        // Use Gemini for other queries
        const model = genAI.getGenerativeModel({ model: 'models/gemini-2.0-flash' });
        
        // Create a context about the available books
        const bookContext = `Answer in bahasa indonesia. You are a helpful assistant for a book platform. Here are some books available in our collection: ${books.map(b => b.title).join(', ')}. 
        Please keep your responses focused on these books and the platform. If asked about books not in this list, please mention that you can only provide information about books in our collection.
        Format your responses using markdown for better readability. Use headers, lists, and emphasis where appropriate.
        Keep your responses concise and to the point. Avoid unnecessary explanations or questions. Just provide the direct answer or information requested.`;
        
        const result = await model.generateContent([bookContext, userMessage]);
        const response = await result.response;
        const text = response.text();
        
        // Check if the response contains book titles
        const bookTitles = books.map(book => book.title);
        const mentionedBooks = bookTitles.filter(title => 
          text.toLowerCase().includes(title.toLowerCase())
        );

        if (mentionedBooks.length > 0) {
          const foundBooks = findBooksByTitles(mentionedBooks);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: text,
            type: 'books',
            books: foundBooks
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: text,
            type: 'text'
          }]);
        }
        setSuggestions(getSuggestions(userMessage));
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.',
        type: 'text'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (question: string) => {
    setInput(question);
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === 'books' && message.books) {
      return (
        <div className="space-y-4">
          <ReactMarkdown>{message.content}</ReactMarkdown>
          <div className="grid grid-cols-1 gap-3">
            {message.books.map((book) => (
              <Link 
                key={book.id} 
                href={`/collections/book/${book.id}`}
                className="block hover:opacity-90 transition-opacity"
              >
                <div className="flex gap-3 bg-card rounded-lg p-3 border">
                  <div className="relative w-16 h-24 flex-shrink-0">
                    <Image
                      src={book.image}
                      alt={book.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold truncate">{book.title}</h4>
                    <p className="text-sm text-muted-foreground truncate">{book.author}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {book.category}
                      </span>
                      {book.canBorrow && (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }
    return <ReactMarkdown>{message.content}</ReactMarkdown>;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90"
          size="icon"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      ) : (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 bg-background sm:bg-transparent">
          <div className="h-full sm:h-[600px] w-full sm:w-[400px] flex flex-col border border-border sm:rounded-lg shadow-xl bg-background">
            <div className="p-4 border-b flex justify-between items-center bg-primary/5">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Book Assistant</h3>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex gap-2 max-w-[90%]',
                      message.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                    )}
                  >
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0',
                      message.role === 'user' ? 'bg-primary' : 'bg-primary/10'
                    )}>
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className={cn(
                      'rounded-lg px-4 py-2 prose dark:prose-invert max-w-none break-words',
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}>
                      {renderMessageContent(message)}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-2 max-w-[90%] mr-auto">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="rounded-lg px-4 py-2 bg-muted">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce" />
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:0.2s]" />
                        <div className="w-2 h-2 rounded-full bg-primary/50 animate-bounce [animation-delay:0.4s]" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            <div className="p-2 border-t bg-background">
              {messages.length === 0 ? (
                <div className="mb-1">
                  <p className="text-sm text-muted-foreground mb-2">Contoh pertanyaan:</p>
                  <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                    {exampleQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs whitespace-nowrap flex-shrink-0"
                        onClick={() => handleExampleClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              ) : suggestions.length > 0 && (
                <div className="mb-1">
                  <p className="text-sm text-muted-foreground mb-2">Mungkin Anda tertarik dengan:</p>
                  <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
                    {suggestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs whitespace-nowrap flex-shrink-0"
                        onClick={() => handleExampleClick(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about books or the platform..."
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  size="icon" 
                  disabled={isLoading}
                  className="bg-primary hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 