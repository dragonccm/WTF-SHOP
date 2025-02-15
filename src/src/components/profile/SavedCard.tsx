"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Wifi, Plus, Pencil, Trash } from 'lucide-react'

interface CreditCard {
  id: string
  number: string
  expiry: string
  name: string
  color: string
}

const cards: CreditCard[] = [
  {
    id: "1",
    number: "5322256410111202",
    expiry: "12/26",
    name: "NATHANIEL ELLIS",
    color: "bg-gray-950"
  },
  {
    id: "2",
    number: "5322256410111234",
    expiry: "2/28",
    name: "MIKE JONATHAN",
    color: "bg-gray-400"
  },
  {
    id: "3",
    number: "5322256410114528",
    expiry: "10/25",
    name: "JOHN KATHRYN",
    color: "bg-sky-300"
  }
]

export default function SavedCard() {
  const formatCardNumber = (number: string) => {
    return `${number.slice(-4)}`
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <Card 
            key={card.id} 
            className={`relative p-6 ${card.color} text-white group hover:shadow-lg transition-all duration-300`}
          >
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:bg-black/40">
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-white hover:bg-white/20">
                  <Trash className="h-4 w-4" />
                  <span className="sr-only">Delete</span>
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-start mb-8">
              <div className="w-12 h-8 bg-yellow-400 rounded"></div>
              <Wifi className="h-6 w-6" />
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm">AC No.</p>
                <p className="font-mono">****  ****  ****  {formatCardNumber(card.number)}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-sm">Exp.</p>
                  <p>{card.expiry}</p>
                </div>
                <div>
                  <p className="text-sm">CVV</p>
                  <p>***</p>
                </div>
              </div>
              <p className="font-semibold tracking-wider">{card.name}</p>
            </div>
          </Card>
        ))}
        
        <Card className="flex flex-col items-center justify-center p-6 bg-gray-200 cursor-pointer hover:bg-gray-300 transition-colors min-h-[250px]">
          <Plus className="h-8 w-8 text-gray-600 mb-2" />
          <p className="text-gray-600 font-medium">Add New Card</p>
        </Card>
      </div>
    </div>
  )
}

