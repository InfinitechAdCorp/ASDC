'use client';

import React, { useState } from 'react';
import useSWR from 'swr';
import {
    useDisclosure,
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
    Tooltip,
    Pagination,
    Input,
} from "@heroui/react";
import 'photoswipe/dist/photoswipe.css';
import { Search, Trash2 } from 'lucide-react';


import IssueCertificate from './issue-certificate-modal';
import DeleteProductModal from './delete-certificate-modal';

import BlueLoading from '@/components/admin/blue-loading';
import CustomToastContainer from '@/components/admin/custom_toast_container';

interface Product {
    id: string;
    user_id: number;
    type: string;
    date_issued: string;
    user: User;
}

interface User {
    first_name: string;
    last_name: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ShopTable: React.FC = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const {
        isOpen: isDeleteOpen,
        onOpen: onDeleteOpen,
        onOpenChange: onDeleteOpenChange,
    } = useDisclosure(); // For delete modal
    const {
        data: products = [],
        error,
        mutate,
    } = useSWR<Product[]>(`/api/certification`, fetcher);

    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(
        (product) =>
            product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.type.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    const paginatedProducts = filteredProducts.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage,
    );

    const pages = Math.ceil(filteredProducts.length / rowsPerPage);

    // const handleUpdateProduct = (product: Product) => {
    //     setSelectedProduct(product);
    //     onUpdateOpen();
    // };

    if (error)
        return (
            <div>
                <BlueLoading />
            </div>
        );

    return (
        <div>
            <CustomToastContainer />
            <div className="mb-4 flex justify-between">
                <Input
                    placeholder="Search by ID or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-1/2 text-default-600"
                    startContent={<Search size={20} />}
                />
                <IssueCertificate />
            </div>
            <div className="mb-4">
                <small className="text-gray-500 dark:text-gray-300">
                    Total {filteredProducts.length} certificates
                </small>
            </div>
            <Table
                selectionMode="single"
                bottomContent={
                    <div className="flex w-full justify-center">
                        <Pagination
                            isCompact
                            showControls
                            showShadow
                            color="primary"
                            page={page}
                            total={pages}
                            onChange={(page) => setPage(page)}
                        />
                    </div>
                }
                classNames={{
                    wrapper: 'min-h-[222px]',
                }}
            >
                <TableHeader>
                    <TableColumn>USER NAME</TableColumn>
                    <TableColumn>TYPE</TableColumn>
                    <TableColumn>DATE ISSUED</TableColumn>
                    <TableColumn className="text-center">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody emptyContent={'No rows to display.'}>
                    {paginatedProducts.map((data) => (
                        <TableRow key={data.id}>
                            <TableCell>
                                {data.user ? `${data.user.first_name} ${data.user.last_name}` : "No User"}
                            </TableCell>

                            <TableCell>{data.type}</TableCell>
                            <TableCell>
                                {new Date(data.date_issued).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                }).replace(' ', '-').replace(' ', '-')}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-center space-x-2">
                                    {/* <Tooltip content="Edit user">
                                        <span
                                            onClick={() => handleUpdateProduct(data)}
                                            className="cursor-pointer text-lg text-default-400 active:opacity-50"
                                        >
                                            <FilePenLine size={20} />
                                        </span>
                                    </Tooltip> */}
                                    <Tooltip color="danger" content="Delete user certificate">
                                        <span
                                            onClick={() => {
                                                setSelectedProduct(data);
                                                onDeleteOpen();
                                            }}
                                            className="cursor-pointer text-lg text-danger active:opacity-50"
                                        >
                                            <Trash2 size={20} />
                                        </span>
                                    </Tooltip>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {selectedProduct && (
                <DeleteProductModal
                    product={selectedProduct}
                    isOpen={isDeleteOpen}
                    onClose={onDeleteOpenChange}
                    onSave={() => {
                        mutate();
                    }}
                />
            )}
        </div>
    );
};

export default ShopTable;
