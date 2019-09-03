import React from 'react';
import TestUtils from 'react-dom/test-utils';
import { mount, shallow } from 'enzyme';
import mockAxios from 'axios';
import SignInForm from './SignInForm'
import sinon from 'sinon';
jest.unmock('axios')
import MockAdapter from 'axios-mock-adapter';
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

configure({ adapter: new Adapter() });

var assert = require('assert');

describe('SignInForm', () => {
    const getComponent = (props = {}) => {
        props = Object.assign({
            onLogin: sinon.spy(),
            history: {},
            location: {},
            match: {},
        }, props);

        const component = shallow(
            <SignInForm {...props} />
        );

        return Object.assign(props, { component });
    };
    expect(getComponent()).toBeDefined();

    describe('testing states, props and functions', () => {
        const shallowComponent = shallow(
            <SignInForm/>
        );

        const mountedComponent = mount(
            <SignInForm />
        );

        it('should have two Input component rendered', () => {
            expect(mountedComponent.find('input').length).toBe(2);
            expect(shallowComponent.find('input').length).
                toBe(
                    mountedComponent.find('input').length
                );
        });
        it('should check handleChange to change email_id, password ', () => {
            expect(shallowComponent.instance().handleChange).toBeDefined();
            expect(shallowComponent.instance().handleFormSubmit).toBeDefined();
        });

        it('should have initial state', () => {
            mountedComponent.setState({
                email_id: 'sample@gmail.com',
                password: 'SamplePassword@0',
            });
            expect(mountedComponent.state().email).toEqual('sample@gmail.com');
            expect(mountedComponent.state().password).toEqual('SamplePassword@0');
        });

        var testProps = {}
        testProps = Object.assign({
            history: {
                length: 0,
                push: function (address) {
                    var browserHistory = [];
                    browserHistory.push(address);
                    this.length = this.length + 1;
                    return this;
                }
            },
            email_id: 'sample@gmail.com',
            password: 'SamplePassword@0'
        }, testProps);

        describe('testing functions', () => {
            const mountedComponentHandle = mount(<SignInForm />);

            it('should call handleChange for password', () => {
                const value = 'SamplePassword@0';
                const onChange = sinon.spy(mountedComponentHandle.instance(), 'handleChange');
                mountedComponentHandle.update();
                mountedComponentHandle.find('input').at(1).simulate('change', value);
                expect(onChange.called).toBeDefined;
            });
        })
        describe('testing form submission onSubmit', () => {
            const testPropsWithData = {
                email: 'sample@gmail.com',
                password: 'SamplePassword@0',

                history: {
                    length: 0,
                    push: function (address) {
                        var browserHistory = [];
                        browserHistory.push(address);
                        this.length = this.length + 1;
                        return this;
                    }
                },
            }
            it('should have single form element', () => {
                const mountedComponentHandle = mount(<SignInForm />);
                const onSubmitForm = sinon.spy(mountedComponentHandle.instance(), 'handleFormSubmit');
                mountedComponentHandle.update();
                expect(mountedComponentHandle.find('form').length).toBe(1);
            });
            it('should submit form onSubmit()', () => {
                const mountedComponentHandle = mount(<SignInForm {...testPropsWithData} />);
                const onSubmitForm = sinon.spy(mountedComponentHandle.instance(), 'handleFormSubmit');
                mountedComponentHandle.update();
                const formHandle = mountedComponentHandle.find('form');

                expect(formHandle.length).toBe(1);
                formHandle.simulate('submit');
                expect(onSubmitForm.called).toBe(true);
            });
        })
    });
})
