
const Mypagination = (props) => {

    const pageAnzahl = Math.ceil(props.movies.length/props.moviesProPages)
    const pages= []

    for(let i =1; i <= pageAnzahl; i++){
        pages.push(i)
    };

  return (
    <div className="container">
      <div className="row">
          <div className="col-6">
            <div className="hint-text">Zeigt <b>{props.currentMovies.length}</b> von <b>{props.movies.length}</b> Movies</div>
          </div>
          <div className="col-6">
            <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-end">
                    <li onClick={()=>{props.setCurrentPage((currentState)=>currentState === 1 ? currentState : currentState - 1)}} 
                        className={`${props.currentPage === 1 ? 'page-item disabled' :  'page-item'}`}>
                            <a className="page-link" href="#!" tabindex="-1">Previous</a>
                    </li>
                    {
                        pages.map((page)=>{
                            return(
                                <li className={`${page === props.currentPage ? 'page-item active' : 'page-item'}`}
                                    onClick={()=>props.setCurrentPage(page)}>
                                    <a className="page-link" href="#!">{page}</a></li>
                            )
                        })
                    }
                    <li onClick={()=>{props.setCurrentPage((currentState)=>currentState === pages.length ? currentState : currentState + 1)}} 
                        className={`${props.currentPage === pages.length ? 'page-item disabled' :  'page-item'}`}>
                            <a className="page-link" href="#!">Next</a>
                    </li>
                </ul>
            </nav>
            </div>
      </div>
    </div>
  );
};

export default Mypagination;


//<div className="hint-text">Showing <b>6</b> out of <b>9</b> entries</div>