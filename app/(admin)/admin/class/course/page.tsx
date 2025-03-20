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
  Image,
  Input,
  Button,
} from "@heroui/react";
import 'photoswipe/dist/photoswipe.css';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { FilePenLine, Plus, Search, Trash2 } from 'lucide-react';


import UpdateProductModal from './update-product-modal';
import DeleteProductModal from './delete-product-modal';
import CreateProductModal from './create-product-modal';

import BlueLoading from '@/components/admin/blue-loading';
import CustomToastContainer from '@/components/admin/custom_toast_container';

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  image: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ShopTable: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isUpdateOpen,
    onOpen: onUpdateOpen,
    onOpenChange: onUpdateOpenChange,
  } = useDisclosure(); // For update modal
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure(); // For delete modal
  const {
    data: products = [],
    error,
    mutate,
  } = useSWR<Product[]>(`/api/product`, fetcher);

  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage,
  );

  const pages = Math.ceil(filteredProducts.length / rowsPerPage);

  const handleUpdateProduct = (product: Product) => {
    setSelectedProduct(product);
    onUpdateOpen();
  };

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
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 text-default-600"
          startContent={<Search size={20} />}
        />
        <Button size="md" onPress={onOpen} color="primary">
          <Plus size={16} /> New Product
        </Button>
      </div>
      <div className="mb-4">
        <small className="text-gray-500 dark:text-gray-300">
          Total {filteredProducts.length} products
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
          <TableColumn>NAME</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>CATEGORY</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn className="text-center">ACTIONS</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No rows to display.'}>
          {paginatedProducts.map((data) => (
            <TableRow key={data.id}>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Gallery withDownloadButton>
                    <Item original={data.image} height="500" width="500">
                      {({ ref, open }) => (
                        <Image
                          ref={ref}
                          onClick={open}
                          src={data.image}
                          alt="Product Image"
                          width={35}
                          height={35}
                          className="cursor-pointer object-cover"
                        />
                      )}
                    </Item>
                  </Gallery>
                  <div>
                    <p className="font-semibold">{data.name}</p>
                    <small className="text-gray-600">
                      Product # : {data.id}
                    </small>
                  </div>
                </div>
              </TableCell>
              <TableCell>{data.description}</TableCell>
              <TableCell>{data.category}</TableCell>
              <TableCell>
                {' '}
                ₱
                {Intl.NumberFormat('en-PH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(data.price)}
              </TableCell>
              <TableCell>
                <div className="flex justify-center space-x-2">
                  <Tooltip content="Edit user">
                    <span
                      onClick={() => handleUpdateProduct(data)}
                      className="cursor-pointer text-lg text-default-400 active:opacity-50"
                    >
                      <FilePenLine size={20} />
                    </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Delete product">
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
      <CreateProductModal isOpen={isOpen} onClose={onOpenChange} />
      {selectedProduct && (
        <UpdateProductModal
          product={selectedProduct}
          isOpen={isUpdateOpen}
          onClose={onUpdateOpenChange}
          onSave={() => {
            mutate();
          }}
        />
      )}
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
