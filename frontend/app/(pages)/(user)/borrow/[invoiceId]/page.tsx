'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Download, Loader2 } from 'lucide-react'
import { useAuthGuard } from '@/common/tokenizer'

interface InvoiceItem {
    id: number
    title: string
    author: string
    fee: number
}

interface Invoice {
    id: string
    date: string
    dueDate: string
    status: 'pending' | 'paid' | 'overdue'
    items: InvoiceItem[]
}

const invoiceData: Invoice = {
    id: 'INV-2023-001',
    date: '2023-05-01',
    dueDate: '2023-05-15',
    status: 'paid',
    items: [
        { id: 1, title: 'Introduction to React', author: 'Jane Doe', fee: 5.99 },
        { id: 2, title: 'Advanced TypeScript', author: 'John Smith', fee: 5.99 },
        { id: 3, title: 'Node.js Fundamentals', author: 'Alice Johnson', fee: 5.99 },
    ],
}

export default function InvoicePage() {
    const [invoice] = useState<Invoice>(invoiceData)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const totalAmount = invoice.items.reduce((sum, item) => sum + item.fee, 0)

    useEffect(() => {
        setIsDialogOpen(true)
    }, []);

    const { isLoading } = useAuthGuard();
    if (isLoading) {
        return (
        <div className="flex items-center justify-center h-screen">
            <p>Loading...</p>
        </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-4xl mx-auto">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-2xl font-bold">Invoice</CardTitle>
                    <Badge
                        variant={invoice.status === 'paid' ? 'default' : invoice.status === 'overdue' ? 'destructive' : 'secondary'}
                    >
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                            <p className="text-sm font-medium">Invoice Number</p>
                            <p className="text-lg">{invoice.id}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Date Issued</p>
                            <p className="text-lg">{invoice.date}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium">Due Date</p>
                            <p className="text-lg">{invoice.dueDate}</p>
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
                            {invoice.items.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell className="font-medium">{item.title}</TableCell>
                                    <TableCell>{item.author}</TableCell>
                                    <TableCell className="text-right">${item.fee.toFixed(2)}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2} className="font-bold">Total</TableCell>
                                <TableCell className="text-right font-bold">${totalAmount.toFixed(2)}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                    {/* <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button> */}
                    <Button>Contact Admin</Button>
                </CardFooter>
            </Card>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invoice Processing</DialogTitle>
                        <DialogDescription>
                            <div className="flex items-center space-x-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Your invoice is still being processed. Please check back later.</span>
                            </div>
                        </DialogDescription>
                    </DialogHeader>
                    {/* <div className="flex items-start space-x-2 bg-muted p-3 rounded-md">
            <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5" />
            <p className="text-sm text-muted-foreground">
              The download will be available once the invoice has been fully processed and marked as paid.
            </p>
          </div> */}
                    <Button onClick={() => setIsDialogOpen(false)}>Close</Button>
                </DialogContent>
            </Dialog>
        </div>
    )
}

