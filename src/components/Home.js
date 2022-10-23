function Home() {
    return (
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img src="https://data.sa.gov.au/data/uploads/group/sapol-cmyk-vertical.jpg" className="d-block w-100" alt="SA" style={{ height: 550 + 'px', width: 100 + '%' }} />
                </div>
                <div className="carousel-item">
                    <img src="https://www.vuca.com.au/wp-content/uploads/2022/01/DUO-VERTICAL-COLOUR-scaled.jpg" className="d-block w-100" alt="SA" style={{ height: 500 + 'px', width: 100 + '%' }} />
                </div>
                <div className="carousel-item">
                    <img src="https://i0.wp.com/workerchecks.com/wp-content/uploads/2021/08/SA-PC.png?fit=1280%2C720&ssl=1" className="d-block w-100" alt="SA" style={{ height: 500 + 'px', width: 100 + '%' }} />
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Home;