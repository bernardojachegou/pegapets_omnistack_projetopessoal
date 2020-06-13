import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/logo.png';

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img className="logo" src={logo} alt="Pega Pets" />
                </header>

                <main>
                    <h1>Seu pet pode está próximo de você...</h1>
                    <p>Ajudamos pessoas a encontrarem o seu próximo animal de estimação.</p>

                    <Link to="/create-place">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um local de adoção</strong>
                    </Link>
                </main>

            </div>
        </div>
    )
}

export default Home;