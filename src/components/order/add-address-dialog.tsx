'use client'

import { useState } from 'react'
import { MapPin } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface AddAddressDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AddAddressDialog({
  open,
  onOpenChange
}: AddAddressDialogProps) {
  const [addressType, setAddressType] = useState('home')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Add your address submission logic here
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Add New Address
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Address Type</Label>
            <RadioGroup
              value={addressType}
              onValueChange={setAddressType}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="home" id="home" />
                <Label htmlFor="home">Home</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="work" id="work" />
                <Label htmlFor="work">Work</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Complete Address</Label>
            <Input id="address" placeholder="House / Flat / Block No." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark</Label>
            <Input id="landmark" placeholder="Landmark (Optional)" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Additional details about your address"
              className="resize-none"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700"
          >
            SAVE AND DELIVER HERE
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

