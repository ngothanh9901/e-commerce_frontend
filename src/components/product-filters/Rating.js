
import {inputsRating} from "../../constants/constants"

export function Rating() {


    return (
        <>
            {
                inputsRating.map((option, index) => (
                    <div className={option.classDiv} key={index}>
                        <input
                            type={option.type}
                            id={option.id}
                            className={option.classInput}
                        />
                        <label htmlFor={option.id} className={option.classLabel}>{option.textContent}</label>
                    </div>
                ))
            }
        </>
    )
}
