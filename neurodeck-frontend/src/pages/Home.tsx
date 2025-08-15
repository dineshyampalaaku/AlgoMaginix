// src/pages/Home.tsx
import React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <Card className="w-full max-w-md shadow-2xl border-gray-700 bg-gray-800/80 backdrop-blur-md text-white">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Welcome to <span className="text-indigo-400">NeuroDeck</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-gray-300">
            Start exploring the <span className="text-indigo-300 font-semibold">Five Pillars</span> of your creativity!
          </p>
          <Button
            variant="default"
            size="lg"
            className="px-6 py-2 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-all duration-200"
          >
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default Home
