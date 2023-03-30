import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {useWeb3React} from '@web3-react/core'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { setId, setNickName } from '../../app/redux-modules/userSlice';
import axiosApi from '../../services/axiosApi';

function InputNickName() {
  const {account} = useWeb3React();
  const [nickName, setStateNickName] = useState<string>();
  const dispatch = useDispatch<AppDispatch>();
  const navigator = useNavigate();

  function nickNameChange(event : React.ChangeEvent<HTMLInputElement>) {
    setStateNickName(event.target.value);
  }

  async function loginHandler(event : React.MouseEvent<HTMLElement>) {
    const result = await axiosApi.get('/user/make/'+account+'/'+nickName);
    if (result !== undefined) {
      console.log(result);
      if (result.data.status_code === 200) {
        navigator('/home')
      }
    }
  }

  useEffect(() => {
    if (account) {
        dispatch(setId(account))
    }
    if (nickName){
        dispatch(setNickName(nickName))
    }
  }, [account, nickName, dispatch])
  
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
        <div>
            <p className='text-5xl text-center my-7 text-ttokPink NickName'>똑켓</p>
            <div className='flex items-center justify-center h-48 border-2 border-gray-100 rounded-lg shadow-lg w-72'>
                <div className='w-full p-4'>
                    <p className='text-2xl'>닉네임<span className='text-base'> (최대 8글자)</span></p>
                    <input type="text" className='w-full h-10 px-2 mt-4 rounded-md bg-slate-100' placeholder='사용할 닉네임을 입력해주세요' onChange={nickNameChange} />
                    <div className='flex justify-center'>
                        <button onClick={loginHandler} className='h-10 px-4 mt-4 rounded-md bg-ttokLightPink'>로그인</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InputNickName