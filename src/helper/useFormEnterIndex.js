import { useFormikContext } from 'formik';
import { useEffect } from 'react';

const focusableElementsNoneName = ['INPUT', 'SELECT'];

export default function useFormEnterIndex(ele) {

    const { submitForm } = useFormikContext();

    useEffect(() => {
        if (ele?.current) {
            ele.current.addEventListener('keydown', function (event) {
                if ((event.keyCode === 13 || event.keyCode === 9) && focusableElementsNoneName.includes(event.target.nodeName)) {
                    var form = event.target.form;
                    var inputElements = Array.from(form.elements).filter(f => f.nodeName !== 'BUTTON' && !f.disabled);

                    var index = Array.prototype.indexOf.call(
                        inputElements,
                        event.target
                    );

                    if (index === inputElements.length - 1) {
                        submitForm();
                    }

                    for (
                        let step = 1;
                        step < inputElements?.length;
                        step++
                    ) {
                        if (inputElements[index + step] && !inputElements[index + step]?.disabled) {
                            inputElements[index + step].focus();
                            break;
                        }
                    }

                    event.preventDefault();
                }
            });
        }
    }, []); // eslint-disable-line
}
