import { User, MapPin, Wallet, CheckCircle } from 'lucide-react'

interface CheckoutProgressProps {
  currentStep: number
}

export default function CheckoutProgress({ currentStep }: CheckoutProgressProps) {
  const steps = [
    { icon: User, label: 'Cart' },
    { icon: MapPin, label: 'Address' },
    { icon: Wallet, label: 'Payment' },
    { icon: CheckCircle, label: 'Confirm' }
  ]

  return (
    <div className="flex justify-between items-center max-w-3xl mx-auto">
      {steps.map((step, index) => (
        <div key={index} className={index < steps.length - 1 ?"flex-1 flex items-center":"flex items-center"}>
          <div className="relative flex jussify-center flex-col items-center w-16">
            <div className={`w-10 h-10  rounded-full flex items-center justify-center ${
              index <= currentStep ? 'bg-orange-500' : 'bg-gray-200 border-2 border-dotted border-gray-400'
            }`}>
              <step.icon className={`w-5 h-5 ${
                index <= currentStep ? 'text-white' : 'text-gray-500'
              }`} />
            </div>
            <div className="text-sm mt-2 text-orange-400">{step.label}</div>
          </div>
          {index < steps.length - 1 && (
            <div className={`flex-1 h-px border-t-2 border-dotted mb-8 ${
              index < currentStep ? 'border-orange-500' : 'border-gray-300'
            }`} />
          )}
        </div>
      ))}
    </div>
  )
}

