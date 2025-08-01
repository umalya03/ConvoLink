import { BubblesIcon, EllipsisIcon, LoaderCircle, LoaderIcon } from 'lucide-react'
import React from 'react'
import { useThemeStore } from '../store/useThemeStore';

const PageLoader = () => {
  const {theme} = useThemeStore();
  return (
    <div className="min-h-screen flex items-center justify-center" data-theme={theme}>
        <LoaderCircle className='animate-spin size-10 text-primary' />
    </div>
  );
}

export default PageLoader