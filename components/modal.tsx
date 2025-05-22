"use client";

import React, { ReactNode } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import { useModal } from "@/providers/modal-provider";

type Props = {
    title: string;
    subHeading?: string;
    children: ReactNode;
    defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subHeading = "", title }: Props) => {
    const { isOpen, setClose } = useModal();

    return (
        <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
            <DialogContent className="overflow-auto md:max-h-[700px] h-fit">
                <DialogHeader >
                    <DialogTitle className="text-2xl text-center font-bold">{title}</DialogTitle>
                    <DialogDescription>{subHeading}</DialogDescription>
                    {children}
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
};

export default CustomModal;
