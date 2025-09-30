import React from 'react'
import { useAppSelector, useAppDispatch } from "../../ReduxHooks";

export default function Login() {
    const email = useAppSelector((state) => state.login.Email);
    const dispatch = useAppDispatch();
  return (
    <div>
      
    </div>
  )
}
