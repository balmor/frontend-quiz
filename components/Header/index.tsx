import Container from '../Container';

const Header = () => (
  <header className="py-6 shadow-md">
    <Container>
      <div className="flex justify-center gap-10 font-baloo">
        <div className="text-3xl font-extrabold sm:text-6xl">
          <span className="text-primary-focus">{'<'}</span>
          <span className="text-accent text-3xl sm:text-6xl">{'?'}</span>
          <span className="text-primary-focus">{'>'}</span>
        </div>
        <h1 className="mb-2 text-3xl font-extrabold sm:text-6xl text-center">
          Frontend<span className="text-primary">QUIZ</span>
        </h1>
      </div>
    </Container>
  </header>
);

export default Header;
