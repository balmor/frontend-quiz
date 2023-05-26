const Container = ({ children }: { children: JSX.Element}) => {
  return (
    <div className="container max-w-screen-xl mx-auto sm:px-4">
      {children}
    </div>
  )
}

export default Container;