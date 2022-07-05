import React, { SVGProps } from 'react'

interface Props {
    Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
    title: String
}

function SidebarRow({Icon, title}: Props) {
  return (
    <div className='group flex max-w-fit items-center space-x-2 px-4 py-3 rounded-full
     hover:bg-gray-100 cursor-pointer 
     transition-all duration-200'>
        <Icon className='h-10 w-10'/>
        <p className='hidden group-hover:text-twitter md:inline-flex text-base font-light lg:text-xl'>{title}</p>
    </div>
  )
}

export default SidebarRow