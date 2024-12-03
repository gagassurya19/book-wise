"use client"

import * as React from "react"
import {
  BookOpen,
  Command,
  Frame,
  HelpCircle,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
  UserPen,
  BriefcaseBusiness,
  MonitorSmartphone,
  Cpu,
  Piano
} from "lucide-react"

import { NavMain } from "@/components/user-page/nav-main"
import { NavProjects } from "@/components/user-page/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "../ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { appInfo, assets } from "@/app/config"
import Link from "next/link"
import { NavNonBook } from "./nav-nonbook"
import { useEffect, useState } from "react"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navBook: [
    {
      title: "Pengembangan Diri",
      url: "/collections?category=Pengembangan Diri",
      icon: UserPen, // ganti sesuai kebutuhan
      isActive: true,
      items: [
        {
          title: "Analisis Tulisan Tangan",
          url: "/collections?category=Pengembangan Diri&subcategory=Analisis Tulisan Tangan",
        },
        {
          title: "Emosi",
          url: "/collections?category=Pengembangan Diri&subcategory=Emosi",
        },
        {
          title: "Journaling",
          url: "/collections?category=Pengembangan Diri&subcategory=Journaling",
        },
        {
          title: "Komunikasi & Keterampilan Sosial",
          url: "/collections?category=Pengembangan Diri&subcategory=Komunikasi & Keterampilan Sosial",
        },
        {
          title: "Motivasi & Inspiratif",
          url: "/collections?category=Pengembangan Diri&subcategory=Motivasi & Inspiratif",
        },
      ],
    },
    {
      title: "Bisnis",
      url: "/collections?category=Bisnis",
      icon: BriefcaseBusiness, // ganti sesuai kebutuhan
      items: [
        {
          title: "Akuntansi",
          url: "/collections?category=Bisnis&subcategory=Akuntansi",
        },
        {
          title: "Asuransi",
          url: "/collections?category=Bisnis&subcategory=Asuransi",
        },
        {
          title: "Bank & Perbankan",
          url: "/collections?category=Bisnis&subcategory=Bank & Perbankan",
        },
        {
          title: "E-Commerce",
          url: "/collections?category=Bisnis&subcategory=E-Commerce",
        },
        {
          title: "Ekonomi",
          url: "/collections?category=Bisnis&subcategory=Ekonomi",
        },
      ],
    },
    {
      title: "Komputer",
      url: "/collections?category=Komputer",
      icon: MonitorSmartphone, // ganti sesuai kebutuhan
      items: [
        {
          title: "Aplikasi Bisnis & Produktivitas",
          url: "/collections?category=Komputer&subcategory=Aplikasi Bisnis & Produktivitas",
        },
        {
          title: "Database Administrasi & Manajemen",
          url: "/collections?category=Komputer&subcategory=Database Administrasi & Manajemen",
        },
        {
          title: "Desain, Grafik & Media",
          url: "/collections?category=Komputer&subcategory=Desain, Grafik & Media",
        },
        {
          title: "Internet",
          url: "/collections?category=Komputer&subcategory=Internet",
        },
        {
          title: "Pemrograman",
          url: "/collections?category=Komputer&subcategory=Pemrograman",
        },
      ],
    },
    {
      title: "Teknologi",
      url: "/collections?category=Teknologi",
      icon: Cpu, // ganti sesuai kebutuhan
      items: [
        {
          title: "Teknik Elektro",
          url: "/collections?category=Teknologi&subcategory=Teknik Elektro",
        },
        {
          title: "Teknologi Informasi",
          url: "/collections?category=Teknologi&subcategory=Teknologi Informasi",
        },
        {
          title: "Robotik",
          url: "/collections?category=Teknologi&subcategory=Robotik",
        },
        {
          title: "Kecerdasan Buatan",
          url: "/collections?category=Teknologi&subcategory=Kecerdasan Buatan",
        },
        {
          title: "Jaringan Komputer",
          url: "/collections?category=Teknologi&subcategory=Jaringan Komputer",
        },
      ],
    },
    {
      title: "Musik",
      url: "/collections?category=Musik",
      icon: Piano, // ganti sesuai kebutuhan
      items: [
        {
          title: "Alat Musik",
          url: "/collections?category=Musik&subcategory=Alat Musik",
        },
        {
          title: "Dance",
          url: "/collections?category=Musik&subcategory=Dance",
        },
        {
          title: "Instruksi & Studi",
          url: "/collections?category=Musik&subcategory=Instruksi & Studi",
        },
        {
          title: "Musik Klasik",
          url: "/collections?category=Musik&subcategory=Musik Klasik",
        },
        {
          title: "Komposisi Musik",
          url: "/collections?category=Musik&subcategory=Komposisi Musik",
        },
      ],
    },
  ],
  navEBook: [
    {
      title: "Komputer",
      url: "/collections?kind=ebook&category=Komputer",
      icon: MonitorSmartphone, // ganti sesuai kebutuhan
      items: [
        {
          title: "Aplikasi Bisnis & Produktivitas",
          url: "/collections?kind=ebook&category=Komputer&subcategory=Aplikasi Bisnis & Produktivitas",
        },
        {
          title: "Database Administrasi & Manajemen",
          url: "/collections?kind=ebook&category=Komputer&subcategory=Database Administrasi & Manajemen",
        },
        {
          title: "Desain, Grafik & Media",
          url: "/collections?kind=ebook&category=Komputer&subcategory=Desain, Grafik & Media",
        },
        {
          title: "Internet",
          url: "/collections?kind=ebook&category=Komputer&subcategory=Internet",
        },
        {
          title: "Pemrograman",
          url: "/collections?kind=ebook&category=Komputer&subcategory=Pemrograman",
        },
      ],
    },
    {
      title: "Teknologi",
      url: "/collections?kind=ebook&category=Teknologi",
      icon: Cpu, // ganti sesuai kebutuhan
      items: [
        {
          title: "Teknik Elektro",
          url: "/collections?kind=ebook&category=Teknologi&subcategory=Teknik Elektro",
        },
        {
          title: "Teknologi Informasi",
          url: "/collections?kind=ebook&category=Teknologi&subcategory=Teknologi Informasi",
        },
        {
          title: "Robotik",
          url: "/collections?kind=ebook&category=Teknologi&subcategory=Robotik",
        },
        {
          title: "Kecerdasan Buatan",
          url: "/collections?kind=ebook&category=Teknologi&subcategory=Kecerdasan Buatan",
        },
        {
          title: "Jaringan Komputer",
          url: "/collections?kind=ebook&category=Teknologi&subcategory=Jaringan Komputer",
        },
      ],
    },
    {
      title: "Musik",
      url: "/collections?kind=ebook&category=Musik",
      icon: Piano, // ganti sesuai kebutuhan
      items: [
        {
          title: "Alat Musik",
          url: "/collections?kind=ebook&category=Musik&subcategory=Alat Musik",
        },
        {
          title: "Dance",
          url: "/collections?kind=ebook&category=Musik&subcategory=Dance",
        },
        {
          title: "Instruksi & Studi",
          url: "/collections?kind=ebook&category=Musik&subcategory=Instruksi & Studi",
        },
        {
          title: "Musik Klasik",
          url: "/collections?kind=ebook&category=Musik&subcategory=Musik Klasik",
        },
        {
          title: "Komposisi Musik",
          url: "/collections?kind=ebook&category=Musik&subcategory=Komposisi Musik",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
  navNonBook: [
    2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017
  ]
}

export default function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="sidebar" {...props}>
      <SidebarHeader className='bg-white'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg">
                  <img
                    src={assets.logoUrl}
                    className="w-8"
                    alt="logo"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{appInfo.appName}</span>
                  <span className="truncate text-xs">{appInfo.tagLine}</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        {/* <Tabs defaultValue="book" className="w-full mt-3">
          <TabsList className="mx-auto flex items-center w-fit rounded-full gap-2 p-2 h-10">
            <TabsTrigger value="book" className="rounded-full">Book</TabsTrigger>
            <TabsTrigger value="non-book" className="rounded-full">Non Book</TabsTrigger>
          </TabsList>
          <TabsContent value="book">
            <NavMain kind="Buku" items={data.navBook} />
            <NavMain kind="E-Book" items={data.navEBook} />

          </TabsContent>
          <TabsContent value="non-book">
            <NavNonBook kind="Journal" items={data.navNonBook} />
          </TabsContent>
        </Tabs> */}
        <TabsComponent data={data}/>
      </SidebarContent>

      <SidebarFooter className="border-t p-4 bg-white">
        <div className="rounded-lg bg-gray-100 p-4">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-white p-2">
              <HelpCircle className="h-6 w-6 text-teal-500" />
            </div>
            <div>
              <h4 className="font-semibold">Need help?</h4>
              <p className="text-sm text-gray-500">Contact our helpdesk</p>
            </div>
          </div>
          <Link href="/contact">
            <Button variant="outline" className="mt-4 w-full font-semibold">
              CONTACT
            </Button>
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}



function TabsComponent({ data }: { data: any }) {
  const [activeTab, setActiveTab] = useState<string>("book");
  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className="w-full mt-3"
    >
      <TabsList className="mx-auto flex items-center w-fit rounded-full gap-2 p-2 h-10">
        <TabsTrigger value="book" className="rounded-full">Book</TabsTrigger>
        <TabsTrigger value="non-book" className="rounded-full">Non Book</TabsTrigger>
      </TabsList>
      <TabsContent value="book">
        <NavMain kind="Buku" items={data.navBook} />
        <NavMain kind="E-Book" items={data.navEBook} />
      </TabsContent>
      <TabsContent value="non-book">
        <NavNonBook kind="Journal" items={data.navNonBook} />
        <NavProjects projects={data.projects} />
      </TabsContent>
    </Tabs>
  );
}
