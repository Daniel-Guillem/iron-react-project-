import './jumbotron.css'

function Jumbotron ({ backgroundImage, title, subtitle }) {
return (

<div className="jumbotron" style={{ backgroundImage: `url(${backgroundImage})`}}>
    <div className="container d-flex flex-column gap-2 justify-content-center h-100">
       {title && ( <h2 className='m-0'>{title}</h2>)}
     {subtitle && ( <h5 className='m-0'>{subtitle}</h5>)}    
        </div>
</div>
)
}

export default Jumbotron