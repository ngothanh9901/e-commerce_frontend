import React from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMinus} from "@fortawesome/free-solid-svg-icons"

export function Price() {

    return (
        <form >
            <input
                type="number"
                className='border w-[50px] outline-0 text-center rounded h-[30px]'
                placeholder='min'
                required
            />
            <FontAwesomeIcon icon={faMinus} className='mx-2'/>
            <input
                type="number"
                className='border w-[50px] outline-0 text-center rounded h-[30px]'
                placeholder='max'
                required
            />
            <input
                type='submit'
                value='ok'
                className='border px-2 ml-4 uppercase rounded h-[30px] bg-black text-white hover:bg-gray-600 transition cursor-pointer'
            />
        </form>
    )
}
