import React from 'react'
import Button from './Button'

const ButtonList = () => {
  const list = ['All', 'Music', 'Gaming', 'React', 'Live', 'News', 'Movies', 'Mixes', 'Comedy', 'Cricket', 'History', 'Podcasts', 'Recently Uploaded', 'New to you']
  return (
    <div className='w-full'>
      <div className='flex overflow-x-auto whitespace-nowrap hide-scroll-bar px-4'>
        {
          list.map((e) => (
            <Button text={e} key={e} />
          ))
        }
      </div>
    </div >
  )
}

export default ButtonList