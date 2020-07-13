import React, { Component } from 'react';
import Header from '../Header/Header';
import { Layout } from '../Layout/Layout';
import Footer from '../Footer/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {
    isLoggedIn: boolean;
}

class Screen extends Component<Props> {
    render() {
        return (
            <div>
                <CssBaseline />
                <Header isLoggedIn={this.props.isLoggedIn} history={this.props.history} />
                <Layout>
                    {this.props.children}
                </Layout>
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn
});

export default connect(mapStateToProps)(withRouter(Screen));