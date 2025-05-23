import React, {useState} from 'react'
import GenderCheckBox from './GenderCheckBox'
import { Link } from 'react-router-dom'
import useSignup from '../../hooks/useSignup';

const SignUp = () => {
   
    const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    gender: ''
   });

   const {loading, signup} = useSignup()

   const handleCheckBoxChange = (gender) => {
    setInputs({...inputs, gender})
   }
   const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs)
   }

  return <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
    <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-blur-lg backdrop-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
            SignUp <span className='text-blue-500'> ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label className='label p-2'>
                <span className='text-base label-text text-black'> Full Name </span>
                </label>
                <input type='text' placeholder='John Doe' className='w-full input input-bordered h-10' value={inputs.fullName} onChange={(e) => setInputs({...inputs, fullName: e.target.value})}></input>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'> Username </span>
                </label>
                <input type='text' placeholder='Enter Username' className='w-full input input-bordered h-10' value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})}></input>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'> Password </span>
                </label>
                <input type='text' placeholder='Enter Password' className='w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}></input>
            </div>
            <div>
            <label className='label p-2'>
                <span className='text-base label-text text-black'> Confirm Password </span>
                </label>
                <input type='text' placeholder='Confirmed Password' className='w-full input input-bordered h-10 mb-2' value={inputs.confirmPassword} onChange={(e) => setInputs({...inputs, confirmPassword: e.target.value})}></input>
            </div>
            <GenderCheckBox onCheckBoxChange = {handleCheckBoxChange} selectedGender={inputs.gender} />
            <div>
            <Link to='/login' className='text-sn hover:underline hover:text-blue-600 mt-2 inline-block'>
                Already have an account ?
            </Link>
            </div>
            <div>
                <button className='btn btn-block btn-sm mt-2 border' disabled={loading}>
                    {loading ? <span className='loading loading-spinner'></span> : "Sign Up"}
                </button>
            </div>
        </form>
    </div>
  </div>
}

export default SignUp