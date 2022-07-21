import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes} from 'react'
import s from './UniversalCheckbox.module.css'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
}

const UniversalCheckbox: React.FC<SuperCheckboxPropsType> = (
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
        <div className={s.labelCheck}>
            <input
                id={"happy"}
                type={'checkbox'}
                onChange={onChangeCallback}
                className={s.checkbox}
                {...restProps}
            />
            <label htmlFor="happy"> {children && <span className={s.spanClassName}>{children}</span>}</label>
        </div>
    )
}

export default UniversalCheckbox
