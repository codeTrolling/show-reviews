import '../Styles/multiUse.css';
import { useEffect, useState } from 'react';
import '../Styles/AllShowsStyles.css';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import jwick from '../Assets/John_Wick_TeaserPoster.jpg';
import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import castle from '../Assets/Castle_Season_1.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';

const AllShows = () => {
    const { filter } = useParams();
    const { page = 1 } = useParams();
    const viableFilters = ["Top rated", "Most popular", "Newest", "Lowest rated", "Movies", "TV series", "Anime"]

    const [sortingFilter, setSortingFilter] = useState("");
    const [movies, setMovies] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5000/api/shows/AllShows/" + `${viableFilters.includes(filter) ? filter.toString() : "Top rated"}` + "/" + page).then(r =>{
            return r.json()
        }).then(r => {
            if(r !== null){
                setMovies(r);
            }
            else{
                navigate("/AllShows/Top rated");
            }
        });
    },[sortingFilter])

    return(
        <>
        <div className='flex all-shows-viewport-container'>
            {/* filters*/}
            <div className='flex all-shows-filters-container'>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Top rated"); setSortingFilter("t")}}>Top rated</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Most popular"); setSortingFilter("p")}}>Most popular</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Newest"); setSortingFilter("n")}}>Newest</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Lowest rated"); setSortingFilter("l")}}>Lowest rated</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Movies"); setSortingFilter("m")}}>Movies</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/TV series"); setSortingFilter("s")}}>TV series</label>
                <label className='text-styling all-shows-filter' onClick={() => {navigate("/AllShows/Anime"); setSortingFilter("a")}}>Anime</label>
            </div>


            <div className='flex all-shows-shows-container'>
                <div className='flex all-shows-categories-container'>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Rank</label>
                    <label className='text-styling heading-text-styling all-shows-title-category'>Title</label>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Rating</label>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Reviews</label>
                    {/*<label className='text-styling heading-text-styling all-shows-duration-category'>Duration</label>*/}
                </div>

                {
                    movies !== undefined && movies.map((item, index) => {
                        return(
                            <div key={index} className='flex all-shows-show-container'>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{"#" + (index + 1)}</label></div>
                                <Link to={"/Show/" + item.title} className='flex all-shows-show-title-container'>
                                    <img src={item.image} alt="" className='all-shows-show-image'/>
                                    <div className='flex all-shows-show-title-and-details'>
                                        <label className='text-styling all-shows-show-title'>{item.title}</label>
                                        <label className='text-styling all-shows-show-detail'>{item.type}</label>
                                        <label className='text-styling all-shows-show-detail'>{"Duration: " + item.duration}</label>
                                        <label className='text-styling all-shows-show-detail'>{"Release date: " + item.releaseDate}</label>
                                    </div>
                                </Link>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{item.rating}</label></div>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{item.reviewsCount}</label></div>
                            </div>
                        )
                    })
                }
            </div>
            {
                page > 1 && <a href={"/AllShows/" + filter + "/" + (parseInt(page) - 1).toString()} className='text-styling' style={{marginRight: "20px"}}>Previous page</a>
            }
            {
                movies !== undefined && movies.length === 9 && <a href={"/AllShows/" + filter + "/" + (parseInt(page) + 1).toString()} className='text-styling'>Next page</a>
            }
        </div>
        </>
    )
}

export default AllShows