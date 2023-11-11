import { useEffect, useMemo, useState } from 'react';

interface formCheckedValuesI {
    [key: string]: string | null
}

interface formStateI {
    [key: string]: string;
}

interface formValidationsI {
    [key: string]: [fn: (key:string) => boolean, errorMessage: string]
}

type IForm = {
    formState: formStateI; // Replace 'any' with the actual type
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Replace 'any' with the actual type
    onResetForm: () => void;
    formValidation: formCheckedValuesI; // Replace 'any' with the actual type
    isFormValid: boolean;
} & formStateI & formCheckedValuesI;

export const useForm = ( initialForm = {}, formValidations: formValidationsI = {}): IForm => {
  
    const [ formState, setFormState ] = useState<formStateI>( initialForm );
    const [ formValidation, setFormValidation ] = useState<formCheckedValuesI>({});

    useEffect(() => {
        createValidators();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ formState ])

    useEffect(() => {
        setFormState( initialForm );
    }, [ initialForm ])
    
    
    const isFormValid = useMemo( () => {

        for (const formValue of Object.keys( formValidation )) {
            if ( formValidation[formValue] !== null ) return false;
        }

        return true;
    }, [ formValidation ])


    const onInputChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {
        
        const formCheckedValues: formCheckedValuesI = {};
        
        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] = fn( formState[formField] ) ? null : errorMessage;
        }

        setFormValidation( formCheckedValues );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid
    } as IForm
} 