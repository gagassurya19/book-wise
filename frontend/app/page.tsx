import React from 'react';

import { Star } from 'lucide-react';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from "@/components/ui/button"
import { assets } from './config';
import Navbar from '@/components/navbar-user';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center">
      <Hero />
      <Features />
      <Hero2 />
      <Aboutus />
      <Contact />
    </div>
    <Footer/>
    </>
  );
}

const Hero = () => {
  return (

    <section
      className="h-screen flex items-center justify-center w-full"
      style={{
        backgroundImage: `url(${assets.bgHero})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container text-center">
        <div className="mx-auto flex max-w-screen-lg flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">
            Selamat Datang
          </h1>
          <p className="text-balance text-muted-foreground lg:text-lg">
          Finely crafted with love and hate. Give us ayam geprek <span className='underline'>paha atas</span>, and we’ll change the world!
          </p>
        </div>
        <Button size="lg" className="mt-10">
          <Link href="/register">
            Register to discover all books
          </Link>
        </Button>
        <div className="mx-auto mt-10 flex w-fit flex-col items-center gap-4 sm:flex-row">
          <span className="mx-4 inline-flex items-center -space-x-4">
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-1.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-2.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-3.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-4.webp"
                alt="placeholder"
              />
            </Avatar>
            <Avatar className="size-14 border">
              <AvatarImage
                src="https://www.shadcnblocks.com/images/block/avatar-5.webp"
                alt="placeholder"
              />
            </Avatar>
          </span>
          <div>
            <div className="flex items-center gap-1">
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <Star className="size-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">5.0</span>
            </div>
            <p className="text-left font-medium text-muted-foreground">
              from 200+ reviews
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

import {
  DollarSign,
  MessagesSquare,
  PersonStanding,
  Timer,
  Zap,
  ZoomIn,
} from 'lucide-react';

const features = [
  {
    title: 'Performance',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <Timer className="size-4 md:size-6" />,
  },
  {
    title: 'Innovation',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <Zap className="size-4 md:size-6" />,
  },
  {
    title: 'Quality',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <ZoomIn className="size-4 md:size-6" />,
  },
  {
    title: 'Accessibility',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <PersonStanding className="size-4 md:size-6" />,
  },
  {
    title: 'Affordability',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <DollarSign className="size-4 md:size-6" />,
  },
  {
    title: 'Customer Support',
    description:
      'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt, accusantium quam. Temporibus quae quos deserunt!',
    icon: <MessagesSquare className="size-4 md:size-6" />,
  },
];

const Features = () => {
  return (
    <section className="py-32">
      <div className="container mx-auto max-w-screen-xl">
        <p className="mb-4 text-xs text-muted-foreground md:pl-5">Features</p>
        <h2 className="text-3xl font-medium md:pl-5 lg:text-4xl">
          Our Core Features
        </h2>
        <div className="mx-auto mt-14 grid gap-x-20 gap-y-8 md:grid-cols-2 md:gap-y-6 lg:mt-20">
          {features.map((feature, idx) => (
            <div className="flex gap-6 rounded-lg md:block md:p-5" key={idx}>
              <span className="mb-8 flex size-10 shrink-0 items-center justify-center rounded-full bg-accent md:size-12">
                {feature.icon}
              </span>
              <div>
                <h3 className="font-medium md:mb-2 md:text-xl">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { ArrowDownRight } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

const Hero2 = () => {
  return (
    <section className="py-32">
      <div className="container">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              New Release
              <ArrowDownRight className="ml-2 size-4" />
            </Badge>
            <h1 className="my-6 text-pretty text-4xl font-bold lg:text-6xl">
              Welcome to Our Website
            </h1>
            <p className="mb-8 max-w-xl text-muted-foreground lg:text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig
              doloremque mollitia fugiat omnis! Porro facilis quo animi
              consequatur. Explicabo.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button className="w-full sm:w-auto">Primary Button</Button>
              <Button variant="outline" className="w-full sm:w-auto">
                Secondary Button
                <ArrowDownRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <img
            src="https://www.shadcnblocks.com/images/block/placeholder-1.svg"
            alt="placeholder hero"
            className="max-h-96 w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
};

import { Mail, MapPin, Phone } from 'lucide-react'

const Contact = () => {
  return (
    <section className='py-32'>
      <div className='container'>
        <div className='mb-14'>
          <span className='text-sm font-semibold'>Reach Us</span>
          <h1 className='mb-3 mt-1 text-balance text-3xl font-semibold md:text-4xl'>
            Speak with Our Friendly Team
          </h1>
          <p className='text-lg text-muted-foreground'>
            We&apos;d love to assist you. Fill out the form or drop
            us an email.
          </p>
        </div>
        <div className='grid gap-10 md:grid-cols-3'>
          <div>
            <span className='mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent'>
              <Mail className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Email Us</p>
            <p className='mb-3 text-muted-foreground'>
              Our team is ready to assist.
            </p>
            <a href='#' className='font-semibold hover:underline'>
              abc@example.com
            </a>
          </div>
          <div>
            <span className='mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent'>
              <MapPin className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'>Visit Us</p>
            <p className='mb-3 text-muted-foreground'>
              Drop by our office for a chat.
            </p>
            <a href='#' className='font-semibold hover:underline'>
              1234 Street Name, City Name
            </a>
          </div>
          <div>
            <span className='mb-3 flex size-12 flex-col items-center justify-center rounded-full bg-accent'>
              <Phone className='h-6 w-auto' />
            </span>
            <p className='mb-2 text-lg font-semibold'> Call Us</p>
            <p className='mb-3 text-muted-foreground'>
              We&apos;re available Mon-Fri, 9am-5pm.
            </p>
            <a href='#' className='font-semibold hover:underline'>
              +123 456 7890
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

import { AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

const people = [
  {
    id: "1301223164",
    name: "Gagas Surya Laksana",
    role: "Frontend",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
    image: "/teams/gagas.jpeg",
  },
  {
    id: "1301223240",
    name: "Maulana Cahya Magista",
    role: "Frontend",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
    image: "/teams/magista.jpeg",
  },
  {
    id: "1301223219",
    name: "M. Rafi Raihan Akbar",
    role: "Database",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-6.webp",
    image: "/teams/akbar.jpeg",
  },
  {
    id: "1301223102",
    name: "Zuhair Nashif A.",
    role: "Backend",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-2.webp",
    image: "/teams/nashif.jpeg",
  },
  {
    id: "1301223292",
    name: "Azrian Risqi Radhitya",
    role: "Backend",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-6.webp",
    image: "/teams/azrian.jpeg",
  },
  {
    id: "1301223129",
    name: "Yustinus Dwi Adyra",
    role: "Backend",
    avatar: "https://www.shadcnblocks.com/images/block/avatar-5.webp",
    image: "/teams/azrian.jpeg",
  },

];

const Aboutus = () => {
  return (
    <section
      id="aboutus"
      className="min-h-screen py-24"
    >
      <div className="flex flex-col items-center text-center">
        <h2 className="my-6 text-pretty text-2xl font-bold lg:text-4xl">
          Meet our team
        </h2>
        <p className="mb-8 max-w-3xl text-muted-foreground lg:text-xl">
          We are a passionate team dedicated to revolutionizing the way people interact with technology.
          Our project aims to create intuitive, accessible, and powerful tools that empower users to achieve more.
        </p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {people.map((person) => (
          <div key={person.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={person.avatar} />
              <AvatarFallback>{person.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{person.name}</p>
            <p className="text-center text-muted-foreground">{person.role}</p>
            <p className="text-center text-muted-foreground">{person.id}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
