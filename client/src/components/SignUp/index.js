import React from 'react';
import {Formik, Form, Field} from 'formik';
import {format} from 'date-fns';
import { registerUserRequest } from '../../actions/actionCreator';
import { connect } from 'react-redux';

const SignUp = (props) => {

    const initialValues = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        birthday: format(new Date(), 'yyyy-MM-dd')
    }

    const onSubmit = (values, actions) => {
        props.registerUserRequest(values);
    } 

    return (
        <>
            <h2>SignUp</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form>
                            <Field name="firstName" placeholder="Type your name" />
                            <Field name="lastName" placeholder="Type your last name" />
                            <Field name="email" placeholder="Type your email" />
                            <Field name="password" placeholder="Type your password" />
                            <Field name="birthday" type="date" />
                            <button type="submit">Send!</button>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

const mapDispatchToProps = {
    registerUserRequest
}

export default connect(null, mapDispatchToProps)(SignUp);