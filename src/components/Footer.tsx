import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="flex items-center gap-2 text-sm">
            Built with <Heart className="w-4 h-4 text-red-500 animate-bounce-subtle" fill="currentColor" /> by{' '}
            <span className="font-semibold text-blue-400">AkotechOnline</span>
          </p>
        </div>
      </div>
    </footer>
  );
}