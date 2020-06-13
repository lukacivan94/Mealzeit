import React from 'react';
import { Header } from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import Footer from './components/Footer/Footer';

class App extends React.PureComponent {
    render() {
        return (
            <div>
                <Header />
                <h1>MealZeit!</h1>
                <Layout>
                    <p>Layout</p>
                </Layout>
                <Footer />
            </div>
        );
    }
}

export default App;