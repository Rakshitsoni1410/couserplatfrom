import { BadgeInfo } from 'lucide-react'
import React from 'react'

const CourseDetail = () => {
  return (
    <div className='mt-24 space-y-5 '>
      <div className='bg-[#2D2F31] text-white'>
        <div className='max-w-7xl mx-auto py-8 px-4 md:px-8 flex flex-col gap-2'>
          <h1 className='font-bold text-2xl md:text-3xl'>
            Course Title
          </h1>
          <p className='text-base md:text-lg'>course Sub-title </p>
          <p>Created by {""}<span className='text-[#C0C4FC] underline italic'>Rakshit</span></p>
          <div className='flex items-center gap-2 text-sm'>
            <BadgeInfo size={16} />
            <p>Last updated 25-11-2024</p>
          </div>
          <p>Student enrolled: 10</p>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail