import React from 'react'
import useConversation from '../../zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx'

const Conversation = ({conversation, lastIndex, emoji}) => {
  const {selectedConversation, setSelectedConversation} = useConversation()

  const isSelected = selectedConversation?._id === conversation._id

  const {onlineUsers} = useSocketContext()
  const isOnline = onlineUsers.includes(conversation._id)
  return (
  <>
  <div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer ${isSelected ? "bg-sky-500" : ""}`} onclick={() => setSelectedConversation(conversation)}>
    <div className={`avatar online ${isOnline ? "online" : ""}`}>
        <div className='w-12 rounded-full'>
            <img src={conversation.profilePicture} alt="user avatar"/>
        </div>
    </div>
    <div className='flex flex-col flex-1'>
        <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.fullName}</p>
            <span className='text-xl'>{emoji}</span>
        </div>
    </div>
  </div>
  {!lastIndex && <div className='divider my-0 py-0 h-1'/> }
  </>
  )
}

export default Conversation