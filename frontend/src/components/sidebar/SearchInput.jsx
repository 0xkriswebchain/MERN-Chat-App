import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import useConversation from '../../zustand/useConversation.js';
import useGetConversations from '../../hooks/useGetConversations.js';
import toast from 'react-hot-toast';

const SearchInput = () => {
  const [search, setSearch] = useState("")
  
  const {setSelectedConversation} = useConversation()
  const{conversations} = useGetConversations()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!search) return
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long")
    }

    const conversation = conversations.find((c) => c.fullName.toLowerCase().includes(search.toLowerCase()))

    if (conversation) {
      setSelectedConversation(conversation)
      setSearch("")

    } else toast.error("No conversation found")
  }
  return (
    <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type='text' placeholder='Search...' className='input input-bordered rounded-2xl rouded-full' value={search} onChange={(e) => setSearch(e.target.value)}></input>
        <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
        <FaSearch className='w-6 h-6 outline-none'/>
        </button>
    </form>
  )
}

export default SearchInput