import React from 'react';
import {Formik, Form, Field} from 'formik';
import { loginUser } from '../../api/axiosApi';
import { loginUserRequest } from '../../actions/actionCreator';
import {connect} from 'react-redux';

const SignIn = (props) => {

    const initialValues = {
        email: '',
        password: '',
    }

    const onSubmit = (values, actions) => {
        props.loginUserRequest(values);
    } 

    return (
        <>
            <h2>SignIn</h2>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {
                    (props) => (
                        <Form>
                            <Field name="email" placeholder="Type your email" />
                            <Field name="password" placeholder="Type your password" />
                            <button type="submit">Send!</button>
                        </Form>
                    )
                }
            </Formik>
        </>
    );
}

const mapDispatchToProps = {
    loginUserRequest
}

export default connect(null, mapDispatchToProps)(SignIn);