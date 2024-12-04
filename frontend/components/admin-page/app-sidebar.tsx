"use client"

import * as React from "react"
import { CalendarSearch, LibraryBig, LayoutDashboard, UserRound, Cog } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NavUser } from "@/components/admin-page/nav-user"
import { Label } from "@/components/ui/label"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarInput,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { assets } from "@/app/config"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

const data = {
    user: {
        name: "admin",
        email: "admin@admin.com",
        avatar: `https://api.dicebear.com/6.x/initials/svg?seed=admin`,
    },
    navMain: [
        {
            title: "Dashboard",
            url: "/admin",
            icon: LayoutDashboard,
            isActive: true,
        },
        {
            title: "Book",
            url: "/admin/book",
            icon: LibraryBig,
            isActive: false,
        },
        {
            title: "User",
            url: "/admin/user",
            icon: UserRound,
            isActive: false,
        },
        {
            title: "Transaction",
            url: "/admin/transaction",
            icon: CalendarSearch,
            isActive: false,
        },
        {
            title: "Settings",
            url: "/admin/settings",
            icon: Cog,
            isActive: false,
        },
    ],
}

const dataNeedApproval = [
    {
        name: "Emily Davis",
        phone_number: "0812346789",
        invoice_code: "INV-2023-001",
        date: "2023-05-01",
        dueDate: "2023-05-15",
        status: "pending",
        items: [
            { id: 1, title: "Introduction to React", author: "Jane Doe", fee: 5.99 },
            { id: 2, title: "Advanced TypeScript", author: "John Smith", fee: 5.99 },
            { id: 3, title: "Node.js Fundamentals", author: "Alice Johnson", fee: 5.99 },
        ],
    },
    {
        name: "William Smith",
        phone_number: "0815671234",
        invoice_code: "INV-2023-002",
        date: "2023-06-01",
        dueDate: "2023-06-15",
        status: "pending",
        items: [
            { id: 1, title: "JavaScript Essentials", author: "Robert Brown", fee: 8.99 },
            { id: 2, title: "Modern CSS", author: "Emily White", fee: 7.49 },
        ],
    },
    {
        name: "Alice Johnson",
        phone_number: "0812987654",
        invoice_code: "INV-2023-003",
        date: "2023-07-01",
        dueDate: "2023-07-15",
        status: "pending",
        items: [
            { id: 1, title: "Python for Beginners", author: "Charles Gray", fee: 6.99 },
            { id: 2, title: "Data Science with Python", author: "Laura Green", fee: 9.99 },
            { id: 3, title: "Machine Learning Basics", author: "Kevin Lee", fee: 10.99 },
        ],
    },
    {
        name: "Bob Johnson",
        phone_number: "0813579246",
        invoice_code: "INV-2023-004",
        date: "2023-08-01",
        dueDate: "2023-08-15",
        status: "pending",
        items: [
            { id: 1, title: "Introduction to Databases", author: "Susan Blue", fee: 7.99 },
            { id: 2, title: "SQL Queries for Beginners", author: "Peter Parker", fee: 6.49 },
        ],
    },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const [activeItem, setActiveItem] = React.useState(data.navMain[0])
    const [searchQuery, setSearchQuery] = React.useState("")
    const [filteredData, setFilteredData] = React.useState(dataNeedApproval)

    React.useEffect(() => {
        const filtered = dataNeedApproval.filter((item) =>
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.phone_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.invoice_code.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setFilteredData(filtered)
    }, [searchQuery])

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            {...props}
        >
            <Sidebar
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <a href="/admin">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                                        <img src={assets.logoUrl} className="w-8" alt="logo" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Book Wise</span>
                                        <span className="truncate text-xs">Admin Dashboard</span>
                                    </div>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {data.navMain.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <Link href={item.url} className="flex items-center space-x-2">
                                            <SidebarMenuButton
                                                tooltip={{
                                                    children: item.title,
                                                    hidden: false,
                                                }}
                                                onClick={() => setActiveItem(item)}
                                                isActive={activeItem.title === item.title}
                                                className="px-2.5 md:px-2"
                                            >
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </SidebarMenuButton>
                                        </Link>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            </Sidebar>

            <Sidebar collapsible="none" className="hidden flex-1 md:flex">
                <SidebarHeader className="gap-3.5 border-b p-4">
                    <div className="flex w-full items-center justify-between">
                        <div className="text-base font-medium text-foreground">
                            Pending Approval
                        </div>
                        <Label className="flex items-center gap-2 text-sm">
                            {filteredData.length != 0 && (
                                <span className="w-6 h-6 rounded-full bg-[#E02954] text-primary-foreground text-xs flex items-center justify-center">
                                    {filteredData.length > 9 ? "10+" : filteredData.length}
                                </span>
                            )}
                        </Label>
                    </div>
                    <SidebarInput
                        placeholder="Type to search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup className="px-0">
                        <SidebarGroupContent>
                            {filteredData.map((item) => (
                                <Dialog key={item.invoice_code}>
                                    <DialogTrigger asChild>
                                        <button className="flex w-full flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                                            <div className="flex w-full items-center gap-2">
                                                <span className="font-medium">{item.invoice_code}</span>
                                                <span className="ml-auto text-xs">{item.date}</span>
                                            </div>
                                            <div className="text-xs">Nama: {item.name}</div>
                                            <span className="text-xs">Phone: {item.phone_number}</span>
                                        </button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Transaction Details</DialogTitle>
                                        </DialogHeader>
                                        <Card className="w-full max-w-4xl mx-auto">
                                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                                <CardTitle className="text-2xl font-bold">Invoice</CardTitle>
                                                <Badge
                                                    variant={item.status === 'paid' ? 'default' : item.status === 'overdue' ? 'destructive' : 'secondary'}
                                                >
                                                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                                                </Badge>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="grid grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <p className="text-sm font-medium">Invoice Number</p>
                                                        <p className="text-lg">{item.invoice_code}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Date Issued</p>
                                                        <p className="text-lg">{item.date}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium">Due Date</p>
                                                        <p className="text-lg">{item.dueDate}</p>
                                                    </div>
                                                </div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>Item</TableHead>
                                                            <TableHead>Author</TableHead>
                                                            <TableHead className="text-right">Amount</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {item.items.map((item) => (
                                                            <TableRow key={item.id}>
                                                                <TableCell className="font-medium">{item.title}</TableCell>
                                                                <TableCell>{item.author}</TableCell>
                                                                <TableCell className="text-right">${item.fee.toFixed(2)}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                        <TableRow>
                                                            <TableCell colSpan={2} className="font-bold">Total</TableCell>
                                                            <TableCell className="text-right font-bold">${item.items.reduce((sum, item) => sum + item.fee, 0)}</TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </CardContent>
                                            <CardFooter className="flex justify-between">
                                                {/* <Button variant="outline" onClick={handleDownload}>
                                                    <Download className="mr-2 h-4 w-4" />
                                                    Download Invoice
                                                </Button> */}
                                                {/* <Button>Contact Admin</Button> */}
                                            </CardFooter>
                                        </Card>
                                        <DialogFooter>
                                            <Button variant="secondary">Decline</Button>
                                            <Button>Approve</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ))}
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </Sidebar>
        </Sidebar>
    )
}
