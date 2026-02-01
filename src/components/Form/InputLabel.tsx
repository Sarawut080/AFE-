import React, { ChangeEvent, forwardRef } from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

interface Props {
    onChange?: ((value: string | number) => void) | React.ChangeEventHandler<HTMLInputElement>;
    label: string;
    id: string;
    type?: string;
    defaultValue?: string | number;
    placeholder?: string;
    required?: boolean;
    icon?: any;
    disabled?: boolean;
    max?: number;
    // รับค่าสถานะ Error และ Success
    isInvalid?: boolean;
    errorMessage?: string;
    isValid?: boolean; // 🔥 เพิ่มตัวนี้

    [key: string]: any;
}

const InputLabel = forwardRef<HTMLInputElement, Props>((props, ref) => {
    const { 
        label, 
        id, 
        type = 'text', 
        defaultValue, 
        onChange, 
        placeholder = '', 
        required = false, 
        icon = null, 
        disabled = false, 
        max = null, 
        isInvalid = false, 
        errorMessage = '',
        isValid, // 🔥 ดึงค่า isValid มาใช้
        ...rest 
    } = props

    let inputCustom = {}
    if (max) {
        inputCustom = {
            ...inputCustom,
            maxLength: max
        }
    }

    return (
        <Form.Group className="mb-3">
            <Form.Label htmlFor={id}>{label}</Form.Label>
            <InputGroup hasValidation>
                {icon && <InputGroup.Text>{icon}</InputGroup.Text>}
                <Form.Control
                    ref={ref}
                    className="mb-0" // ปรับ CSS นิดหน่อยเผื่อมันดัน layout
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    required={required}
                    disabled={disabled}
                    defaultValue={defaultValue}
                    
                    // ส่วนควบคุมสี: แดง (Invalid) / เขียว (Valid)
                    isInvalid={isInvalid}
                    isValid={isValid} // 🔥 ส่งค่าไปให้ Bootstrap

                    {...inputCustom}
                    {...rest}

                    onChange={(e: any) => {
                        if (rest.onChange) rest.onChange(e);
                        if (onChange && typeof onChange === 'function' && !rest.onChange) {
                             (onChange as (val: string) => void)(e.target.value);
                        }
                    }}
                />
                <Form.Control.Feedback type="invalid">
                    {errorMessage}
                </Form.Control.Feedback>
            </InputGroup>
        </Form.Group>
    )
})

InputLabel.displayName = "InputLabel";
export default InputLabel