import '../Styles/multiUse.css';
import { useState } from 'react';
import '../Styles/AllShowsStyles.css';
import jojo from '../Assets/JoJo_Part_1_Phantom_Blood.jpg';
import jwick from '../Assets/John_Wick_TeaserPoster.jpg';
import mimpossible from '../Assets/MissionImpossiblePoster.jpg';
import castle from '../Assets/Castle_Season_1.jpg';
import { Link } from 'react-router-dom';

const AllShows = () => {

    const movies = [
        {
            "id": "JohnWick",
            "img": jwick,
            "title": "John Wick",
            "rating": "8,82/10",
            "reviews": "1,115,252",
            "type": "Movie",
            "duration": "1hr 41m",
            "genres": "action, martial arts",
            "pgRating": "13",
            "releaseDate": "2014",
            "description": "D"
        },
        {
            "id": "MissionImpossible",
            "img": mimpossible,
            "title": "Mission impossible",
            "rating": "8,32/10",
            "reviews": "1,115,252",
            "type": "Movie",
            "duration": "1hr 41m",
            "genres": "action, martial arts",
            "pgRating": "13",
            "releaseDate": "1996",
            "description": "d"
        },
        {
            "id": "Castle",
            "img": castle,
            "title": "Castle",
            "rating": "7,93/10",
            "reviews": "403,254",
            "type": "TV series",
            "duration": "12ep | 48m",
            "genres": "crime",
            "pgRating": "13",
            "releaseDate": "2009",
            "description": "d"
        },
        {
            "id": "JoJoBizzareAdventurePart1",
            "img": jojo,
            "title": "JoJo's Bizzare Adventure Part 1",
            "rating": "8,1/10",
            "reviews": "952,217",
            "type": "Anime",
            "duration": "24ep | 26m",
            "genres": "action, adventure, supernatural",
            "pgRating": "17",
            "releaseDate": "2011",
            "description": "The year is 1868; English nobleman George Joestar and his son Jonathan become indebted to Dario Brando after being rescued from a carriage incident. What the Joestars don't realize, however, is that Dario had no intention of helping them; he believed they were dead and was trying to ransack their belongings. After Dario's death 12 years later, George—hoping to repay his debt—adopts his son, Dio.\nWhile he publicly fawns over his new father, Dio secretly plans to steal the Joestar fortune. His first step is to create a divide between George and Jonathan. By constantly outdoing his foster brother, Dio firmly makes his place in the Joestar family. But when Dio pushes Jonathan too far, Jonathan defeats him in a brawl.\nYears later, the two appear to be close friends to the outside world. But trouble brews again when George falls ill, as Jonathan suspects that Dio is somehow behind the incident—and it appears he has more tricks up his sleeve."
        }
    ];

    return(
        <>
        <div className='flex all-shows-viewport-container'>
            {/* filters*/}
            <div className='flex all-shows-filters-container'>
                <label className='text-styling all-shows-filter'>Top rated</label>
                <label className='text-styling all-shows-filter'>Most popular</label>
                <label className='text-styling all-shows-filter'>Newest</label>
                <label className='text-styling all-shows-filter'>Lowest rated</label>
                <label className='text-styling all-shows-filter'>Movies</label>
                <label className='text-styling all-shows-filter'>TV series</label>
                <label className='text-styling all-shows-filter'>Anime</label>
            </div>


            <div className='flex all-shows-shows-container'>
                <div className='flex all-shows-categories-container'>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Rank</label>
                    <label className='text-styling heading-text-styling all-shows-title-category'>Title</label>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Rating</label>
                    <label className='text-styling heading-text-styling all-shows-rank-category'>Reviews</label>
                    {/*<label className='text-styling heading-text-styling all-shows-duration-category'>Duration</label>*/}
                </div>

                {/* <div className='flex all-shows-show-container'>
                    <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>#1</label></div>
                    <div className='flex all-shows-show-title-container'>
                        <img src={jwick} alt="" className='all-shows-show-image'/>
                        <div className='flex all-shows-show-title-and-details'>
                            <label className='text-styling all-shows-show-title'>{movies[0].title}</label>
                            <label className='text-styling all-shows-show-detail'>{movies[0].type}</label>
                            <label className='text-styling all-shows-show-detail'>{"Duration: " + movies[0].duration}</label>
                            <label className='text-styling all-shows-show-detail'>{"Release date: " + movies[0].releaseDate}</label>
                        </div>
                    </div>
                    <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{movies[0].rating}</label></div>
                    <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{movies[0].reviews}</label></div>
                </div> */}

                {
                    movies.map((item, index) => {
                        return(
                            <div key={index} className='flex all-shows-show-container'>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{"#" + (index + 1)}</label></div>
                                <Link to={"/Show/" + item.id} className='flex all-shows-show-title-container'>{/*<div className='flex all-shows-show-title-container'>*/}
                                    <img src={item.img} alt="" className='all-shows-show-image'/>
                                    <div className='flex all-shows-show-title-and-details'>
                                        <label className='text-styling all-shows-show-title'>{item.title}</label>
                                        <label className='text-styling all-shows-show-detail'>{item.type}</label>
                                        <label className='text-styling all-shows-show-detail'>{"Duration: " + item.duration}</label>
                                        <label className='text-styling all-shows-show-detail'>{"Release date: " + item.releaseDate}</label>
                                    </div>
                                {/*</div>*/} </Link>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{item.rating}</label></div>
                                <div className='flex all-shows-show-not-title' style={{alignItems: "center", justifyContent: "center"}}><label className='text-styling'>{item.reviews}</label></div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default AllShows