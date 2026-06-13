import { Jumbotron } from "../../ui"

const jumbotron = {
    backgroundImage: '',
    title: 'Hola',
    subtitle: 'Mundo'
}

function PageLayout({ children, jumbotron, className = "" }){

    return (
        <>
        {jumbotron && (<Jumbotron {...jumbotron} />)}
        <div className={`container py-3 ${className}`}>
            {children}
        </div>
        </>
    )
}

export default PageLayout