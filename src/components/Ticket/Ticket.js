/* eslint-disable @next/next/no-img-element */
import "./ticket.css";

export default function Ticket() {
  return (
    <div id="boarding-pass">
      <h1>Ingresso de entrada</h1>
      <main id="ticket">
        <section className="top grid">
          <div className="flight column grid">
            <div className="number">
              <p>Evento</p>
              <strong>Corrida São Judas Tadeu</strong>
            </div>
            <div className="date text-right">
              <p>Data</p>
              <strong>23/05/2024</strong>
            </div>
          </div>
          {/* <div>
            <div className="departure">
              <p>São Paulo, São Paulo</p>
              <strong>Masc. Geral A</strong>
              <time>16:15</time>
            </div>
          </div> */}
        </section>
        <section className="middle column grid">
          <div className="name">
            <p>Participante</p>
            <strong>Elian Valdez</strong>
          </div>
          <div className="seat text-right">
            <p>Categoria</p>
            <strong>Masculino Geral A</strong>
          </div>
        </section>
        <section className="bottom">
          <div className="column container grid">
            <dl className="grid">
              <dt>
                <p>Início</p>
                <time>16:15</time>
              </dt>
              <dt>
                <p>Plate</p>
                <strong>145</strong>
              </dt>
              <dt>
                <p>Tenda</p>
                <strong>5</strong>
              </dt>
            </dl>

            <div className="qrcode grid">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png"
                alt="imagem de um qrcode"
                width={150}
                height={150}
              />
              {/* <p>Grupo de embarque: 3</p> */}
            </div>
          </div>
          <p>
            <strong>Atenção:</strong> entrada permitida até 16:20
          </p>
        </section>
      </main>
      <footer>
        Qualquer problema procure o balcão de atendimento da organização do
        evento
      </footer>
    </div>
  );
}
