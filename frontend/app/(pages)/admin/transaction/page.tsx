"use client"

import { useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { FilePlus2, FilePenLine, Trash2 } from 'lucide-react'

interface Transaction {
    id: string
    bookTitle: string
    type: "borrow" | "return"
    date: string
    dueDate?: string
    status: "on time" | "overdue" | "completed"
}

const initialTransactions: Transaction[] = [
    {
        id: "1",
        bookTitle: "The Great Gatsby",
        type: "borrow",
        date: "2023-11-01",
        dueDate: "2023-11-15",
        status: "on time",
    },
    {
        id: "2",
        bookTitle: "To Kill a Mockingbird",
        type: "return",
        date: "2023-10-25",
        status: "completed",
    },
    {
        id: "3",
        bookTitle: "1984",
        type: "borrow",
        date: "2023-10-15",
        dueDate: "2023-10-29",
        status: "overdue",
    },
]

export default function TransactionPage() {
    const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions)
    const [filter, setFilter] = useState<"all" | "borrow" | "return">("all")
    const [search, setSearch] = useState("")

    const filteredTransactions = transactions.filter(transaction => {
        const matchesFilter = filter === "all" || transaction.type === filter
        const matchesSearch = transaction.bookTitle.toLowerCase().includes(search.toLowerCase())
        return matchesFilter && matchesSearch
    })

    return (
        <div className="flex flex-col h-full">
            <div className="space-y-6 mb-6">
                <h1 className="text-3xl font-bold">Transaction Management</h1>
                <div className="flex flex-row justify-center items-end gap-4">
                    <div className="flex-1">
                        <Label htmlFor="search">Search</Label>
                        <Input
                            id="search"
                            placeholder="Search by book title"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div>
                        <Label htmlFor="filter">Filter</Label>
                        <Select value={filter} onValueChange={(value: "all" | "borrow" | "return") => setFilter(value)}>
                            <SelectTrigger id="filter" className="w-[180px]">
                                <SelectValue placeholder="Filter transactions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Transactions</SelectItem>
                                <SelectItem value="borrow">Borrows</SelectItem>
                                <SelectItem value="return">Returns</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Button id="addBook">
                            <FilePlus2 />
                        </Button>
                    </div>
                </div>
            </div>
            <div className="flex-grow overflow-auto border rounded-md">
                <ScrollArea className="h-full w-full">
                    <div className="w-full min-w-max">
                        <Table>
                            <TableCaption>A list of recent transactions.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">Book Title</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Due Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-center">Option</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTransactions.map((transaction) => (
                                    <TableRow key={transaction.id}>
                                        <TableCell className="font-medium">{transaction.bookTitle}</TableCell>
                                        <TableCell>{transaction.type}</TableCell>
                                        <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            {transaction.dueDate
                                                ? new Date(transaction.dueDate).toLocaleDateString()
                                                : "-"}
                                        </TableCell>
                                        <TableCell>
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${transaction.status === "on time" ? "bg-green-100 text-green-800" :
                                                    transaction.status === "overdue" ? "bg-red-100 text-red-800" :
                                                        "bg-blue-100 text-blue-800"
                                                }`}>
                                                {transaction.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <Button variant="ghost" size="icon">
                                                <FilePenLine className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>
            </div>
            {filteredTransactions.length === 0 && (
                <p className="text-center text-muted-foreground mt-4">No transactions found.</p>
            )}
        </div>
    )
}
