import './jumbotron.css'

function Jumbotron ({ backgroundImage, title, subtitle }) {
return (

<div className="jumbotron" style={{ backgroundImage: `url(${backgroundImage})`}}>
    <div className="container d-flex flex-column gap-2 justify-content-center h-100">
       {title && ( <h2 className='jumbotron-title m-0'>{title}</h2>)}
     {subtitle && ( <p className='jumbotron-subtitle m-0'>{subtitle}</p>)}    
        </div>
</div>
)
}

export default Jumbotron