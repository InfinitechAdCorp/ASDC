'use client'

import React, { useState } from 'react'
import useSWR from 'swr';
import { Input, Select, SelectItem, Button, Textarea, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@heroui/react"
import { Award, User, Calendar, Plus } from 'lucide-react'
import { toast } from 'react-toastify';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface User {
    id: number,
    first_name: string,
    last_name: string,
}

interface Product {
    id: number;
    name: string;
}


const IssueCertificate: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState("")
    const [certificateType, setCertificateType] = useState("")
    // const [certificateNumber, setCertificateNumber] = useState("")
    const [issueDate, setIssueDate] = useState("")
    // const [expiryDate, setExpiryDate] = useState("")
    const [additionalNotes, setAdditionalNotes] = useState("")
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isSubmitting, setIsSubmitting] = useState(false)

    const { data: users } = useSWR('/api/user/index', fetcher);
    const { data: products } = useSWR('/api/product', fetcher);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        const user_id = selectedUser;
        const type = certificateType;
        const date_issued = issueDate;

        const data = {
            user_id: Number(user_id),
            type,
            date_issued
        };

        console.log(data)

        try {
            const response = await fetch('/api/certification', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the schedule');
            }
            setSelectedUser('');
            setCertificateType('');
            setIsSubmitting(false)
            toast.success('Success');
            onOpenChange();
        } catch (error) {
            setIsSubmitting(false)
        } finally {
            setIsSubmitting(false);
        }
    };

    //     console.log(data)
    //     // Here you would typically make an API call to issue the certificate
    //     // For this example, we'll simulate an API call with a timeout
    //     setTimeout(() => {
    //         setIsSubmitting(false)
    //         onOpen() // Open success modal
    //     }, 2000)
    // }

    const isFormValid = selectedUser && certificateType && issueDate

    return (
        <>
            <Button size="md" onPress={onOpen} color="primary">
                <Plus size={16} /> Issue Certificate
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex gap-3">
                        <Award size={24} />
                        <p className="text-xl">Certificate Details</p>
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Select
                                label="Select User"
                                variant="underlined"
                                placeholder="Choose a user"
                                value={selectedUser}
                                onChange={(e) => setSelectedUser(e.target.value)}
                                startContent={<User className="text-default-400" />}
                                isRequired
                            >
                                {users?.map((user: User) => (
                                    <SelectItem key={user.id} >
                                        {`${user.first_name} ${user.last_name}`}
                                    </SelectItem>
                                ))}
                            </Select>

                            <Select
                                label="Certificate Type"
                                variant="underlined"
                                placeholder="Choose a certificate type"
                                value={certificateType}
                                onChange={(e) => setCertificateType(e.target.value)}
                                startContent={<Award className="text-default-400" />}
                                isRequired
                            >
                                {products?.map((product: Product) => (
                                    <SelectItem key={product.name} >
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </Select>

                            {/* <Input
                            label="Certificate Number"
                            variant="underlined"
                            placeholder="Enter certificate number"
                            value={certificateNumber}
                            onChange={(e) => setCertificateNumber(e.target.value)}
                            startContent={<Hash className="text-default-400" />}
                        /> */}

                            <Input
                                label="Issue Date"
                                variant="underlined"
                                type="date"
                                placeholder="Select issue date"
                                value={issueDate}
                                onChange={(e) => setIssueDate(e.target.value)}
                                startContent={<Calendar className="text-default-400" />}
                                isRequired
                            />
                            {/* <Input
                                label="Expiry Date (Optional)"
                                type="date"
                                placeholder="Select expiry date"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                                startContent={<Calendar className="text-default-400" />}
                            /> */}

                            <Textarea
                                label="Additional Notes"
                                variant="underlined"
                                placeholder="Enter any additional notes"
                                value={additionalNotes}
                                onChange={(e) => setAdditionalNotes(e.target.value)}
                                isRequired
                            />

                            <Button
                                type="submit"
                                color="primary"
                                className="w-full"
                                isDisabled={!isFormValid}
                                isLoading={isSubmitting}
                            >
                                Issue Certificate
                            </Button>
                        </form>
                    </ModalBody>
                    <ModalFooter />
                </ModalContent>
            </Modal>

            {/* <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Certificate Issued</ModalHeader>
                    <ModalBody>
                        <p>The certificate has been successfully issued to the selected user.</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal> */}
        </>
    )
}

export default IssueCertificate