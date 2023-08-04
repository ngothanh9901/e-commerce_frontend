
import {inputsCategory} from "../../constants/constants";

export function Category() {
    return (
        <>
            {
                inputsCategory.map((option, index) => (
                    <div key={index} className='py-1 flex'>
                        <input
                            className='outline-0 cursor-pointer w-[15px]'
                            type="checkbox"
                            id={option.id}
                           
                        />
                        <label htmlFor={option.id} className='pl-1 cursor-pointer'>{option.textContext}</label>
                    </div>
                ))
            }
        </>
    )
}
