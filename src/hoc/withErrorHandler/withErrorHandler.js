import React, { Component } from 'react'
import Modal from './../../components/UI/Modal/Modal'
import Auxiliary from './../Auxiliary/Auxiliary'


const withErrorHandler = (WrappedComponent, axios) => {
    
    return class extends Component{
        
        state = {
            error : null
        }

        componentWillMount(){

            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error : null})
                return req
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, err => {
                this.setState({ error : err })
            })

        }

        errorConfirmedHandler = () => {
            this.setState({ error : null })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors)
            axios.interceptors.response.eject(this.resInterceptors)
        }

        render () {
            return(
                <Auxiliary>
                    <Modal
                        show={this.state.error}
                        modalClose={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxiliary>
            )
        }
    }
}

export default withErrorHandler