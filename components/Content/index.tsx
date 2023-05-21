import Container from "../Container";

const Content = ({ children }: { children: any}) => {
  return (
    <main className="flex-cu pb-10 pt-5 ">
      <Container>
        {children}
      </Container>
    </main>
  )
}

export default Content;