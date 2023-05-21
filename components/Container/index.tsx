const Container = ({ children }: { children: any}) => {
  return (
    <div className="container max-w-screen-xl mx-auto sm:px-4">
      {children}
    </div>
  )
}

export default Container;