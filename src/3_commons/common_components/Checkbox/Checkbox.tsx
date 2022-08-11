import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import privateClass from './Checkbox.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
}

const Checkbox: React.FC<CheckboxPropsType> = (
    {
        onChange, onChangeChecked,
        children,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChangeChecked) {
            onChangeChecked(e.currentTarget.checked)
        }
        if (onChange) {
            onChange(e)
        }
    }

    return (
        <div className={privateClass.labelCheck}>
            <input
                id={"happy"}
                type={'checkbox'}
                onChange={onChangeCallback}
                className={privateClass.checkbox}
                {...restProps}
            />
            <label htmlFor="happy"> {children && <span className={privateClass.spanClassName}>{children}</span>}</label>
        </div>
    )
}

export default Checkbox
