import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { Context } from '../../Context/AuthContext';

import { NavList } from './styles';

export const Menu = () => {
    const { handleLogout } = useContext(Context);
    return (
        <NavList>
            <NavLink to="/dashboard"><li>Dashboard</li></NavLink>
            <NavLink to="/listar"><li>Produtos</li></NavLink>
            <NavLink to="#" onClick={handleLogout}><li>Sair</li></NavLink>
        </NavList>
    )
}