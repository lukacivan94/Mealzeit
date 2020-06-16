import React, { Component } from 'react';
import { Header } from '../Header/Header';
import { Layout } from '../Layout/Layout';
import Footer from '../Footer/Footer';

class Screen extends Component {
    render() {
        return (
            <div>
                <Header />
                <Layout>
                    {this.props.children}
                </Layout>
                <Footer />
            </div>
        );
    }
}

export default Screen;