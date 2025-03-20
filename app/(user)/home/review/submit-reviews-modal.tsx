import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  Link,
} from "@heroui/react";
import { toast } from 'react-hot-toast';

export default function SubmitReviewsModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [fullname, setFullname] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async () => {
    if (!fullname.trim() || !title.trim() || !body.trim()) {
      toast.error('All fields are required.');

      return;
    }

    try {
      const formData = {
        fullname,
        title,
        body,
      };

      const response = await fetch('/api/testimonial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Testimonial submitted successfully');
        onOpenChange();
        setFullname('');
        setTitle('');
        // setRating(0)
        setBody('');
        toast.success(
          'Your review means a lot to us! Thank you for taking the time.',
          {
            style: {
              maxWidth: 600,
            },
          },
        );
      } else {
        console.error('Error submitting testimonial');
      }
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <Button
        onPress={onOpen}
        color="primary"
        variant="shadow"
      >
        Write a Testimonial
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
        backdrop="blur"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Write a Testimonial
              </ModalHeader>
              <ModalBody>
                <Input
                  label="Name"
                  variant="underlined"
                  placeholder="Enter your name"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
                {/* Rating section */}
                {/* <div>
                                    <span className="block text-sm font-medium text-gray-700 mb-1">Rating</span>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Fish
                                                key={star}
                                                className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </div>
                                </div> */}
                <Input
                  label="Title"
                  variant="underlined"
                  placeholder="Write your title here"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  label="Testimonial"
                  variant="underlined"
                  placeholder="Write your testimonial here"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleSubmit}>
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
