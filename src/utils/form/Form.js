/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import formStyles from './form.module.css';

function FormField({
    formdata,
    change,
    id,
    altStyle,
    styles,
    inputClass,
    altFieldSet,
}) {
    const showError = () => {
        let errorMessage = null;

        if (formdata.validation && !formdata.valid) {
            errorMessage = (
                <div className={formStyles.errorMessage}>
                    {formdata.validationMessage}
                </div>
            );
        }

        return errorMessage;
    };

    const renderForm = () => {
        let template = null;
        switch (formdata.element) {
            case 'input':
                template = (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        {formdata.showlabel && (
                            <div className={formStyles.label}>
                                <p>{formdata.config.label}</p>
                            </div>
                        )}
                        <input
                            {...formdata.config}
                            value={formdata.value}
                            style={{
                                boxShadow: '#fff 0px 0px 0px 9999px inset',
                                ...styles,
                            }}
                            onBlur={event => change({ event, id, blur: true })}
                            onChange={event => change({ event, id })}
                            id={id}
                            className={`${inputClass} ${formStyles.defaultForm}`}
                        />
                        {showError()}
                    </div>
                );
                break;
            default:
                template = '';
                break;
        }
        return template;
    };

    return <>{renderForm()}</>;
}

FormField.displayName = 'FormField';

FormField.propTypes = {
    formdata: PropTypes.shape({
        config: PropTypes.object,
        validation: PropTypes.object,
        valid: PropTypes.bool,
        validationMessage: PropTypes.string,
        element: PropTypes.string,
        value: PropTypes.string,
        showlabel: PropTypes.bool,
    }),
    change: PropTypes.func,
    id: PropTypes.string,
    altStyle: PropTypes.object,
    styles: PropTypes.object,
    inputClass: PropTypes.string,
    altFieldSet: PropTypes.string,
};
export default FormField;
