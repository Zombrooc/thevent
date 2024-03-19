export default function TicketPage() {
  return (
    <div id="">
      <h1 className="text-3xl leading-10 text-white text-center">
        Cartão de embarque
      </h1>
      <main id="mt-8">
        <section className="p-10 bg-white rounded-3xl gap-10 grid">
          <div className="flight grid grid-flow-col">
            <div className="number">
              <p className="text-2xl leading-7">Voo</p>
              <strong className="text-2xl leading-loose">RS995</strong>
            </div>
            <div className="date --undefined text-right">
              <p className="text-2xl leading-7">Data</p>
              <strong className="text-2xl leading-loose">23/05/2023</strong>
            </div>
          </div>
          <div className="grid grid-flow-col">
            <div className="departure grid">
              <p className="text-2xl leading-7">São Paulo, Brasil</p>
              <strong className="text-2xl leading-loose">GRU</strong>
              <time>17:00</time>
            </div>
            <div className="self-center grid">
              <img src="./assets/ion_self-center.svg" alt="ícone de um avião" />
            </div>
            <div className="arrival --undefined text-right grid">
              <p className="text-2xl leading-7">São Francisco, EUA</p>
              <strong className="text-2xl leading-loose">SFO</strong>
              <time>
                04:48 <sup>+1</sup>
              </time>
            </div>
          </div>
        </section>
        <section className="p-10 bg-white" className=" grid grid-flow-col">
          <div className="name">
            <p className="text-2xl leading-7">Passageiro</p>
            <strong className="text-2xl leading-loose">Rodrigo Terron</strong>
          </div>
          <div className="seat --undefined text-right">
            <p className="text-2xl leading-7">Assento</p>
            <strong className="text-2xl leading-loose">28A</strong>
          </div>
        </section>
        <section className="p-10 bg-white" className="rounded-3xl">
          <div className="container grid grid-flow-col">
            <dl className="grid">
              <dt>
                <p className="text-2xl leading-7">Embarque</p>
                <time>16:15</time>
              </dt>
              <dt>
                <p className="text-2xl leading-7">Terminal</p>
                <strong className="text-2xl leading-loose">2</strong>
              </dt>
              <dt>
                <p className="text-2xl leading-7">Portão</p>
                <strong className="text-2xl leading-loose">15</strong>
              </dt>
            </dl>
            <div className="qrcode grid">
              <img src="./assets/qr-code.png" alt="imagem de um qrcode" />
              <p className="text-2xl leading-7">Grupo de embarque: 3</p>
            </div>
          </div>
          <p className="text-2xl leading-7">
            <strong className="text-2xl leading-loose">Atenção:</strong> o
            portão fecha 16:45
          </p>
        </section>
      </main>
      <footer className="text-2xl leading-10 text-white opacity-60 w-96 text-center m-8">
        Qualquer problema procure o balcão de atendimento da sua companhia aérea
      </footer>
    </div>
  );
}
