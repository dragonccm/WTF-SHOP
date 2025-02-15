import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

const Help = () => {
    return (
        <Card>
            <div className="container mx-auto px-4 py-12">
                <h1 className="text-4xl font-bold text-center  mb-12">
                    Frequently Asked Questions
                </h1>
                <div className="grid lg:grid-rows-2 gap-8 items-start">
                    <div className="relative w-full h-full flex justify-center items-center">
                        <Image
                            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GIBERJRj7epG7CpZTUcLSnVBDurbcD.png"
                            alt="FAQ illustration"
                            layout="fill"
                            objectFit="contain"
                            className="max-w-full max-h-full"
                        />
                    </div>
                    <div className="space-y-4">
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="track-order">
                                <AccordionTrigger className="text-lg ">
                                    I want to track my order
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    To track your order, you will need to have the tracking number or order ID provided by the seller or shipping carrier. Once you have this information, you can usually track your order online by visiting the carrier's website and entering the tracking number or order ID in the designated tracking field.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="manage-order">
                                <AccordionTrigger className="text-lg ">
                                    I want to manage my order
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    You can manage your order through your account dashboard. This includes viewing order details, updating shipping information, and more.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="cashback">
                                <AccordionTrigger className="text-lg ">
                                    I did not receive Instant Cashback
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    If you haven't received your cashback, please check if your transaction meets the eligibility criteria. Contact our support team with your order details for assistance.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="wallet-payment">
                                <AccordionTrigger className="text-lg ">
                                    I am unable to pay using wallet
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    If you're experiencing issues with wallet payments, ensure your wallet has sufficient balance and try refreshing the page. If the problem persists, contact our support team.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="returns">
                                <AccordionTrigger className="text-lg ">
                                    I want help with returns & refunds
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600">
                                    Our returns and refunds process is simple. Visit the returns section in your account, select the item you wish to return, and follow the instructions provided.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default Help;
