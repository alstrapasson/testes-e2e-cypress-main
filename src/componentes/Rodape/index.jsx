import React from 'react';
import estilos from './Rodape.module.css';

import logoBytebank from 'assets/strapabank.svg';
import instagram from 'assets/instagram.svg';
import whatsapp from 'assets/whatsapp.svg';
import youtube from 'assets/youtube.svg';

export default function Rodape() {
  return (
    <footer className={estilos.container}>
      <div className={estilos.caixa__rodape}>
        <div className={estilos.coluna__infos}>
          <h3>Serviços</h3>
          <p>Conta corrente</p>
          <p>Conta PJ</p>
          <p>Cartão de crédito</p>
        </div>
        <div className={estilos.coluna__infos}>
          <h3>Contato</h3>
          <p>0800 004 250 08</p>
          <p>contato@strapa.com.br</p>
          <p>ouvidoria@strapa.com.br</p>
        </div>
        <div className={estilos.coluna__infos}>
          <h3>Desenvolvido por StrapaTecnologia</h3>
          <img
            className={estilos.logo__bytebank}
            src={logoBytebank}
            alt="Logo do StrapaBank"
          />
          <div className={estilos.logos}>
            <img src={instagram} alt="Logo do instagram" />
            <img src={whatsapp} alt="Logo do whatsapp" />
            <img src={youtube} alt="Logo do youtube" />
          </div>
        </div>
      </div>
    </footer>
  );
}
